import { OpenRideIcon } from "@/openride/shared/icons";

const PaymentBookingMainColumn = () => (
  <>
    <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-8">
        {/* Trip Summary Mini */}
        <section id="trip-summary" className="glass-card rounded-3xl p-6 md:p-8">
          <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-800">
            <h2 className="text-xl font-bold text-white">Résumé du trajet</h2>
            <a href="#" data-openride-route="/trip-details" className="text-brand-accentGreen text-sm hover:underline">Modifier</a>
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
                  <p className="text-white font-bold">Paris <span className="text-brand-textMuted text-sm font-normal ml-2">08:00</span></p>
                  <p className="text-sm text-brand-textMuted">Jeu 24 Oct</p>
                </div>
                <div>
                  <p className="text-white font-bold">Lyon <span className="text-brand-textMuted text-sm font-normal ml-2">12:30</span></p>
                  <p className="text-sm text-brand-textMuted">Jeu 24 Oct</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-brand-surface p-4 rounded-2xl border border-gray-700">
              <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg" alt="Driver" className="w-12 h-12 rounded-full border border-gray-600" />
              <div>
                <p className="text-sm text-brand-textMuted">Conducteur</p>
                <p className="text-white font-medium">Marcus T.</p>
              </div>
            </div>
          </div>
        </section>
        {/* Passenger Details */}
        <section id="passenger-details" className="glass-card rounded-3xl p-6 md:p-8">
          <h2 className="text-xl font-bold text-white mb-6">Détails des passagers</h2>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-brand-textMuted mb-2">Prénom</label>
                <input type="text" defaultValue="Devon" className="w-full input-field rounded-xl px-4 py-3" placeholder="Votre prénom" />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-textMuted mb-2">Nom</label>
                <input type="text" defaultValue="Lane" className="w-full input-field rounded-xl px-4 py-3" placeholder="Votre nom" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-brand-textMuted mb-2">Email</label>
                <input type="email" defaultValue="devon.lane@example.com" className="w-full input-field rounded-xl px-4 py-3" placeholder="Votre email" />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-textMuted mb-2">Téléphone</label>
                <input type="tel" defaultValue="+33 6 12 34 56 78" className="w-full input-field rounded-xl px-4 py-3" placeholder="Votre numéro" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-textMuted mb-2">Message au conducteur (Optionnel)</label>
              <textarea className="w-full input-field rounded-xl px-4 py-3 h-24 resize-none" placeholder="Bonjour Marcus, j'aurai un petit sac à dos avec moi..." defaultValue={""} />
            </div>
          </div>
        </section>
        {/* Payment Method */}
        <section id="payment-method" className="glass-card rounded-3xl p-6 md:p-8">
          <h2 className="text-xl font-bold text-white mb-6">Moyen de paiement</h2>
          <div className="space-y-4">
            {/* Credit Card Option */}
            <label className="flex items-start gap-4 p-4 rounded-2xl border border-brand-accentGreen bg-brand-surfaceLight cursor-pointer transition-colors relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-brand-accentGreen text-brand-dark text-[10px] font-bold px-3 py-1 rounded-bl-lg">RECOMMANDÉ</div>
              <input type="radio" name="payment" className="custom-radio mt-1" defaultChecked />
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-white font-medium">Carte Bancaire</span>
                  <div className="flex gap-2 text-xl">
                    <OpenRideIcon name="cc-visa" className="text-blue-400" />
                    <OpenRideIcon name="cc-mastercard" className="text-red-500" />
                  </div>
                </div>
                <p className="text-sm text-brand-textMuted mb-4">Paiement sécurisé par Stripe</p>
                {/* Card Form (Visible when selected) */}
                <div className="space-y-4 mt-4 pt-4 border-t border-gray-700">
                  <div>
                    <input type="text" className="w-full input-field rounded-xl px-4 py-3" placeholder="Numéro de carte" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" className="w-full input-field rounded-xl px-4 py-3" placeholder="MM/AA" />
                    <input type="text" className="w-full input-field rounded-xl px-4 py-3" placeholder="CVC" />
                  </div>
                  <input type="text" className="w-full input-field rounded-xl px-4 py-3" placeholder="Nom sur la carte" />
                </div>
              </div>
            </label>
            {/* Wallet Option */}
            <label className="flex items-center gap-4 p-4 rounded-2xl border border-gray-700 bg-brand-surface hover:bg-brand-surfaceLight cursor-pointer transition-colors">
              <input type="radio" name="payment" className="custom-radio" />
              <div className="flex-1 flex justify-between items-center">
                <div>
                  <span className="text-white font-medium block">Portefeuille RideShare</span>
                  <span className="text-sm text-brand-textMuted">Solde disponible: €12.50</span>
                </div>
                <OpenRideIcon name="wallet" className="text-brand-accentPurple text-xl" />
              </div>
            </label>
            {/* PayPal Option */}
            <label className="flex items-center gap-4 p-4 rounded-2xl border border-gray-700 bg-brand-surface hover:bg-brand-surfaceLight cursor-pointer transition-colors">
              <input type="radio" name="payment" className="custom-radio" />
              <div className="flex-1 flex justify-between items-center">
                <span className="text-white font-medium">PayPal</span>
                <OpenRideIcon name="paypal" className="text-blue-400 text-xl" />
              </div>
            </label>
          </div>
        </section>
      </div>
  </>
);

export default PaymentBookingMainColumn;
