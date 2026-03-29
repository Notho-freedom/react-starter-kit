import { useNavigate } from "react-router-dom";
import { OpenRideIcon } from "@/openride/shared/icons";
import { useOpenRideWorkflow } from "@/openride/shared/workflows";

function TripContextSidebar() {
  const navigate = useNavigate();
  const workflow = useOpenRideWorkflow();
  const conversation = workflow.activeConversation ?? workflow.conversations[0];
  const ride = workflow.searchRides.find((entry) => entry.id === conversation?.rideId) ?? workflow.selectedRide;

  if (!conversation || !ride) {
    return null;
  }

  return (
    <div id="context-sidebar" className="hidden lg:flex w-80 flex-col border-l border-gray-800/50 bg-brand-background shrink-0 overflow-y-auto hide-scroll">
      <div className="p-6 border-b border-gray-800/50">
        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Détails du Trajet</h3>
        <div className="bg-brand-surface rounded-2xl p-4 border border-gray-700 shadow-lg">
          <div className="flex justify-between items-start mb-4">
            <div className="flex flex-col gap-3 relative">
              <div className="absolute left-1.5 top-3 bottom-3 w-0.5 bg-gray-600" />
              <div className="flex items-center gap-3 z-10">
                <div className="w-3 h-3 rounded-full bg-brand-accentGreen" />
                <span className="text-white font-medium text-sm">{ride.originCity}</span>
              </div>
              <div className="flex items-center gap-3 z-10">
                <div className="w-3 h-3 rounded-full border-2 border-brand-accentYellow bg-brand-surface" />
                <span className="text-white font-medium text-sm">{ride.arrivalLocation}</span>
              </div>
            </div>
          </div>
          <div className="space-y-2 mt-4 pt-4 border-t border-gray-700/50">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400"><OpenRideIcon name="calendar" className="mr-2" />Date</span>
              <span className="text-white font-medium">{ride.departureDateLabel}, {ride.departureTime}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400"><OpenRideIcon name="users" className="mr-2" />Places</span>
              <span className="text-white font-medium">{workflow.bookingDraft.seatCount} réservée / {ride.seatsTotal}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400"><OpenRideIcon name="euro-sign" className="mr-2" />Prix</span>
              <span className="text-brand-accentGreen font-bold">{ride.priceLabel}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 border-b border-gray-800/50">
        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Statut de Réservation</h3>
        <div className="flex items-center gap-3 p-3 bg-brand-success/10 border border-brand-success/20 rounded-xl mb-4">
          <div className="w-8 h-8 rounded-full bg-brand-success/20 flex items-center justify-center text-brand-success">
            <OpenRideIcon name="check" />
          </div>
          <div>
            <p className="text-white font-medium text-sm">{conversation.statusLabel}</p>
            <p className="text-xs text-brand-success">{conversation.paymentStateLabel}</p>
          </div>
        </div>
        <div className="space-y-3">
          <button
            className="w-full py-2.5 px-4 rounded-xl border border-gray-700 bg-brand-surface hover:bg-gray-800 text-white text-sm font-medium transition-colors flex items-center justify-center gap-2"
            onClick={() => navigate("/trip-details")}
            type="button"
          >
            <OpenRideIcon name="route" /> Voir le trajet
          </button>
          <button className="w-full py-2.5 px-4 rounded-xl border border-gray-700 bg-transparent hover:bg-brand-error/10 hover:text-brand-error hover:border-brand-error/30 text-gray-400 text-sm font-medium transition-colors flex items-center justify-center gap-2">
            <OpenRideIcon name="ban" /> Annuler la réservation
          </button>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Profil du conducteur</h3>
        <div className="flex items-center gap-3 mb-4">
          <img src={conversation.participantAvatar} alt={conversation.participantName} className="w-12 h-12 rounded-full border border-gray-600" />
          <div>
            <h4 className="text-white font-medium">{conversation.participantName}</h4>
            <div className="flex items-center gap-1 text-xs text-brand-accentYellow">
              <OpenRideIcon name="star" />
              <span className="font-bold">{ride.driver.rating.toFixed(1)}</span>
              <span className="text-gray-500">({ride.driver.reviewCount} avis)</span>
            </div>
          </div>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-gray-400">
            <OpenRideIcon name="shield-check" className="text-brand-success" /> Identité vérifiée
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <OpenRideIcon name="phone" className="text-brand-success" /> Téléphone vérifié
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <OpenRideIcon name="clock" /> Membre depuis {ride.driver.memberSince}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TripContextSidebar;
