import { OpenRideIcon } from "@/openride/shared/icons";

const RideResultsList = () => (
  <>
    <div className="w-full lg:w-5/12 xl:w-1/2 overflow-y-auto hide-scroll p-4 md:p-6 flex flex-col gap-4">
      <p className="text-sm text-gray-400 mb-2">24 rides available</p>
      {/* Result Card 1 */}
      <div className="glass-card rounded-2xl p-5 flex flex-col gap-4 cursor-pointer hover:border-brand-purple/50 border-brand-purple/30 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-1 h-full bg-brand-purple" />
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg" alt="Driver" className="w-12 h-12 rounded-full border-2 border-brand-purple/30" />
              <div className="absolute -bottom-1 -right-1 bg-brand-green text-brand-dark text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-brand-surface">4.9 <OpenRideIcon name="star" className="text-[8px]" /></div>
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">Marcus T.</h3>
              <p className="text-xs text-gray-400">Tesla Model 3 • White</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-white">€35</p>
            <p className="text-xs text-brand-green font-medium">2 seats left</p>
          </div>
        </div>
        <div className="bg-gray-800/30 rounded-xl p-4 mt-2 border border-gray-700/30">
          <div className="relative pl-6 py-1 border-l-2 border-dashed border-gray-600 ml-2 space-y-6">
            <div className="relative">
              <div className="absolute -left-[1.65rem] top-1 w-3 h-3 bg-brand-surface border-2 border-brand-purpleLight rounded-full" />
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-bold text-white">08:00 <span className="text-gray-400 font-normal ml-2">Paris</span></p>
                  <p className="text-xs text-gray-500 mt-1">Porte Maillot (Metro Line 1)</p>
                </div>
                <span className="text-xs text-gray-500">0.5 km away</span>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -left-[1.65rem] top-1 w-3 h-3 bg-brand-surface border-2 border-brand-accent rounded-full" />
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-bold text-white">12:30 <span className="text-gray-400 font-normal ml-2">Lyon</span></p>
                  <p className="text-xs text-gray-500 mt-1">Gare Part-Dieu</p>
                </div>
                <span className="text-xs text-gray-500">4h 30m</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between pt-2">
          <div className="flex gap-3 text-gray-400">
            <div className="flex items-center gap-1 bg-gray-800/50 px-2 py-1 rounded text-xs" title="Luggage allowed">
              <OpenRideIcon name="suitcase" /> <span className="hidden sm:inline">Medium</span>
            </div>
            <div className="flex items-center gap-1 bg-brand-accent/10 text-brand-accent px-2 py-1 rounded text-xs" title="Instant booking">
              <OpenRideIcon name="bolt" /> <span className="hidden sm:inline">Instant</span>
            </div>
            <div className="flex items-center gap-1 bg-gray-800/50 px-2 py-1 rounded text-xs" title="Quiet ride">
              <OpenRideIcon name="volume-xmark" /> <span className="hidden sm:inline">Quiet</span>
            </div>
          </div>
          <button
            type="button"
            data-openride-route="/trip-details"
            className="bg-brand-purple hover:bg-brand-purpleLight text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors shadow-lg shadow-brand-purple/20"
          >
            View Details
          </button>
        </div>
      </div>
      {/* Result Card 2 */}
      <div className="glass-card rounded-2xl p-5 flex flex-col gap-4 cursor-pointer hover:border-brand-purple/50">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-6.jpg" alt="Driver" className="w-12 h-12 rounded-full border-2 border-gray-600" />
              <div className="absolute -bottom-1 -right-1 bg-brand-green text-brand-dark text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-brand-surface">4.7 <OpenRideIcon name="star" className="text-[8px]" /></div>
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">Elena R.</h3>
              <p className="text-xs text-gray-400">Peugeot 3008 • Blue</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-white">€32</p>
            <p className="text-xs text-brand-accent font-medium">1 seat left</p>
          </div>
        </div>
        <div className="bg-gray-800/30 rounded-xl p-4 mt-2 border border-gray-700/30">
          <div className="relative pl-6 py-1 border-l-2 border-dashed border-gray-600 ml-2 space-y-6">
            <div className="relative">
              <div className="absolute -left-[1.65rem] top-1 w-3 h-3 bg-brand-surface border-2 border-gray-400 rounded-full" />
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-bold text-white">09:15 <span className="text-gray-400 font-normal ml-2">Paris</span></p>
                  <p className="text-xs text-gray-500 mt-1">Gare de Lyon</p>
                </div>
                <span className="text-xs text-gray-500">2.1 km away</span>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -left-[1.65rem] top-1 w-3 h-3 bg-brand-surface border-2 border-gray-400 rounded-full" />
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-bold text-white">14:00 <span className="text-gray-400 font-normal ml-2">Lyon</span></p>
                  <p className="text-xs text-gray-500 mt-1">Perrache</p>
                </div>
                <span className="text-xs text-gray-500">4h 45m</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between pt-2">
          <div className="flex gap-3 text-gray-400">
            <div className="flex items-center gap-1 bg-gray-800/50 px-2 py-1 rounded text-xs">
              <OpenRideIcon name="suitcase" /> <span className="hidden sm:inline">Small</span>
            </div>
            <div className="flex items-center gap-1 bg-gray-800/50 px-2 py-1 rounded text-xs">
              <OpenRideIcon name="paw" /> <span className="hidden sm:inline">Pets OK</span>
            </div>
          </div>
        </div>
      </div>
      {/* Result Card 3 */}
      <div className="glass-card rounded-2xl p-5 flex flex-col gap-4 cursor-pointer hover:border-brand-purple/50">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg" alt="Driver" className="w-12 h-12 rounded-full border-2 border-gray-600" />
              <div className="absolute -bottom-1 -right-1 bg-brand-green text-brand-dark text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-brand-surface">5.0 <OpenRideIcon name="star" className="text-[8px]" /></div>
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">David K.</h3>
              <p className="text-xs text-gray-400">Renault Clio • Black</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-white">€38</p>
            <p className="text-xs text-gray-400 font-medium">3 seats left</p>
          </div>
        </div>
        <div className="bg-gray-800/30 rounded-xl p-4 mt-2 border border-gray-700/30">
          <div className="relative pl-6 py-1 border-l-2 border-dashed border-gray-600 ml-2 space-y-6">
            <div className="relative">
              <div className="absolute -left-[1.65rem] top-1 w-3 h-3 bg-brand-surface border-2 border-gray-400 rounded-full" />
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-bold text-white">10:30 <span className="text-gray-400 font-normal ml-2">Paris</span></p>
                  <p className="text-xs text-gray-500 mt-1">Orly Airport</p>
                </div>
                <span className="text-xs text-gray-500">12 km away</span>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -left-[1.65rem] top-1 w-3 h-3 bg-brand-surface border-2 border-gray-400 rounded-full" />
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-bold text-white">15:00 <span className="text-gray-400 font-normal ml-2">Lyon</span></p>
                  <p className="text-xs text-gray-500 mt-1">Saint-Exupéry Airport</p>
                </div>
                <span className="text-xs text-gray-500">4h 30m</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default RideResultsList;
