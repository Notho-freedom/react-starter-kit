import { OpenRideIcon } from "@/openride/shared/icons";

const SetupProfileVisualPanel = () => (
<section id="setup-image" className="hidden lg:block lg:w-1/2 relative bg-brand-dark overflow-hidden">
    <img className="w-full h-full object-cover opacity-80 mix-blend-overlay" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/2906ac83e1-9bedeb52d84451979e6b.png" alt="modern abstract clean 3d rendering of user profile setup, floating UI elements, soft lighting, purple and deep blue tones" />
    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/50 to-transparent" />
    <div className="absolute bottom-0 left-0 w-full p-16 z-10">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 max-w-lg">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-full bg-brand-accent flex items-center justify-center">
            <OpenRideIcon name="shield-halved" className="text-white text-xl" />
          </div>
          <div>
            <h4 className="text-white font-semibold text-lg">Trust &amp; Safety First</h4>
            <p className="text-brand-purpleLight text-sm">Step 1 of Verification</p>
          </div>
        </div>
        <p className="text-gray-300 leading-relaxed mb-6">
          "Setting up a complete profile is the first step to building trust within the RideShare community. Users with complete profiles get 3x more ride matches."
        </p>
        <div className="flex items-center gap-3">
          <img className="w-10 h-10 rounded-full object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/6fa6fb3d0c-c9e232daea924651d6bf.png" alt="portrait of a confident female community manager, professional, smiling" />
          <div>
            <p className="text-white text-sm font-medium">Sarah Jenkins</p>
            <p className="text-gray-400 text-xs">Community Safety Lead</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default SetupProfileVisualPanel;
