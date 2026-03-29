import { OpenRideIcon } from "@/openride/shared/icons";

const TripDetailsFooter = () => (
  <>
    <footer id="footer" className="max-w-7xl mx-auto mt-16 pt-8 border-t border-gray-800 pb-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-brand-accentGreen flex items-center justify-center">
            <OpenRideIcon name="car-side" className="text-brand-dark text-xs" />
          </div>
          <span className="text-lg font-serif font-semibold text-white">RideShare</span>
        </div>
        <div className="flex gap-6 text-sm text-brand-textMuted">
          <a href="#" className="hover:text-white transition-colors">Conditions</a>
          <a href="#" className="hover:text-white transition-colors">Confidentialité</a>
          <a href="#" className="hover:text-white transition-colors">Aide</a>
        </div>
      </div>
    </footer>
  </>
);

export default TripDetailsFooter;
