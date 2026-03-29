import { OpenRideIcon } from "@/openride/shared/icons";

type PriceBreakdownSidebarProps = {
  isProcessing?: boolean;
};

const PriceBreakdownSidebar = ({ isProcessing = false }: PriceBreakdownSidebarProps) => (
  <>
    <div className="lg:col-span-5 xl:col-span-4">
      <div className="sticky top-6 flex flex-col gap-6">
          {/* Price Breakdown Card */}
          <div className="bg-brand-surfaceLight rounded-3xl p-6 md:p-8 border border-gray-700 shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-6">Détail du prix</h3>
            {/* Places Selector */}
            <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-800">
              <span className="text-brand-textMuted">Nombre de places</span>
              <div className="flex items-center gap-4 bg-brand-surface rounded-xl p-1 border border-gray-700">
                <button className="w-8 h-8 rounded-lg flex items-center justify-center text-brand-textMuted hover:text-white hover:bg-gray-700 transition-colors">
                  <OpenRideIcon name="minus" />
                </button>
                <span className="text-white font-medium w-4 text-center">1</span>
                <button className="w-8 h-8 rounded-lg flex items-center justify-center text-brand-textMuted hover:text-white hover:bg-gray-700 transition-colors">
                  <OpenRideIcon name="plus" />
                </button>
              </div>
            </div>
            {/* Calculations */}
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-brand-textMuted">Prix par place (1x)</span>
                <span className="text-white font-medium">€35.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-brand-textMuted">Frais de service RideShare</span>
                <span className="text-white font-medium">€3.50</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-brand-textMuted">Taxes (TVA)</span>
                <span className="text-white font-medium">€0.70</span>
              </div>
            </div>
            {/* Promo Code */}
            <div className="mb-6">
              <div className="flex gap-2">
                <input type="text" className="flex-1 input-field rounded-xl px-4 py-2 text-sm" placeholder="Code promo" />
                <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors">
                  Appliquer
                </button>
              </div>
            </div>
            {/* Total */}
            <div className="pt-6 border-t border-gray-700 mb-8">
              <div className="flex justify-between items-end mb-2">
                <span className="text-white font-bold text-lg">Total à payer</span>
                <span className="text-3xl font-bold text-brand-accentGreen">€39.20</span>
              </div>
              <p className="text-xs text-brand-textMuted text-right">En EUR, taxes incluses</p>
            </div>
            {/* Terms Checkbox */}
            <label className="flex items-start gap-3 mb-6 cursor-pointer">
              <input type="checkbox" className="mt-1 w-4 h-4 rounded border-gray-600 text-brand-accentGreen focus:ring-brand-accentGreen bg-brand-surface" />
              <span className="text-xs text-brand-textMuted leading-tight">
                J'accepte les <a href="#" className="text-brand-accentGreen hover:underline">Conditions Générales</a>, la <a href="#" className="text-brand-accentGreen hover:underline">Politique de Confidentialité</a> et les conditions d'annulation du conducteur.
              </span>
            </label>
            <button
              id="confirm-btn"
              type="button"
              className="w-full bg-brand-accentGreen hover:bg-[#8be08b] text-brand-dark text-lg font-bold py-4 rounded-xl transition-colors shadow-lg shadow-brand-accentGreen/20 flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-80"
              disabled={isProcessing}
            >
              <OpenRideIcon name="lock" className="text-sm" />
              {isProcessing ? "Traitement..." : "Payer et Réserver"}
            </button>
            <p className="text-center text-xs text-brand-textMuted mt-4 flex items-center justify-center gap-2">
              <OpenRideIcon name="shield-halved" className="text-brand-accentGreen" />
              Paiement crypté SSL 256-bit
            </p>
          </div>
          {/* Cancellation Policy Mini */}
          <div className="glass-card rounded-2xl p-5 border-l-4 border-l-brand-accentYellow">
            <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
              <OpenRideIcon name="clock-rotate-left" className="text-brand-accentYellow" />
              Annulation gratuite
            </h4>
            <p className="text-xs text-brand-textMuted">
              Annulez avant le 23 Oct à 08:00 pour un remboursement intégral.
            </p>
          </div>
      </div>
    </div>
  </>
);

export default PriceBreakdownSidebar;
