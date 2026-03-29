import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { OpenRideIcon } from "@/openride/shared/icons";
import { useOpenRideWorkflow, type MatchSuggestion } from "@/openride/shared/workflows";

function RideRequestComposer() {
  const navigate = useNavigate();
  const workflow = useOpenRideWorkflow();
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  const suggestions = useMemo(
    () =>
      workflow.getSearchMatches(
        submittedId
          ? workflow.rideRequests.find((request) => request.id === submittedId) ?? workflow.rideRequestDraft
          : workflow.rideRequestDraft,
      ),
    [submittedId, workflow],
  );

  const handleContactMatch = (match: MatchSuggestion) => {
    if (match.contextType === "ride") {
      workflow.setSelectedRide(match.contextId);
      workflow.openConversationForRide(match.contextId);
    } else {
      workflow.openConversationForContext({
        contextId: match.contextId,
        contextType: match.contextType,
        counterpartAvatar: match.counterpartAvatar,
        counterpartName: match.counterpartName,
        counterpartRoleLabel: match.counterpartRoleLabel,
        routeLabel: match.routeLabel,
        statusLabel: match.statusLabel,
      });
    }

    navigate("/messages");
  };

  return (
    <div className="flex-1 overflow-y-auto hide-scroll p-6 lg:p-10">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 xl:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
        <section className="glass-card rounded-3xl p-6 md:p-8">
          <div className="mb-8 flex items-start justify-between gap-4">
            <div>
              <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-brand-accentGreen">
                Demande passager
              </p>
              <h2 className="text-2xl font-bold text-white">Publier une demande de trajet</h2>
              <p className="mt-2 max-w-2xl text-sm text-brand-textMuted">
                Décrivez votre besoin et nous vous montrons immédiatement les trajets planifiés
                et les chauffeurs disponibles qui peuvent correspondre.
              </p>
            </div>
            <div className="hidden rounded-2xl border border-brand-accentGreen/20 bg-brand-accentGreen/10 px-4 py-3 text-sm text-brand-accentGreen md:flex md:items-center md:gap-2">
              <OpenRideIcon name="comments" />
              Contact direct inclus
            </div>
          </div>

          {submittedId ? (
            <div className="mb-6 flex items-center gap-3 rounded-2xl border border-brand-success/20 bg-brand-success/10 px-4 py-3 text-sm text-brand-success">
              <OpenRideIcon name="circle-check" />
              Votre demande a bien été publiée. Les correspondances ci-dessous sont déjà
              disponibles.
            </div>
          ) : null}

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-brand-textMuted">Départ</label>
              <input
                className="w-full input-field rounded-xl px-4 py-3"
                name="requestOrigin"
                placeholder="Ville de départ"
                value={workflow.rideRequestDraft.origin}
                onChange={(event) =>
                  workflow.updateRideRequestDraft({ origin: event.target.value })
                }
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-brand-textMuted">Destination</label>
              <input
                className="w-full input-field rounded-xl px-4 py-3"
                name="requestDestination"
                placeholder="Ville d'arrivée"
                value={workflow.rideRequestDraft.destination}
                onChange={(event) =>
                  workflow.updateRideRequestDraft({ destination: event.target.value })
                }
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-brand-textMuted">Date</label>
              <input
                className="w-full input-field rounded-xl px-4 py-3 text-white [color-scheme:dark]"
                name="requestDate"
                type="date"
                value={workflow.rideRequestDraft.date}
                onChange={(event) => workflow.updateRideRequestDraft({ date: event.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-brand-textMuted">
                  Début créneau
                </label>
                <input
                  className="w-full input-field rounded-xl px-4 py-3 text-white [color-scheme:dark]"
                  name="requestStartTime"
                  type="time"
                  value={workflow.rideRequestDraft.startTime}
                  onChange={(event) =>
                    workflow.updateRideRequestDraft({ startTime: event.target.value })
                  }
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-brand-textMuted">
                  Fin créneau
                </label>
                <input
                  className="w-full input-field rounded-xl px-4 py-3 text-white [color-scheme:dark]"
                  name="requestEndTime"
                  type="time"
                  value={workflow.rideRequestDraft.endTime}
                  onChange={(event) =>
                    workflow.updateRideRequestDraft({ endTime: event.target.value })
                  }
                />
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-[180px_minmax(0,1fr)]">
            <div>
              <label className="mb-2 block text-sm font-medium text-brand-textMuted">Places</label>
              <div className="flex items-center gap-3 rounded-xl border border-gray-700 bg-brand-surface px-3 py-2">
                <button
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-brand-textMuted transition-colors hover:bg-gray-700 hover:text-white"
                  type="button"
                  onClick={() =>
                    workflow.updateRideRequestDraft({
                      seatCount: Math.max(workflow.rideRequestDraft.seatCount - 1, 1),
                    })
                  }
                >
                  <OpenRideIcon name="minus" />
                </button>
                <span className="w-6 text-center text-lg font-bold text-white">
                  {workflow.rideRequestDraft.seatCount}
                </span>
                <button
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-brand-textMuted transition-colors hover:bg-gray-700 hover:text-white"
                  type="button"
                  onClick={() =>
                    workflow.updateRideRequestDraft({
                      seatCount: Math.min(workflow.rideRequestDraft.seatCount + 1, 4),
                    })
                  }
                >
                  <OpenRideIcon name="plus" />
                </button>
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-brand-textMuted">
                Notes pour le chauffeur
              </label>
              <textarea
                className="w-full input-field h-24 resize-none rounded-xl px-4 py-3"
                name="requestNotes"
                placeholder="Bagages, point de rendez-vous, flexibilité, etc."
                value={workflow.rideRequestDraft.notes}
                onChange={(event) =>
                  workflow.updateRideRequestDraft({ notes: event.target.value })
                }
              />
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              className="rounded-xl bg-brand-accentGreen px-6 py-3 font-semibold text-brand-dark transition-colors hover:bg-[#8be08b]"
              type="button"
              onClick={() => {
                const request = workflow.createRideRequest({});
                setSubmittedId(request.id);
              }}
            >
              Publier ma demande
            </button>
            <p className="text-sm text-brand-textMuted">
              Votre demande apparaîtra aussi dans <span className="text-white">Mes trajets</span>.
            </p>
          </div>
        </section>

        <aside className="space-y-6">
          <div className="glass-card rounded-3xl p-6">
            <h3 className="mb-4 text-lg font-bold text-white">Correspondances suggérées</h3>
            <div className="space-y-4">
              {suggestions.slice(0, 4).map((match) => (
                <div
                  key={match.id}
                  className="rounded-2xl border border-white/10 bg-brand-surface p-4"
                >
                  <div className="mb-3 flex items-center gap-3">
                    <img
                      alt={match.counterpartName}
                      className="h-11 w-11 rounded-full border border-white/10"
                      src={match.counterpartAvatar}
                    />
                    <div className="min-w-0">
                      <p className="truncate font-medium text-white">{match.title}</p>
                      <p className="truncate text-xs text-brand-textMuted">
                        {match.counterpartRoleLabel}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-white">{match.routeLabel}</p>
                  <p className="mt-1 text-xs text-brand-textMuted">{match.secondaryLabel}</p>
                  <p className="mt-1 text-xs text-brand-accentGreen">
                    {match.priceLabel ? `${match.priceLabel} • ` : ""}
                    {match.metaLabel}
                  </p>
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <span className="text-xs text-gray-400">{match.statusLabel}</span>
                    <button
                      className="rounded-lg bg-brand-purple px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-purpleLight"
                      type="button"
                      onClick={() => handleContactMatch(match)}
                    >
                      Contacter
                    </button>
                  </div>
                </div>
              ))}
              {!suggestions.length ? (
                <div className="rounded-2xl border border-dashed border-white/10 bg-brand-surface/40 px-4 py-6 text-sm text-brand-textMuted">
                  Aucune correspondance immédiate pour le moment. Publiez quand même votre
                  demande pour être visible.
                </div>
              ) : null}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default RideRequestComposer;
