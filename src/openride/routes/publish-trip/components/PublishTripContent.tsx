import { useOpenRideWorkflow } from "@/openride/shared/workflows";
import PublishTripFooter from "./PublishTripFooter";
import PublishTripFormSections from "./PublishTripFormSections";
import PublishTripSidebar from "./PublishTripSidebar";

const PublishTripContent = () => {
  const workflow = useOpenRideWorkflow();
  const isAvailabilityMode = workflow.publishMode === "availability";

  return (
    <div className="flex-1 overflow-y-auto hide-scroll p-6 lg:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-brand-surface/50 p-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand-accentGreen">
              Publication
            </p>
            <h2 className="mt-1 text-xl font-bold text-white">
              {isAvailabilityMode ? "Je suis disponible" : "Trajet planifié"}
            </h2>
            <p className="mt-2 text-sm text-brand-textMuted">
              {isAvailabilityMode
                ? "Signalez votre zone et votre créneau libre pour que des passagers vous contactent même sans destination fixée."
                : "Publiez un trajet classique avec départ, arrivée et toutes les informations utiles."}
            </p>
          </div>

          <div className="flex items-center rounded-full border border-white/10 bg-brand-surfaceLight p-1">
            <button
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                !isAvailabilityMode ? "toggle-active" : "toggle-inactive hover:text-white"
              }`}
              type="button"
              onClick={() => workflow.setPublishMode("planned-ride")}
            >
              Trajet planifié
            </button>
            <button
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                isAvailabilityMode ? "toggle-active" : "toggle-inactive hover:text-white"
              }`}
              type="button"
              onClick={() => workflow.setPublishMode("availability")}
            >
              Je suis disponible
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <PublishTripFormSections />
          <PublishTripSidebar />
        </div>
      </div>
      <PublishTripFooter />
    </div>
  );
};

export default PublishTripContent;
