import { useNavigate } from "react-router-dom";
import { OpenRideIcon } from "@/openride/shared/icons";
import { useOpenRideWorkflow } from "@/openride/shared/workflows";

function TripDetailsMainColumn() {
  const navigate = useNavigate();
  const workflow = useOpenRideWorkflow();
  const ride = workflow.selectedRide ?? workflow.searchRides[0];

  if (!ride) {
    return null;
  }

  return (
    <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-8">
      <section id="trip-overview" className="glass-card rounded-3xl p-6 md:p-8">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">
              {ride.originCity} <OpenRideIcon name="arrow-right" className="text-brand-textMuted text-xl mx-2" />{" "}
              {ride.arrivalLocation}
            </h2>
            <p className="text-brand-textMuted flex items-center gap-2">
              <OpenRideIcon name="calendar" className="text-brand-accentGreen" /> {ride.dateLabel}
            </p>
          </div>
          <div className="text-right">
            <span className="text-3xl font-bold text-brand-accentGreen">{ride.priceLabel}</span>
            <p className="text-sm text-brand-textMuted">par passager</p>
          </div>
        </div>

        <div className="bg-brand-surface rounded-2xl p-6 relative">
          <div className="relative pl-8 space-y-12">
            <div className="timeline-line" />

            <div className="relative">
              <div className="timeline-dot border-brand-accentGreen" />
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-lg font-bold text-white">
                    {ride.departureTime}
                    <span className="text-brand-textMuted font-normal ml-2">{ride.originCity}</span>
                  </p>
                  <p className="text-sm text-brand-textMuted mt-1">{ride.departureStation}</p>
                  <a href="#" className="text-brand-accentGreen text-sm mt-2 inline-block hover:underline">
                    Voir sur la carte
                  </a>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="timeline-dot border-brand-accentYellow" />
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-lg font-bold text-white">
                    {ride.arrivalTime}
                    <span className="text-brand-textMuted font-normal ml-2">{ride.arrivalLocation}</span>
                  </p>
                  <p className="text-sm text-brand-textMuted mt-1">{ride.arrivalStation}</p>
                  <a href="#" className="text-brand-accentYellow text-sm mt-2 inline-block hover:underline">
                    Voir sur la carte
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 h-48 rounded-xl overflow-hidden relative border border-gray-700">
            <div className="absolute inset-0 bg-brand-dark">
              <img src={ride.mapImage} alt="Map Route" className="w-full h-full object-cover opacity-60" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <button className="bg-brand-surface text-white px-4 py-2 rounded-full text-sm font-medium border border-gray-600 pointer-events-auto hover:bg-brand-surfaceLight transition-colors">
                Agrandir la carte
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="driver-profile" className="glass-card rounded-3xl p-6 md:p-8">
        <h3 className="text-xl font-bold text-white mb-6">À propos du conducteur</h3>
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={ride.driver.avatar}
                alt={ride.driver.name}
                className="w-20 h-20 rounded-full border-2 border-brand-surfaceLight object-cover"
              />
              <div className="absolute -bottom-2 -right-2 bg-brand-surface rounded-full p-1 border border-gray-700">
                <OpenRideIcon name="shield-check" className="text-brand-accentGreen text-sm" />
              </div>
            </div>
            <div>
              <h4 className="text-xl font-bold text-white">{ride.driver.name}</h4>
              <div className="flex items-center gap-2 mt-1">
                <div className="bg-brand-surface px-2 py-1 rounded-md flex items-center gap-1 text-sm border border-gray-700">
                  <OpenRideIcon name="star" className="text-brand-accentYellow text-xs" />
                  <span className="font-medium text-white">{ride.driver.rating.toFixed(1)}</span>
                </div>
                <span className="text-sm text-brand-textMuted">({ride.driver.reviewCount} avis)</span>
              </div>
              <p className="text-sm text-brand-textMuted mt-2">Membre depuis {ride.driver.memberSince}</p>
            </div>
          </div>
          <button
            className="w-full md:w-auto px-6 py-3 rounded-xl bg-brand-surface text-white font-medium border border-gray-700 hover:border-brand-accentGreen transition-colors flex items-center justify-center gap-2"
            onClick={() => {
              workflow.openConversationForRide(ride.id);
              navigate("/messages");
            }}
            type="button"
          >
            <OpenRideIcon name="message" /> Contacter {ride.driver.shortName}
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col items-center justify-center p-4 bg-brand-surface rounded-2xl text-center">
            <OpenRideIcon name="id-card" className="text-brand-textMuted text-xl mb-2" />
            <span className="text-xs text-brand-textMuted">Identité vérifiée</span>
          </div>
          <div className="flex flex-col items-center justify-center p-4 bg-brand-surface rounded-2xl text-center">
            <OpenRideIcon name="phone" className="text-brand-textMuted text-xl mb-2" />
            <span className="text-xs text-brand-textMuted">Téléphone vérifié</span>
          </div>
          <div className="flex flex-col items-center justify-center p-4 bg-brand-surface rounded-2xl text-center">
            <OpenRideIcon name="envelope" className="text-brand-textMuted text-xl mb-2" />
            <span className="text-xs text-brand-textMuted">Email vérifié</span>
          </div>
          <div className="flex flex-col items-center justify-center p-4 bg-brand-surface rounded-2xl text-center">
            <OpenRideIcon name="facebook" className="text-brand-textMuted text-xl mb-2" />
            <span className="text-xs text-brand-textMuted">50+ Amis</span>
          </div>
        </div>
      </section>

      <section id="car-details" className="glass-card rounded-3xl p-6 md:p-8">
        <h3 className="text-xl font-bold text-white mb-6">Véhicule</h3>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/2 h-48 rounded-2xl bg-brand-surfaceLight overflow-hidden flex items-center justify-center relative">
            <img
              className="w-full h-full object-cover"
              src={ride.carImage}
              alt={`${ride.driver.vehicleColor} ${ride.driver.vehicleName}`}
            />
          </div>
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <h4 className="text-2xl font-bold text-white mb-2">{ride.driver.vehicleName}</h4>
            <p className="text-brand-textMuted mb-6">{ride.driver.vehicleColor}</p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-surface flex items-center justify-center border border-gray-700">
                  <OpenRideIcon name="couch" className="text-brand-textMuted" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Confortable</p>
                  <p className="text-xs text-brand-textMuted">Espace suffisant pour les jambes</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-surface flex items-center justify-center border border-gray-700">
                  <OpenRideIcon name="snowflake" className="text-brand-textMuted" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Climatisé</p>
                  <p className="text-xs text-brand-textMuted">Climatisation fonctionnelle</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="rules-policy" className="glass-card rounded-3xl p-6 md:p-8">
        <h3 className="text-xl font-bold text-white mb-6">Règles et Préférences</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-4 bg-brand-surface p-4 rounded-2xl border border-gray-700">
              <OpenRideIcon name="suitcase" className="text-brand-accentPurple text-xl w-6" />
              <div>
                <p className="text-sm font-medium text-white">Bagages</p>
                <p className="text-xs text-brand-textMuted">{ride.preferences.luggage}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-brand-surface p-4 rounded-2xl border border-gray-700">
              <OpenRideIcon name="paw" className="text-brand-textMuted text-xl w-6" />
              <div>
                <p className="text-sm font-medium text-white">Animaux</p>
                <p className="text-xs text-brand-textMuted">
                  {ride.preferences.petsAllowed ? "Autorisés" : "Non autorisés"}
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-4 bg-brand-surface p-4 rounded-2xl border border-gray-700">
              <OpenRideIcon name="smoking" className="text-brand-textMuted text-xl w-6" />
              <div>
                <p className="text-sm font-medium text-white">Fumeur</p>
                <p className="text-xs text-brand-textMuted">
                  {ride.preferences.smokingAllowed ? "Autorisé" : "Non fumeur"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-brand-surface p-4 rounded-2xl border border-gray-700">
              <OpenRideIcon name="volume-high" className="text-brand-accentGreen text-xl w-6" />
              <div>
                <p className="text-sm font-medium text-white">Ambiance</p>
                <p className="text-xs text-brand-textMuted">{ride.preferences.ambience}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800">
          <h4 className="text-sm font-bold text-white mb-2">Conditions d'annulation</h4>
          <p className="text-sm text-brand-textMuted leading-relaxed">
            Remboursement intégral si vous annulez plus de 24h avant le départ. Remboursement à 50% si vous annulez entre 24h et 12h avant le départ. Aucun remboursement si vous annulez moins de 12h avant le départ.
          </p>
        </div>
      </section>
    </div>
  );
}

export default TripDetailsMainColumn;
