import { DashboardTopBar, DashboardTopBarActionGroup } from "@/openride/shared/layouts";
import { OpenRideIcon } from "@/openride/shared/icons";

const PaymentBookingHeader = () => (
  <DashboardTopBar
    leading={
      <button
        type="button"
        data-openride-route="/trip-details"
        className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:bg-white/10 transition-colors text-white"
      >
        <OpenRideIcon name="arrow-left" />
      </button>
    }
    subtitle="Vérifiez les informations et confirmez votre réservation en toute sécurité."
    title="Paiement & Réservation"
    actions={
      <DashboardTopBarActionGroup
        searchPlaceholder="Rechercher une réservation..."
        searchWidthClassName="w-44 xl:w-56"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-gray-800 bg-brand-surface px-4 py-2 text-sm text-brand-textMuted">
          <OpenRideIcon name="shield-check" className="text-brand-accentGreen" />
          <span>Paiement Sécurisé</span>
        </div>
      </DashboardTopBarActionGroup>
    }
  />
);

export default PaymentBookingHeader;
