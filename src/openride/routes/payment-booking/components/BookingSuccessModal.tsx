type BookingSuccessModalProps = {
  isOpen: boolean;
};

const BookingSuccessModal = ({ isOpen }: BookingSuccessModalProps) => (
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
        Votre place pour le trajet Paris → Lyon a été réservée avec succès. Le reçu a été envoyé à votre email.
      </p>

      <div className="mb-8 w-full rounded-2xl border border-gray-700 bg-brand-surface p-4 text-left">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm text-brand-textMuted">Numéro de réservation</span>
          <span className="font-mono text-sm text-white">#RS-894831</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-brand-textMuted">Montant payé</span>
          <span className="text-sm font-bold text-brand-accentGreen">€39.20</span>
        </div>
      </div>

      <div className="flex w-full flex-col gap-3">
        <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-600 bg-brand-surface py-3 font-medium text-white transition-colors hover:bg-gray-700" type="button">
          Envoyer un message à Marcus
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

export default BookingSuccessModal;
