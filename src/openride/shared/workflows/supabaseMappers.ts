/**
 * Converts Supabase DB rows into workflow view-model types.
 * All data displayed in the UI goes through these mappers.
 */
import type {
  Conversation,
  ConversationMessage,
  DriverAvailabilityPost,
  PassengerTrip,
  PublishedTrip,
  Ride,
  RiderRequestPost,
  UserProfile,
} from "./types";

type R = Record<string, unknown>;

// ─── Helpers ───

function str(v: unknown, fallback = ""): string {
  return typeof v === "string" ? v : fallback;
}
function num(v: unknown, fallback = 0): number {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}
function bool(v: unknown): boolean {
  return Boolean(v);
}

function formatDateLabel(dateStr: string): string {
  if (!dateStr) return "";
  try {
    const d = new Date(dateStr + "T00:00:00");
    const days = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
    const months = ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"];
    return `${days[d.getDay()]} ${d.getDate()} ${months[d.getMonth()]}`;
  } catch {
    return dateStr;
  }
}

function formatFullDateLabel(dateStr: string): string {
  if (!dateStr) return "";
  try {
    const d = new Date(dateStr + "T00:00:00");
    const days = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
    const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
    return `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  } catch {
    return dateStr;
  }
}

function timeShort(t: string): string {
  return (t || "").slice(0, 5);
}

function estimateArrival(departure: string, hoursToAdd = 4): string {
  if (!departure) return "";
  try {
    const [h, m] = departure.split(":").map(Number);
    const totalMin = (h + hoursToAdd) * 60 + (m || 0);
    const hh = Math.floor(totalMin / 60) % 24;
    const mm = totalMin % 60;
    return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
  } catch {
    return "";
  }
}

function shortName(firstName: string, lastName: string): string {
  if (lastName) return `${firstName} ${lastName[0]}.`;
  return firstName || "Utilisateur";
}

function fullName(firstName: string, lastName: string): string {
  return `${firstName} ${lastName}`.trim() || "Utilisateur";
}

const DEFAULT_AVATAR = "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg";
const DEFAULT_CAR_IMAGE = "https://storage.googleapis.com/uxpilot-auth.appspot.com/add288faf4-4b04d15c38e772fef16c.png";
const DEFAULT_MAP_IMAGE = "https://storage.googleapis.com/uxpilot-auth.appspot.com/75df874086-dabfd9157546c19857ca.png";

// ─── Profile ───

export function dbProfileToUserProfile(p: R): UserProfile {
  const fn = str(p.first_name);
  const ln = str(p.last_name);
  const createdAt = p.created_at ? new Date(str(p.created_at)) : new Date();
  const yearStr = createdAt.getFullYear().toString();

  let ageLabel = "";
  if (p.birth_date) {
    const age = Math.floor((Date.now() - new Date(str(p.birth_date)).getTime()) / (365.25 * 24 * 60 * 60 * 1000));
    ageLabel = `${age} ans`;
  }

  return {
    ageLabel,
    bio: str(p.bio),
    birthDate: str(p.birth_date),
    city: str(p.city),
    country: str(p.country, "France"),
    currency: str(p.currency, "EUR (€)"),
    email: str(p.email),
    emergencyContactName: str(p.emergency_contact_name),
    emergencyContactPhone: str(p.emergency_contact_phone),
    firstName: fn,
    fullName: fullName(fn, ln),
    gender: str(p.gender),
    language: str(p.language, "French"),
    lastName: ln,
    memberSince: yearStr,
    miniRoleLabel: `Membre depuis ${yearStr}`,
    phone: str(p.phone),
    rating: num(p.rating, 5.0),
    reviewCount: num(p.review_count),
    tripCount: num(p.trip_count),
    verification: {
      emailVerified: bool(p.email_verified),
      idVerified: bool(p.id_verified),
      phoneVerified: bool(p.phone_verified),
    },
  };
}

// ─── Trip → Ride ───

export function dbTripToRide(t: R): Ride {
  const driver = (t.driver ?? {}) as R;
  const price = num(t.price);
  const departure = str(t.departure);
  const destination = str(t.destination);
  const date = str(t.date);
  const time = timeShort(str(t.time));
  const seatsTotal = num(t.seats_total, 3);
  const seatsLeft = num(t.seats_left, seatsTotal);
  const driverFn = str(driver.first_name);
  const driverLn = str(driver.last_name);
  const dateLabel = formatDateLabel(date);
  const fullDateLabel = formatFullDateLabel(date);
  const arrivalTime = estimateArrival(time);

  return {
    id: str(t.id),
    arrivalDateLabel: dateLabel,
    arrivalLocation: destination,
    arrivalStation: str(t.arrival_station, destination),
    arrivalTime,
    carImage: str(driver.avatar_url) ? DEFAULT_CAR_IMAGE : DEFAULT_CAR_IMAGE,
    dateLabel: fullDateLabel,
    departureDateLabel: dateLabel,
    departureLocation: departure,
    departureStation: str(t.departure_station, departure),
    departureTime: time,
    distanceLabel: "",
    driver: {
      avatar: str(driver.avatar_url, DEFAULT_AVATAR),
      memberSince: driver.created_at ? new Date(str(driver.created_at)).getFullYear().toString() : "2024",
      name: fullName(driverFn, driverLn),
      rating: num(driver.rating, 5.0),
      reviewCount: num(driver.review_count),
      shortName: shortName(driverFn, driverLn),
      verifiedLabel: "Profil vérifié",
      vehicleColor: str(t.vehicle_color, ""),
      vehicleName: str(t.vehicle_name, "Véhicule"),
    },
    durationLabel: "~4h",
    mapImage: DEFAULT_MAP_IMAGE,
    originCity: departure,
    price,
    priceLabel: `€${price}`,
    preferences: {
      ambience: "Standard",
      instantBook: false,
      luggage: bool(t.luggage_allowed) ? "Bagages acceptés" : "Pas de gros bagages",
      petsAllowed: bool(t.pets_allowed),
      smokingAllowed: bool(t.smoking_allowed),
    },
    routeLabel: `${departure} → ${destination}`,
    seatsLeft,
    seatsTotal,
    serviceFee: Math.round(price * 0.1 * 100) / 100,
    taxes: Math.round(price * 0.02 * 100) / 100,
  };
}

// ─── Booking → PassengerTrip ───

export function dbBookingToPassengerTrip(b: R): PassengerTrip {
  const trip = (b.trip ?? {}) as R;
  const driver = (trip.driver ?? {}) as R;
  const driverFn = str(driver.first_name);
  const driverLn = str(driver.last_name);
  const date = str(trip.date);
  const time = timeShort(str(trip.time));
  const departure = str(trip.departure);
  const destination = str(trip.destination);
  const seatCount = num(b.seat_count, 1);
  const seatsTotal = num(trip.seats_total, 3);

  // Determine "kind" based on date
  const tripDate = new Date(date + "T00:00:00");
  const now = new Date();
  const status = str(b.status, "confirmed");
  let kind: "upcoming" | "past" | "cancelled" = "upcoming";
  if (status === "cancelled") kind = "cancelled";
  else if (tripDate < now) kind = "past";

  return {
    departureLabel: `${formatDateLabel(date)}, ${time}`,
    driverAvatar: str(driver.avatar_url, DEFAULT_AVATAR),
    driverName: shortName(driverFn, driverLn),
    id: str(b.id),
    kind,
    passengersLabel: `${seatCount}/${seatsTotal}`,
    paymentStatus: (str(b.payment_status, "paid") as "paid" | "authorized" | "cash_pending"),
    price: num(trip.price),
    rideId: str(b.ride_id),
    routeLabel: `${departure} → ${destination}`,
    status: (status as "confirmed" | "pending" | "cancelled"),
    vehicleName: str(trip.vehicle_name, "Véhicule"),
  };
}

// ─── Own Trip → PublishedTrip ───

export function dbTripToPublishedTrip(t: R): PublishedTrip {
  const date = str(t.date);
  const time = timeShort(str(t.time));
  const departure = str(t.departure);
  const destination = str(t.destination);
  const seatsLeft = num(t.seats_left, num(t.seats_total, 3));
  const status = str(t.status, "published");

  const tripDate = new Date(date + "T00:00:00");
  const now = new Date();
  let kind: "upcoming" | "past" | "cancelled" = "upcoming";
  if (status === "cancelled") kind = "cancelled";
  else if (tripDate < now) kind = "past";

  return {
    departureLabel: `${formatDateLabel(date)}, ${time}`,
    id: str(t.id),
    kind,
    passengersLabel: `${seatsLeft} places restantes`,
    price: num(t.price),
    rideId: str(t.id),
    routeLabel: `${departure} → ${destination}`,
    seatsAvailable: seatsLeft,
    status: status === "published" ? "published" : "draft",
    vehicleName: str(t.vehicle_name, "Véhicule"),
  };
}

// ─── DriverAvailability → DriverAvailabilityPost ───

export function dbAvailabilityToPost(a: R): DriverAvailabilityPost {
  const driver = (a.driver ?? {}) as R;
  const driverFn = str(driver.first_name);
  const driverLn = str(driver.last_name);
  const zone = str(a.zone);
  const startTime = timeShort(str(a.start_time));
  const endTime = timeShort(str(a.end_time));
  const status = str(a.status, "active");

  return {
    date: str(a.date),
    driverAvatar: str(driver.avatar_url, DEFAULT_AVATAR),
    driverName: fullName(driverFn, driverLn),
    driverRating: num(driver.rating, 5.0),
    id: str(a.id),
    kind: status as "active" | "fulfilled" | "cancelled",
    notes: str(a.notes),
    routeLabel: `Disponible depuis ${zone || "votre zone"}`,
    seats: num(a.seats, 3),
    timeWindow: `${startTime} - ${endTime}`,
    vehicleName: str(a.vehicle_name, "Véhicule"),
    zone,
  };
}

// ─── RideRequest → RiderRequestPost ───

export function dbRequestToPost(r: R): RiderRequestPost {
  const passenger = (r.passenger ?? {}) as R;
  const pFn = str(passenger.first_name);
  const pLn = str(passenger.last_name);
  const origin = str(r.origin);
  const destination = str(r.destination);
  const startTime = timeShort(str(r.start_time));
  const endTime = timeShort(str(r.end_time));
  const status = str(r.status, "active");

  return {
    date: str(r.date),
    destination,
    id: str(r.id),
    kind: status as "active" | "fulfilled" | "cancelled",
    notes: str(r.notes),
    origin,
    passengerAvatar: str(passenger.avatar_url, DEFAULT_AVATAR),
    passengerName: fullName(pFn, pLn),
    routeLabel: `${origin || "Départ"} → ${destination || "Arrivée"}`,
    seatCount: num(r.seat_count, 1),
    timeWindow: `${startTime} - ${endTime}`,
  };
}

// ─── Conversation mapping ───

export function dbConversationToConversation(
  convo: R,
  messages: R[],
  userId: string,
): Conversation {
  const participants = (convo.participants ?? []) as R[];
  const other = participants.find((p) => str((p as R).user_id) !== userId);
  const otherProfile = other ? (other as R).profile as R : {} as R;
  const otherFn = str(otherProfile.first_name);
  const otherLn = str(otherProfile.last_name);

  const sortedMessages = [...messages].sort(
    (a, b) => new Date(str(a.created_at)).getTime() - new Date(str(b.created_at)).getTime(),
  );

  const lastMsg = sortedMessages[sortedMessages.length - 1];

  const mappedMessages: ConversationMessage[] = sortedMessages.map((m) => ({
    id: str(m.id),
    sender: str(m.sender_id) === userId ? "me" : "them",
    text: str(m.text),
    timestamp: formatMessageTime(str(m.created_at)),
    attachmentImage: str(m.attachment_url) || undefined,
  }));

  return {
    contextType: (str(convo.context_type, "ride") as "ride" | "availability" | "request"),
    id: str(convo.id),
    isOnline: true,
    lastMessage: lastMsg ? str(lastMsg.text) : "Pas de messages",
    lastTimestamp: lastMsg ? formatMessageTime(str(lastMsg.created_at)) : "",
    messages: mappedMessages,
    participantAvatar: str(otherProfile.avatar_url, DEFAULT_AVATAR),
    participantName: fullName(otherFn, otherLn),
    participantRoleLabel: str((other as R)?.role_label, "Participant"),
    paymentStateLabel: "À définir",
    rideId: str(convo.context_id),
    routeLabel: "Trajet",
    statusLabel: "En cours",
    unread: false,
  };
}

function formatMessageTime(isoStr: string): string {
  if (!isoStr) return "";
  try {
    const d = new Date(isoStr);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
    if (diffDays === 1) return "Hier";
    if (diffDays < 7) {
      const days = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
      return days[d.getDay()];
    }
    return `${d.getDate()}/${d.getMonth() + 1}`;
  } catch {
    return "";
  }
}
