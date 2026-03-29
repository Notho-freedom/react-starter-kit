import { OpenRideIcon } from "@/openride/shared/icons";

const MapPanel = () => (
  <>
    <div className="hidden lg:block w-7/12 xl:w-1/2 relative h-full border-l border-gray-800/50">
      {/* Map Background */}
      <div className="absolute inset-0 bg-[#0B0F19] z-0">
        <img className="w-full h-full object-cover opacity-70 mix-blend-screen" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/75df874086-dabfd9157546c19857ca.png" alt="detailed dark mode map showing routes and pins" />
      </div>
      {/* Map Controls */}
      <div className="absolute top-6 right-6 z-10 flex flex-col gap-2">
        <button className="w-10 h-10 glass-card rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors shadow-lg shadow-black/50">
          <OpenRideIcon name="plus" className="text-white" />
        </button>
        <button className="w-10 h-10 glass-card rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors shadow-lg shadow-black/50">
          <OpenRideIcon name="minus" className="text-white" />
        </button>
        <button className="w-10 h-10 glass-card rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors shadow-lg shadow-black/50 mt-4">
          <OpenRideIcon name="location-crosshairs" className="text-brand-purpleLight" />
        </button>
      </div>
      {/* Map Markers (Simulated) */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {/* Marker 1 (Active) */}
        <div className="absolute top-[30%] left-[40%] flex flex-col items-center pointer-events-auto cursor-pointer group">
          <div className="bg-brand-surfaceLight px-3 py-1 rounded-full text-xs font-bold text-white mb-1 shadow-lg border border-brand-purple opacity-100 transition-opacity">€35</div>
          <div className="map-marker active">
            <OpenRideIcon name="car" className="text-xs" />
          </div>
        </div>
        {/* Marker 2 */}
        <div className="absolute top-[45%] left-[25%] flex flex-col items-center pointer-events-auto cursor-pointer group">
          <div className="bg-brand-surfaceLight px-3 py-1 rounded-full text-xs font-bold text-white mb-1 shadow-lg border border-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">€32</div>
          <div className="map-marker">
            <OpenRideIcon name="car" className="text-xs" />
          </div>
        </div>
        {/* Marker 3 */}
        <div className="absolute top-[20%] left-[60%] flex flex-col items-center pointer-events-auto cursor-pointer group">
          <div className="bg-brand-surfaceLight px-3 py-1 rounded-full text-xs font-bold text-white mb-1 shadow-lg border border-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">€38</div>
          <div className="map-marker">
            <OpenRideIcon name="car" className="text-xs" />
          </div>
        </div>
        {/* Route Line (Simulated SVG) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{zIndex: -1}}>
          <path d="M 300 250 Q 400 350 500 500" fill="none" stroke="#8B5CF6" strokeWidth={3} strokeDasharray="5,5" className="opacity-50" />
        </svg>
      </div>
      {/* Floating Info Card (Selected Ride) */}
      <div className="absolute bottom-6 left-6 right-6 z-20 pointer-events-none">
        <div className="glass-card rounded-2xl p-4 pointer-events-auto shadow-2xl border-brand-purple/50 flex gap-4 items-center">
          <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg" alt="Driver" className="w-14 h-14 rounded-xl border border-brand-purple/30 object-cover" />
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-white font-bold">Marcus T.</h4>
                <p className="text-xs text-gray-400">08:00 Paris → 12:30 Lyon</p>
              </div>
              <span className="text-lg font-bold text-white">€35</span>
            </div>
            <div className="flex gap-2 mt-2">
              <span className="text-[10px] bg-brand-green/20 text-brand-green px-2 py-0.5 rounded border border-brand-green/30">2 seats</span>
              <span className="text-[10px] bg-brand-accent/20 text-brand-accent px-2 py-0.5 rounded border border-brand-accent/30">Instant Book</span>
            </div>
          </div>
          <button className="bg-brand-purple hover:bg-brand-purpleLight text-white w-10 h-10 rounded-xl flex items-center justify-center transition-colors">
            <OpenRideIcon name="chevron-right" />
          </button>
        </div>
      </div>
    </div>
  </>
);

export default MapPanel;
