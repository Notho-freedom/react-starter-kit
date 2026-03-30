import { useNavigate } from "react-router-dom";
import { OpenRideIcon } from "@/openride/shared/icons";
import { useOpenRideWorkflow } from "@/openride/shared/workflows";

const PublishTripSidebar = () => {
  const navigate = useNavigate();
  const workflow = useOpenRideWorkflow();
  const isAvailabilityMode = workflow.publishMode === "availability";
  const tripDraft = workflow.publishDraft;
  const availabilityDraft = workflow.availabilityDraft;
  const requestMatches = workflow.getDriverRequestMatches().slice(0, 3);

  return (
    <div className="lg:col-span-4">
      <div className="sticky top-6 flex flex-col gap-6">
        <div className="bg-brand-surfaceLight rounded-3xl p-6 border border-gray-700 shadow-2xl">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 border-b border-gray-700 pb-2">
            Aperçu de l'annonce
          </h3>

          <div className="bg-brand-surface rounded-2xl p-5 border border-gray-700 mb-6">
            {isAvailabilityMode ? (
              <>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-brand-textMuted">Zone</p>
                    <p className="mt-1 text-lg font-semibold text-white">
                      {availabilityDraft.zone || "Zone à définir"}
                    </p>
                  </div>
                  <span className="rounded-full bg-brand-accentGreen/10 px-3 py-1 text-xs font-medium text-brand-accentGreen">
                    Disponibilité
                  </span>
                </div>
                <div className="mt-4 space-y-3 text-sm text-brand-textMuted">
                  <div className="flex items-center gap-2">
                    <OpenRideIcon name="calendar" />
                    <span>{availabilityDraft.date || "Date flexible"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <OpenRideIcon name="clock" />
                    <span>
                      {availabilityDraft.startTime} - {availabilityDraft.endTime}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <OpenRideIcon name="users" />
                    <span>{availabilityDraft.seats} places</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <OpenRideIcon name="car" />
                    <span>{availabilityDraft.vehicleName}</span>
                  </div>
                </div>
                <p className="mt-4 text-sm text-brand-textMuted">{availabilityDraft.notes}</p>
              </>
            ) : (
              <>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex flex-col gap-3 relative">
                    <div className="absolute left-1.5 top-3 bottom-3 w-0.5 bg-gray-600" />
                    <div className="flex items-center gap-3 z-10">
                      <div className="w-3 h-3 rounded-full bg-brand-accentGreen" />
                      <span className="text-white font-medium">
                        {tripDraft.departure || "Départ"}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 z-10">
                      <div className="w-3 h-3 rounded-full border-2 border-brand-accentYellow bg-brand-surface" />
                      <span className="text-white font-medium">
                        {tripDraft.destination || "Arrivée"}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-brand-accentGreen">
                      CA${tripDraft.price}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm text-brand-textMuted border-t border-gray-700 pt-4 mt-2">
                  <div className="flex items-center gap-2">
                    <OpenRideIcon name="calendar" /> {(tripDraft.date || "Aujourd'hui")},{" "}
                    {tripDraft.time || "08:00"}
                  </div>
                  <div className="flex items-center gap-2">
                    <OpenRideIcon name="users" /> {tripDraft.seats} places
                  </div>
                </div>
              </>
            )}
          </div>

          <button
            data-openride-publish-action="publish"
            className="w-full bg-brand-accentGreen hover:bg-[#8be08b] text-brand-dark text-lg font-bold py-4 rounded-xl transition-colors shadow-lg shadow-brand-accentGreen/20 flex items-center justify-center gap-2 mb-4"
          >
            <OpenRideIcon name="paper-plane" />
            {isAvailabilityMode ? "Publier la disponibilité" : "Publier le trajet"}
          </button>
          <p className="text-center text-xs text-brand-textMuted">
            En publiant, vous acceptez les{" "}
            <a href="#" className="text-brand-accentGreen hover:underline">
              Conditions d'utilisation
            </a>
            .
          </p>
        </div>

        {isAvailabilityMode ? (
          <div className="glass-card rounded-3xl p-6">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h4 className="text-lg font-bold text-white">Demandes compatibles</h4>
              <span className="text-xs text-brand-textMuted">{requestMatches.length} match(es)</span>
            </div>
            <div className="space-y-4">
              {requestMatches.map((match) => (
                <div key={match.id} className="rounded-2xl border border-white/10 bg-brand-surface p-4">
                  <div className="flex items-center gap-3">
                    <img
                      alt={match.counterpartName}
                      className="h-10 w-10 rounded-full border border-white/10"
                      src={match.counterpartAvatar}
                    />
                    <div className="min-w-0">
                      <p className="truncate font-medium text-white">{match.title}</p>
                      <p className="truncate text-xs text-brand-textMuted">{match.routeLabel}</p>
                    </div>
                  </div>
                  <p className="mt-3 text-xs text-brand-accentGreen">{match.secondaryLabel}</p>
                  <div className="mt-4 flex justify-between gap-3">
                    <span className="text-xs text-gray-500">{match.metaLabel}</span>
                    <button
                      className="rounded-lg bg-brand-purple px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-purpleLight"
                      type="button"
                      onClick={async () => {
                        await workflow.openConversationForContext({
                          contextId: match.contextId,
                          contextType: match.contextType,
                          counterpartAvatar: match.counterpartAvatar,
                          counterpartName: match.counterpartName,
                          counterpartRoleLabel: match.counterpartRoleLabel,
                          routeLabel: match.routeLabel,
                          statusLabel: match.statusLabel,
                        });
                        navigate("/messages");
                      }}
                    >
                      Contacter
                    </button>
                  </div>
                </div>
              ))}
              {!requestMatches.length ? (
                <div className="rounded-2xl border border-dashed border-white/10 bg-brand-surface/40 px-4 py-5 text-sm text-brand-textMuted">
                  Aucune demande passager compatible pour ce créneau pour l'instant.
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default PublishTripSidebar;
