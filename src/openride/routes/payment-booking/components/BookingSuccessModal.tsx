import { type PaymentMethodId, useOpenRideWorkflow } from "@/openride/shared/workflows";

type BookingSuccessModalProps = {
  isOpen: boolean;
  paymentMethod?: PaymentMethodId;
};

function BookingSuccessModal({ isOpen, paymentMethod }: BookingSuccessModalProps) {
  const workflow = useOpenRideWorkflow();
  const ride = workflow.selectedRide ?? workflow.searchRides[0];
  const driverName = ride?.driver.shortName ?? "Marcus";
  const seatCount = Math.max(workflow.bookingDraft.seatCount, 1);
  const total =
    ride
      ? ride.price * seatCount + ride.serviceFee + ride.taxes
      : workflow.passengerTrips[0]?.price ?? 39.2;
  const resolvedPaymentMethod = paymentMethod ?? workflow.bookingDraft.paymentMethod;
  const bookingLabel =
    resolvedPaymentMethod === "cash"
      ? "paiement en cash au départ"
      : "reçu a été envoyé à votre email";
  const amountLabel = resolvedPaymentMethod === "cash" ? "Montant à payer" : "Montant payé";

  return (
    <div
      id="success-modal"
      className={
        isOpen
          ? "fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          : "fixed inset-0 z-[100] hidden items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      }
    >
      <div className="modal-animate relative m-4 flex w-full max-w-md flex-col items-center rounded-3xl border border-gray-700 bg-brand-surfaceLight p-8 text-center shadow-2xl">
        <div className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-brand-accentGreen/20">
          <div
            className="absolute inset-0 animate-spin rounded-full border-4 border-brand-accentGreen border-t-transparent"
            style={{ animationDuration: "3s" }}
          />
          <div className="text-4xl text-brand-accentGreen">✓</div>
        </div>

        <h2 className="mb-2 text-2xl font-bold text-white">Réservation Confirmée !</h2>
        <p className="mb-8 text-brand-textMuted">
          Votre place pour le trajet {ride?.routeLabel ?? workflow.passengerTrips[0]?.routeLabel ?? "Montréal → Ottawa"} a été réservée avec succès. Le {bookingLabel}.
        </p>

        <div className="mb-8 w-full rounded-2xl border border-gray-700 bg-brand-surface p-4 text-left">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm text-brand-textMuted">Numéro de réservation</span>
            <span className="font-mono text-sm text-white">#{workflow.bookingDraft.rideId ?? workflow.passengerTrips[0]?.id ?? "RS-894831"}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-brand-textMuted">{amountLabel}</span>
            <span className="text-sm font-bold text-brand-accentGreen">
              CA${total.toFixed(2)}
            </span>
          </div>
        </div>

        <div className="flex w-full flex-col gap-3">
          <button
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-600 bg-brand-surface py-3 font-medium text-white transition-colors hover:bg-gray-700"
            data-openride-booking-action="message"
            type="button"
          >
            Envoyer un message à {driverName}
          </button>
          <button
            className="w-full rounded-xl bg-brand-accentGreen py-3 font-bold text-brand-dark transition-colors hover:bg-[#8be08b]"
            data-openride-route="/my-trips"
            type="button"
          >
            Voir dans Mes Trajets
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookingSuccessModal;
