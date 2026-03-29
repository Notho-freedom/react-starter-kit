import { OpenRideIcon } from "@/openride/shared/icons";
import { useOpenRideWorkflow } from "@/openride/shared/workflows";

const PublishTripSidebar = () => {
  const workflow = useOpenRideWorkflow();
  const draft = workflow.publishDraft;

  return (
    <div className="lg:col-span-4">
      <div className="sticky top-6 flex flex-col gap-6">
          {/* Listing Preview Card */}
          <div className="bg-brand-surfaceLight rounded-3xl p-6 border border-gray-700 shadow-2xl">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 border-b border-gray-700 pb-2">Aperçu de l'annonce</h3>
            <div className="bg-brand-surface rounded-2xl p-5 border border-gray-700 mb-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex flex-col gap-3 relative">
                  {/* Vertical line */}
                  <div className="absolute left-1.5 top-3 bottom-3 w-0.5 bg-gray-600" />
                  <div className="flex items-center gap-3 z-10">
                    <div className="w-3 h-3 rounded-full bg-brand-accentGreen" />
                    <span className="text-white font-medium">{draft.departure || "Départ"}</span>
                  </div>
                  <div className="flex items-center gap-3 z-10">
                    <div className="w-3 h-3 rounded-full border-2 border-brand-accentYellow bg-brand-surface" />
                    <span className="text-white font-medium">{draft.destination || "Arrivée"}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-brand-accentGreen">{draft.price}€</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm text-brand-textMuted border-t border-gray-700 pt-4 mt-2">
                <div className="flex items-center gap-2">
                  <OpenRideIcon name="calendar" /> {(draft.date || "Aujourd'hui")}, {draft.time || "08:00"}
                </div>
                <div className="flex items-center gap-2">
                  <OpenRideIcon name="users" /> {draft.seats} places
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <span className="bg-gray-800 text-gray-300 text-xs px-2 py-1 rounded-md"><OpenRideIcon name="suitcase" /> {draft.luggageAllowed ? "Bagages" : "Sans bagages"}</span>
              </div>
            </div>
            {/* Publish CTA */}
            <button data-openride-publish-action="publish" className="w-full bg-brand-accentGreen hover:bg-[#8be08b] text-brand-dark text-lg font-bold py-4 rounded-xl transition-colors shadow-lg shadow-brand-accentGreen/20 flex items-center justify-center gap-2 mb-4">
              <OpenRideIcon name="paper-plane" /> Publier le trajet
            </button>
            <p className="text-center text-xs text-brand-textMuted">
              En publiant, vous acceptez les <a href="#" className="text-brand-accentGreen hover:underline">Conditions d'utilisation</a>.
            </p>
          </div>
      </div>
      </div>
  );
};

export default PublishTripSidebar;
