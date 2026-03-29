import { OpenRideIcon } from "@/openride/shared/icons";

const PaymentBookingHeader = () => (
<header id="top-header" className="sticky top-0 z-40 h-20 shrink-0 glass-panel flex items-center justify-between border-b border-gray-800/50 px-6 lg:px-10">
    <div className="flex items-center gap-4">
      <button
        type="button"
        data-openride-route="/trip-details"
        className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:bg-white/10 transition-colors text-white"
      >
        <OpenRideIcon name="arrow-left" />
      </button>
      <h1 className="text-xl md:text-2xl font-semibold text-white">Paiement &amp; Réservation</h1>
    </div>
    <div className="flex items-center gap-4">
      <div className="hidden md:flex items-center gap-2 text-sm text-brand-textMuted bg-brand-surface px-4 py-2 rounded-full border border-gray-800">
        <OpenRideIcon name="shield-check" className="text-brand-accentGreen" />
        <span>Paiement Sécurisé</span>
      </div>
    </div>
  </header>
);

export default PaymentBookingHeader;
