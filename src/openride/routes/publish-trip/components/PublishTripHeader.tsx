import { DashboardTopBar } from "@/openride/shared/layouts";

const PublishTripHeader = () => (
  <DashboardTopBar
    title="Publier un Trajet"
    actions={
      <button className="text-sm font-medium text-brand-textMuted hover:text-white transition-colors px-4 py-2 border border-gray-700 rounded-lg hover:bg-gray-800">
        Sauvegarder Brouillon
      </button>
    }
  />
);

export default PublishTripHeader;
