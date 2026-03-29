import { OpenRideIcon } from "@/openride/shared/icons";
import { useOpenRideWorkflow } from "@/openride/shared/workflows";

function TripDetailsBookingSidebar() {
  const workflow = useOpenRideWorkflow();
  const ride = workflow.selectedRide ?? workflow.searchRides[0];

  if (!ride) {
    return null;
  }

  const seatCount = Math.max(workflow.bookingDraft.seatCount, 1);
  const subtotal = ride.price * seatCount;
  const total = subtotal + ride.serviceFee + ride.taxes;

  return (
    <div className="lg:col-span-5 xl:col-span-4">
      <div className="sticky top-6 flex flex-col gap-6">
        <div className="bg-brand-surfaceLight rounded-3xl p-6 md:p-8 border border-gray-700 shadow-2xl">
          <div className="flex justify-between items-end mb-6 pb-6 border-b border-gray-700">
            <div>
              <p className="text-sm text-brand-textMuted mb-1">Prix total</p>
              <p className="text-4xl font-bold text-white">{ride.priceLabel}</p>
            </div>
            <div className="text-right">
              {ride.preferences.instantBook ? (
                <span className="inline-block bg-brand-accentGreen/20 text-brand-accentGreen px-3 py-1 rounded-full text-xs font-bold border border-brand-accentGreen/30 mb-2">
                  <OpenRideIcon name="bolt" className="mr-1" /> Réservation Instantanée
                </span>
              ) : null}
            </div>
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-white font-medium">Sélectionner les places</h4>
              <span className="text-xs text-brand-accentYellow">{ride.seatsLeft} places restantes</span>
            </div>
            <div className="bg-brand-surface rounded-2xl p-6 border border-gray-700 flex justify-center">
              <div className="grid grid-cols-2 gap-x-12 gap-y-6 relative">
                <div className="absolute -top-4 left-4 w-6 h-6 border-2 border-gray-600 rounded-full flex items-center justify-center">
                  <div className="w-1 h-4 bg-gray-600" />
                </div>
                <div className="w-16 h-20 rounded-xl bg-gray-800 border border-gray-600 flex items-center justify-center opacity-50 cursor-not-allowed relative">
                  <OpenRideIcon name="user" className="text-gray-500 text-xl" />
                  <span className="absolute -bottom-6 text-[10px] text-gray-500 whitespace-nowrap">Conducteur</span>
                </div>
                <button className="w-16 h-20 rounded-xl bg-brand-surfaceLight border border-gray-600 seat-btn hover:border-brand-accentGreen flex items-center justify-center relative group">
                  <OpenRideIcon name="couch" className="text-brand-textMuted group-hover:text-white transition-colors text-xl" />
                </button>
                <button className="w-16 h-20 rounded-xl bg-brand-surfaceLight border border-gray-600 seat-btn hover:border-brand-accentGreen flex items-center justify-center relative group">
                  <OpenRideIcon name="couch" className="text-brand-textMuted group-hover:text-white transition-colors text-xl" />
                </button>
                <div className="w-16 h-20 rounded-xl bg-gray-800 border border-gray-600 flex items-center justify-center seat-btn taken relative">
                  <OpenRideIcon name="user" className="text-gray-500 text-xl" />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3 mb-8">
            <div className="flex justify-between text-sm">
              <span className="text-brand-textMuted">{seatCount} Place{seatCount > 1 ? "s" : ""}</span>
              <span className="text-white font-medium">€{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-brand-textMuted">Frais de service</span>
              <span className="text-white font-medium">€{ride.serviceFee.toFixed(2)}</span>
            </div>
            <div className="pt-3 border-t border-gray-700 flex justify-between text-base font-bold">
              <span className="text-white">Total</span>
              <span className="text-brand-accentGreen">€{total.toFixed(2)}</span>
            </div>
          </div>

          <button
            type="button"
            data-openride-route="/payment-booking"
            className="w-full bg-brand-accentGreen hover:bg-[#8be08b] text-brand-dark text-lg font-bold py-4 rounded-xl transition-colors shadow-lg shadow-brand-accentGreen/20"
          >
            Réserver
          </button>
          <p className="text-center text-xs text-brand-textMuted mt-4">
            Vous ne serez débité qu'après confirmation du conducteur.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-brand-surface flex items-center justify-center border border-gray-700 shrink-0">
            <OpenRideIcon name="lock" className="text-brand-accentYellow" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white mb-1">Paiement 100% sécurisé</h4>
            <p className="text-xs text-brand-textMuted">Vos données sont protégées et cryptées.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TripDetailsBookingSidebar;
