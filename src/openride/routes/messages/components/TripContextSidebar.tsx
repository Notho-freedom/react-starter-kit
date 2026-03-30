import { useNavigate } from "react-router-dom";
import { OpenRideIcon } from "@/openride/shared/icons";
import { useOpenRideWorkflow } from "@/openride/shared/workflows";

function TripContextSidebar() {
  const navigate = useNavigate();
  const workflow = useOpenRideWorkflow();
  const conversation = workflow.activeConversation ?? workflow.conversations[0];

  if (!conversation) {
    return null;
  }

  const contextType = conversation.contextType;
  const ride = workflow.searchRides.find((entry) => entry.id === conversation.rideId) ?? workflow.selectedRide;
  const availability =
    workflow.myDriverAvailabilities.find((entry) => entry.id === conversation.rideId) ??
    workflow.driverAvailabilities.find((entry) => entry.id === conversation.rideId);
  const request =
    workflow.myRideRequests.find((entry) => entry.id === conversation.rideId) ??
    workflow.rideRequests.find((entry) => entry.id === conversation.rideId);

  return (
    <div id="context-sidebar" className="hidden lg:flex w-80 flex-col border-l border-gray-800/50 bg-brand-background shrink-0 overflow-y-auto hide-scroll">
      <div className="p-6 border-b border-gray-800/50">
        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">
          {contextType === "availability"
            ? "Disponibilité"
            : contextType === "request"
              ? "Demande passager"
              : "Détails du Trajet"}
        </h3>

        <div className="bg-brand-surface rounded-2xl p-4 border border-gray-700 shadow-lg">
          {contextType === "ride" && ride ? (
            <>
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
            </>
          ) : null}

          {contextType === "availability" && availability ? (
            <>
              <div className="mb-3">
                <span className="rounded-full bg-brand-accentGreen/10 px-3 py-1 text-xs font-medium text-brand-accentGreen">
                  Disponibilité
                </span>
              </div>
              <p className="text-sm font-medium text-white">{availability.routeLabel}</p>
              <div className="space-y-2 mt-4 pt-4 border-t border-gray-700/50">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400"><OpenRideIcon name="calendar" className="mr-2" />Date</span>
                  <span className="text-white font-medium">{availability.date}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400"><OpenRideIcon name="clock" className="mr-2" />Créneau</span>
                  <span className="text-white font-medium">{availability.timeWindow}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400"><OpenRideIcon name="users" className="mr-2" />Places</span>
                  <span className="text-white font-medium">{availability.seats}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400"><OpenRideIcon name="car" className="mr-2" />Véhicule</span>
                  <span className="text-white font-medium">{availability.vehicleName}</span>
                </div>
              </div>
              {availability.notes ? (
                <p className="mt-3 text-xs text-brand-textMuted">{availability.notes}</p>
              ) : null}
            </>
          ) : null}

          {contextType === "request" && request ? (
            <>
              <div className="mb-3">
                <span className="rounded-full bg-brand-accentPurple/10 px-3 py-1 text-xs font-medium text-brand-accentPurple">
                  Demande passager
                </span>
              </div>
              <p className="text-sm font-medium text-white">{request.routeLabel}</p>
              <div className="space-y-2 mt-4 pt-4 border-t border-gray-700/50">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400"><OpenRideIcon name="calendar" className="mr-2" />Date</span>
                  <span className="text-white font-medium">{request.date}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400"><OpenRideIcon name="clock" className="mr-2" />Créneau</span>
                  <span className="text-white font-medium">{request.timeWindow}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400"><OpenRideIcon name="users" className="mr-2" />Places</span>
                  <span className="text-white font-medium">{request.seatCount}</span>
                </div>
              </div>
              {request.notes ? (
                <p className="mt-3 text-xs text-brand-textMuted">{request.notes}</p>
              ) : null}
            </>
          ) : null}
        </div>
      </div>

      <div className="p-6 border-b border-gray-800/50">
        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Statut</h3>
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
          {contextType === "ride" ? (
            <button
              className="w-full py-2.5 px-4 rounded-xl border border-gray-700 bg-brand-surface hover:bg-gray-800 text-white text-sm font-medium transition-colors flex items-center justify-center gap-2"
              onClick={() => navigate("/trip-details")}
              type="button"
            >
              <OpenRideIcon name="route" /> Voir le trajet
            </button>
          ) : null}
          <button className="w-full py-2.5 px-4 rounded-xl border border-gray-700 bg-transparent hover:bg-brand-error/10 hover:text-brand-error hover:border-brand-error/30 text-gray-400 text-sm font-medium transition-colors flex items-center justify-center gap-2">
            <OpenRideIcon name="ban" /> Annuler
          </button>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">
          Profil {conversation.participantRoleLabel ? `(${conversation.participantRoleLabel})` : ""}
        </h3>
        <div className="flex items-center gap-3 mb-4">
          <img src={conversation.participantAvatar} alt={conversation.participantName} className="w-12 h-12 rounded-full border border-gray-600" />
          <div>
            <h4 className="text-white font-medium">{conversation.participantName}</h4>
            {ride ? (
              <div className="flex items-center gap-1 text-xs text-brand-accentYellow">
                <OpenRideIcon name="star" />
                <span className="font-bold">{ride.driver.rating.toFixed(1)}</span>
                <span className="text-gray-500">({ride.driver.reviewCount} avis)</span>
              </div>
            ) : availability ? (
              <div className="flex items-center gap-1 text-xs text-brand-accentYellow">
                <OpenRideIcon name="star" />
                <span className="font-bold">{availability.driverRating.toFixed(1)}</span>
              </div>
            ) : (
              <p className="text-xs text-gray-500">{conversation.participantRoleLabel}</p>
            )}
          </div>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-gray-400">
            <OpenRideIcon name="shield-check" className="text-brand-success" /> Identité vérifiée
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <OpenRideIcon name="phone" className="text-brand-success" /> Téléphone vérifié
          </div>
        </div>
      </div>
    </div>
  );
}

export default TripContextSidebar;
