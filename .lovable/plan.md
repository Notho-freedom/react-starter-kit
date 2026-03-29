

# OpenRide — Backend intégral avec Supabase

## Résumé

Migrer toute l'application d'un prototype localStorage vers un backend Supabase complet : authentification réelle, base de données, messagerie temps réel, et autocomplétion Mapbox. Aucun bouton ne reste sans backend.

## Prérequis

Tu dois connecter ton projet Supabase externe via les paramètres Lovable **avant** l'implémentation. Je te guiderai à cette étape.

---

## Phase 1 — Connexion Supabase + Auth

**Connecter Supabase** : installer `@supabase/supabase-js`, créer `src/integrations/supabase/client.ts` avec tes credentials (VITE_SUPABASE_URL + VITE_SUPABASE_PUBLISHABLE_KEY).

**Tables de base** (migrations) :
```text
profiles (id uuid PK → auth.users, first_name, last_name, email, phone, 
  bio, city, country, gender, birth_date, avatar_url, currency, language,
  emergency_contact_name, emergency_contact_phone, 
  email_verified, phone_verified, id_verified, created_at)

user_roles (id uuid PK, user_id → auth.users, role app_role enum)
```

**Auth flow** : remplacer le `login()`/`signup()` du workflow par `supabase.auth.signInWithPassword()` et `supabase.auth.signUp()`. Garder les boutons Google/Facebook/Apple comme OAuth providers Supabase. Ajouter un `AuthProvider` React qui écoute `onAuthStateChange` et expose `user`, `session`, `loading`.

**Gardes de route** : adapter `guards.tsx` pour vérifier la session Supabase au lieu de `state.authStatus`.

**Setup profile + Trust center** : les pages onboarding écrivent dans `profiles` via `upsert`. Le flag `profileCompleted` / `trustCompleted` est dérivé des champs remplis dans `profiles`.

---

## Phase 2 — Trajets, disponibilités, demandes

**Tables** :
```text
trips (id uuid PK, driver_id → auth.users, departure, destination,
  departure_station, arrival_station, date, time, price, seats_total,
  seats_left, vehicle_name, vehicle_color, luggage_allowed, pets_allowed,
  smoking_allowed, instructions, status enum(draft/published/cancelled),
  created_at)

driver_availabilities (id uuid PK, driver_id → auth.users, zone, date,
  start_time, end_time, seats, vehicle_name, notes,
  status enum(active/fulfilled/cancelled), created_at)

ride_requests (id uuid PK, passenger_id → auth.users, origin, destination,
  date, start_time, end_time, seat_count, notes,
  status enum(active/fulfilled/cancelled), created_at)

bookings (id uuid PK, ride_id → trips, passenger_id → auth.users,
  seat_count, payment_method, payment_status enum(paid/authorized/cash_pending),
  status enum(confirmed/pending/cancelled), message, created_at)
```

**RLS** : chaque table a des policies — les users ne voient/modifient que leurs propres données pour les écritures, lecture publique pour les trajets/disponibilités publiés.

**Publish trip** : le formulaire existant (`PublishTripFormSections`) fait un `insert` dans `trips` ou `driver_availabilities` selon le mode.

**Ride request** : le `RideRequestComposer` fait un `insert` dans `ride_requests`.

**My trips** : remplacer les données seed par des queries Supabase avec filtres par role (passager → bookings, demandes ; chauffeur → trips, disponibilités).

**Search results** : query `trips` + `driver_availabilities` avec filtres texte/date. Le matching local existant reste côté client pour la sidebar des suggestions.

---

## Phase 3 — Mapbox côté client

**Installer** `mapbox-gl` + `@mapbox/mapbox-gl-geocoder` comme dépendances.

**Autocomplétion d'adresses** : créer un composant `MapboxAutocomplete` réutilisable qui appelle l'API Mapbox Search directement avec le token du `.env` (`VITE_MAPBOX_ACCESS_TOKEN`). L'intégrer dans :
- Publish trip : champs départ/arrivée/zone
- Search results : champs de recherche + demande passager
- Setup profile : champ ville

**Carte interactive** : remplacer l'image statique dans `MapPanel` par une vraie carte Mapbox GL avec des marqueurs pour chaque trajet. Geocoder les villes de départ/arrivée pour positionner les marqueurs.

---

## Phase 4 — Messagerie temps réel

**Tables** :
```text
conversations (id uuid PK, context_type enum(ride/availability/request),
  context_id uuid, created_at)

conversation_participants (id uuid PK, conversation_id → conversations,
  user_id → auth.users, role_label text)

messages (id uuid PK, conversation_id → conversations, sender_id → auth.users,
  text, attachment_url, created_at)
```

**Realtime** : s'abonner au channel `messages` avec `supabase.channel().on('postgres_changes', ...)` pour recevoir les nouveaux messages instantanément.

**Composants** : adapter `ConversationListPane` et `MessageThreadPane` pour lire/écrire via Supabase au lieu du state local. Le `sendMessage` du workflow devient un `insert` dans `messages`.

**CTA Contacter** : crée une conversation dans Supabase (ou ouvre l'existante) et redirige vers `/messages`.

---

## Phase 5 — Booking flow

Le flux de réservation (`payment-booking/Page.tsx`) :
- Crée un `booking` dans Supabase avec le `payment_method` choisi (card/wallet/paypal/cash)
- Décrémente `seats_left` sur le trip
- Crée une conversation automatique avec le conducteur
- Cash : status `cash_pending`, pas de paiement en ligne

---

## Phase 6 — Profile settings

Le formulaire `ProfileSettingsForm` lit/écrit dans `profiles` via Supabase. Le changement de mot de passe utilise `supabase.auth.updateUser()`. Le logout utilise `supabase.auth.signOut()`.

---

## Fichiers impactés (principaux)

| Fichier | Action |
|---------|--------|
| `src/integrations/supabase/client.ts` | Nouveau — client Supabase |
| `src/integrations/supabase/types.ts` | Nouveau — types auto-générés |
| `src/openride/shared/auth/AuthProvider.tsx` | Nouveau — contexte auth Supabase |
| `src/openride/shared/workflows/OpenRideWorkflowProvider.tsx` | Refactoring majeur — queries Supabase |
| `src/openride/shared/workflows/guards.tsx` | Adapter aux sessions Supabase |
| `src/openride/routes/auth/Page.tsx` | Auth Supabase réelle |
| `src/openride/routes/search-results/components/MapPanel.tsx` | Carte Mapbox GL |
| `src/openride/routes/search-results/components/RideResultsList.tsx` | Query Supabase |
| `src/openride/routes/publish-trip/Page.tsx` | Insert Supabase |
| `src/openride/routes/messages/components/*` | Realtime Supabase |
| Toutes les pages | Remplacement des données seed par queries |

## Approche d'implémentation

Pour économiser tes crédits, je vais procéder par lots cohérents :
1. **Lot 1** : Supabase setup + auth + migrations + gardes → l'app se connecte vraiment
2. **Lot 2** : CRUD trajets/disponibilités/demandes/bookings → les données sont persistées  
3. **Lot 3** : Mapbox (carte + autocomplete) → UX de recherche fonctionnelle
4. **Lot 4** : Messagerie realtime → conversations live

Chaque lot est autonome et testable indépendamment.

