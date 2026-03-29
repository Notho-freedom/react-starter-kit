import { OpenRideIcon } from "@/openride/shared/icons";

const AuthVisualPanel = () => (
<section id="auth-image" className="hidden lg:block lg:w-1/2 relative p-4 pl-0">
    <div className="w-full h-full rounded-[2rem] overflow-hidden relative shadow-inner">
      <img className="w-full h-full object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/db7ca256e6-b8b84b5238051d38ed56.png" alt="Beautiful cinematic wide shot of a modern car driving on a scenic coastal road at sunset, warm golden hour lighting, symbolizing travel and ridesharing, high quality, highly detailed" />
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent" />
      {/* Onboarding Teaser Content */}
      <div className="absolute bottom-0 left-0 w-full p-12 text-white">
        <div className="glass-panel p-8 rounded-2xl max-w-md backdrop-blur-md bg-white/10 border border-white/20">
          <div className="flex gap-2 mb-4">
            <span className="w-8 h-1.5 bg-accent rounded-full" />
            <span className="w-2 h-1.5 bg-white/40 rounded-full" />
            <span className="w-2 h-1.5 bg-white/40 rounded-full" />
          </div>
          <h2 className="text-3xl font-serif font-semibold mb-3">Share the Journey.</h2>
          <p className="text-gray-200 text-sm leading-relaxed mb-6">
            Connect with verified drivers and passengers heading your way. Save money, reduce your carbon footprint, and make new friends on the road.
          </p>
          {/* Mini Trust Badges */}
          <div className="flex gap-6 border-t border-white/20 pt-4">
            <div className="flex items-center gap-2">
              <OpenRideIcon name="shield-halved" className="text-accent" />
              <span className="text-xs font-medium">Verified Users</span>
            </div>
            <div className="flex items-center gap-2">
              <OpenRideIcon name="leaf" className="text-accent" />
              <span className="text-xs font-medium">Eco-Friendly</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default AuthVisualPanel;
