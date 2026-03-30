import { OpenRideIcon } from "@/openride/shared/icons";
import { useOpenRideWorkflow } from "@/openride/shared/workflows";

function PaymentBookingMainColumn() {
  const workflow = useOpenRideWorkflow();
  const ride = workflow.selectedRide ?? workflow.searchRides[0];

  if (!ride) {
    return null;
  }

  return (
    <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-8">
      <section id="trip-summary" className="glass-card rounded-3xl p-6 md:p-8">
        <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-800">
          <h2 className="text-xl font-bold text-white">Résumé du trajet</h2>
          <a href="#" data-openride-route="/trip-details" className="text-brand-accentGreen text-sm hover:underline">
            Modifier
          </a>
        </div>
        <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 rounded-full bg-brand-accentGreen" />
              <div className="w-0.5 h-8 bg-gray-700 my-1" />
              <div className="w-3 h-3 rounded-full border-2 border-brand-accentYellow" />
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-white font-bold">
                  {ride.originCity}
                  <span className="text-brand-textMuted text-sm font-normal ml-2">{ride.departureTime}</span>
                </p>
                <p className="text-sm text-brand-textMuted">{ride.departureDateLabel}</p>
              </div>
              <div>
                <p className="text-white font-bold">
                  {ride.arrivalLocation}
                  <span className="text-brand-textMuted text-sm font-normal ml-2">{ride.arrivalTime}</span>
                </p>
                <p className="text-sm text-brand-textMuted">{ride.arrivalDateLabel}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-brand-surface p-4 rounded-2xl border border-gray-700">
            <img src={ride.driver.avatar} alt={ride.driver.name} className="w-12 h-12 rounded-full border border-gray-600" />
            <div>
              <p className="text-sm text-brand-textMuted">Conducteur</p>
              <p className="text-white font-medium">{ride.driver.name}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="passenger-details" className="glass-card rounded-3xl p-6 md:p-8">
        <h2 className="text-xl font-bold text-white mb-6">Détails des passagers</h2>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-brand-textMuted mb-2">Prénom</label>
              <input
                name="firstName"
                type="text"
                defaultValue={workflow.bookingDraft.firstName || workflow.user?.firstName || ""}
                className="w-full input-field rounded-xl px-4 py-3"
                placeholder="Votre prénom"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-textMuted mb-2">Nom</label>
              <input
                name="lastName"
                type="text"
                defaultValue={workflow.bookingDraft.lastName || workflow.user?.lastName || ""}
                className="w-full input-field rounded-xl px-4 py-3"
                placeholder="Votre nom"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-brand-textMuted mb-2">Email</label>
              <input
                name="email"
                type="email"
                defaultValue={workflow.bookingDraft.email || workflow.user?.email || ""}
                className="w-full input-field rounded-xl px-4 py-3"
                placeholder="Votre email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-textMuted mb-2">Téléphone</label>
              <input
                name="phone"
                type="tel"
                defaultValue={workflow.bookingDraft.phone || workflow.user?.phone || ""}
                className="w-full input-field rounded-xl px-4 py-3"
                placeholder="Votre numéro"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-textMuted mb-2">Message au conducteur (Optionnel)</label>
            <textarea
              name="message"
              className="w-full input-field rounded-xl px-4 py-3 h-24 resize-none"
              placeholder={`Bonjour ${ride.driver.shortName}, j'aurai un petit sac à dos avec moi...`}
              defaultValue={workflow.bookingDraft.message}
            />
          </div>
        </div>
      </section>

      <section id="payment-method" className="glass-card rounded-3xl p-6 md:p-8">
        <h2 className="text-xl font-bold text-white mb-6">Moyen de paiement</h2>
        <div className="space-y-4">
          <label
            className="flex items-start gap-4 p-4 rounded-2xl border border-brand-accentGreen bg-brand-surfaceLight cursor-pointer transition-colors relative overflow-hidden"
            data-openride-payment-option="card"
          >
            <div className="absolute top-0 right-0 bg-brand-accentGreen text-brand-dark text-[10px] font-bold px-3 py-1 rounded-bl-lg">RECOMMANDÉ</div>
            <input type="radio" name="payment" value="card" className="custom-radio mt-1" defaultChecked />
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <span className="text-white font-medium">Carte Bancaire</span>
                <div className="flex gap-2 text-xl">
                  <OpenRideIcon name="cc-visa" className="text-blue-400" />
                  <OpenRideIcon name="cc-mastercard" className="text-red-500" />
                </div>
              </div>
              <p className="text-sm text-brand-textMuted mb-4">Paiement sécurisé par Stripe</p>
              <div className="space-y-4 mt-4 pt-4 border-t border-gray-700">
                <div>
                  <input name="cardNumber" type="text" className="w-full input-field rounded-xl px-4 py-3" placeholder="Numéro de carte" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input name="cardExpiry" type="text" className="w-full input-field rounded-xl px-4 py-3" placeholder="MM/AA" />
                  <input name="cardCvc" type="text" className="w-full input-field rounded-xl px-4 py-3" placeholder="CVC" />
                </div>
                <input name="cardName" type="text" className="w-full input-field rounded-xl px-4 py-3" placeholder="Nom sur la carte" />
              </div>
            </div>
          </label>

          <label
            className="flex items-center gap-4 p-4 rounded-2xl border border-gray-700 bg-brand-surface hover:bg-brand-surfaceLight cursor-pointer transition-colors"
            data-openride-payment-option="wallet"
          >
            <input type="radio" name="payment" value="wallet" className="custom-radio" />
            <div className="flex-1 flex justify-between items-center">
              <div>
                <span className="text-white font-medium block">Portefeuille RideShare</span>
                <span className="text-sm text-brand-textMuted">Solde disponible: CA$12.50</span>
              </div>
              <OpenRideIcon name="wallet" className="text-brand-accentPurple text-xl" />
            </div>
          </label>

          <label
            className="flex items-center gap-4 p-4 rounded-2xl border border-gray-700 bg-brand-surface hover:bg-brand-surfaceLight cursor-pointer transition-colors"
            data-openride-payment-option="paypal"
          >
            <input type="radio" name="payment" value="paypal" className="custom-radio" />
            <div className="flex-1 flex justify-between items-center">
              <span className="text-white font-medium">PayPal</span>
              <OpenRideIcon name="paypal" className="text-blue-400 text-xl" />
            </div>
          </label>

          <label
            className="flex items-center gap-4 p-4 rounded-2xl border border-gray-700 bg-brand-surface hover:bg-brand-surfaceLight cursor-pointer transition-colors"
            data-openride-payment-option="cash"
          >
            <input type="radio" name="payment" value="cash" className="custom-radio" />
            <div className="flex-1 flex justify-between items-center">
              <div>
                <span className="text-white font-medium block">Cash</span>
                <span className="text-sm text-brand-textMuted">Payez directement au conducteur à bord</span>
              </div>
              <OpenRideIcon name="wallet" className="text-brand-accentGreen text-xl" />
            </div>
          </label>
        </div>
      </section>
    </div>
  );
}

export default PaymentBookingMainColumn;
