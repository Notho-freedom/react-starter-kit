import { DashboardTopBar } from "@/openride/shared/layouts";
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
    title="Paiement & Réservation"
    actions={
      <div className="hidden md:flex items-center gap-2 text-sm text-brand-textMuted bg-brand-surface px-4 py-2 rounded-full border border-gray-800">
        <OpenRideIcon name="shield-check" className="text-brand-accentGreen" />
        <span>Paiement Sécurisé</span>
      </div>
    }
  />
);

export default PaymentBookingHeader;
