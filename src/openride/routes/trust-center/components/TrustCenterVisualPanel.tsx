import { OpenRideIcon } from "@/openride/shared/icons";

const TrustCenterVisualPanel = () => (
<section id="trust-visuals" className="hidden lg:flex lg:w-[40%] relative bg-black overflow-hidden flex-col justify-center p-12 border-l border-gray-800">
    {/* Background Elements */}
    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-purple/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />
    <div className="relative z-10 w-full max-w-md mx-auto">
      {/* Decorative Shield UI */}
      <div className="relative mb-12 flex justify-center">
        <div className="w-48 h-48 rounded-full border border-gray-800 flex items-center justify-center relative">
          <div className="w-32 h-32 rounded-full border border-gray-700 flex items-center justify-center absolute animate-[spin_10s_linear_infinite]" />
          <div className="w-40 h-40 rounded-full border border-brand-accent/30 flex items-center justify-center absolute animate-[spin_15s_linear_infinite_reverse]" />
          <div className="w-24 h-24 bg-gradient-to-br from-brand-purple to-brand-accent rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(168,85,247,0.4)] z-10">
            <OpenRideIcon name="shield-check" className="text-4xl text-white" />
          </div>
        </div>
      </div>
      {/* Info Cards Stack */}
      <div className="space-y-4">
        <div className="glass-card rounded-2xl p-6 transform transition-transform hover:-translate-y-1">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
              <OpenRideIcon name="users" className="text-blue-400" />
            </div>
            <h4 className="text-white font-medium text-lg">Trusted Community</h4>
          </div>
          <p className="text-gray-400 text-sm">Join over 2 million verified users who share rides daily with complete peace of mind.</p>
        </div>
        <div className="glass-card rounded-2xl p-6 transform transition-transform hover:-translate-y-1">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
              <OpenRideIcon name="lock" className="text-green-400" />
            </div>
            <h4 className="text-white font-medium text-lg">Secure Data</h4>
          </div>
          <p className="text-gray-400 text-sm">Your personal information and documents are encrypted and stored securely.</p>
        </div>
      </div>
    </div>
  </section>
);

export default TrustCenterVisualPanel;
