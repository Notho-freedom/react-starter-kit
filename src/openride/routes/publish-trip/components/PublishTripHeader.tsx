import { DashboardTopBar, DashboardTopBarActionGroup } from "@/openride/shared/layouts";

const PublishTripHeader = () => (
  <DashboardTopBar
    subtitle="Préparez votre annonce et vérifiez les détails avant publication."
    title="Publier un Trajet"
    actions={
      <DashboardTopBarActionGroup searchPlaceholder="Rechercher une ville...">
        <button className="rounded-lg border border-gray-700 px-4 py-2 text-sm font-medium text-brand-textMuted transition-colors hover:bg-gray-800 hover:text-white">
          Sauvegarder Brouillon
        </button>
      </DashboardTopBarActionGroup>
    }
  />
);

export default PublishTripHeader;
