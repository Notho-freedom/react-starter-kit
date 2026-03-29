import { OpenRideIcon } from "@/openride/shared/icons";

const TrustCenterContentPanel = () => (
<section id="verification-content" className="w-full lg:w-[60%] p-8 sm:p-12 lg:p-16 flex flex-col relative z-10 overflow-y-auto hide-scroll">
    {/* Header */}
    <div className="mb-10 flex items-center justify-between">
      <a href="#" className="flex items-center gap-3 text-2xl font-serif font-semibold text-white tracking-tight">
        <div className="w-10 h-10 rounded-xl bg-brand-accent flex items-center justify-center shadow-lg shadow-brand-accent/30">
          <OpenRideIcon name="car-side" className="text-white text-lg" />
        </div>
        RideShare
      </a>
      <button className="text-gray-400 hover:text-white transition-colors">
        <OpenRideIcon name="xmark" className="text-xl" />
      </button>
    </div>
    <div className="max-w-2xl w-full mx-auto lg:mx-0 flex-1">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-semibold text-white mb-3">Trust Center</h1>
        <p className="text-gray-400 text-lg">Complete your verification to ensure a safe community for everyone.</p>
      </div>
      {/* Overall Progress */}
      <div className="glass-card rounded-2xl p-6 mb-8">
        <div className="flex justify-between items-end mb-4">
          <div>
            <h3 className="text-xl font-medium text-white mb-1">Verification Status</h3>
            <p className="text-sm text-gray-400">3 of 5 steps completed</p>
          </div>
          <span className="text-2xl font-bold text-brand-accent">60%</span>
        </div>
        <div className="w-full bg-gray-800 rounded-full h-2.5">
          <div className="bg-gradient-to-r from-brand-purple to-brand-accent h-2.5 rounded-full" style={{width: '60%'}} />
        </div>
      </div>
      {/* Verification Steps */}
      <div className="space-y-4 mb-10">
        {/* Phone Verification (Completed) */}
        <div className="glass-card rounded-2xl p-5 flex items-start gap-4 transition-all hover:bg-gray-800/50">
          <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-1">
            <OpenRideIcon name="check" className="text-green-400" />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start mb-1">
              <h4 className="text-lg font-medium text-white">Phone Number</h4>
              <span className="status-badge-success px-2.5 py-1 rounded-full text-xs font-medium">Verified</span>
            </div>
            <p className="text-sm text-gray-400 mb-2">+1 (555) 019-2834</p>
          </div>
        </div>
        {/* Email Verification (Completed) */}
        <div className="glass-card rounded-2xl p-5 flex items-start gap-4 transition-all hover:bg-gray-800/50">
          <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-1">
            <OpenRideIcon name="check" className="text-green-400" />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start mb-1">
              <h4 className="text-lg font-medium text-white">Email Address</h4>
              <span className="status-badge-success px-2.5 py-1 rounded-full text-xs font-medium">Verified</span>
            </div>
            <p className="text-sm text-gray-400 mb-2">alex.johnson@example.com</p>
          </div>
        </div>
        {/* Payment Method (Completed) */}
        <div className="glass-card rounded-2xl p-5 flex items-start gap-4 transition-all hover:bg-gray-800/50">
          <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-1">
            <OpenRideIcon name="check" className="text-green-400" />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start mb-1">
              <h4 className="text-lg font-medium text-white">Payment Method</h4>
              <span className="status-badge-success px-2.5 py-1 rounded-full text-xs font-medium">Ready</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <OpenRideIcon name="cc-mastercard" className="text-xl" />
              <span>•••• 4242</span>
            </div>
          </div>
        </div>
        {/* ID Verification (Pending) */}
        <div className="glass-card rounded-2xl p-5 flex items-start gap-4 border-brand-accent/30 bg-brand-accent/5">
          <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0 mt-1">
            <OpenRideIcon name="id-card" className="text-yellow-400" />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start mb-1">
              <h4 className="text-lg font-medium text-white">Government ID</h4>
              <span className="status-badge-pending px-2.5 py-1 rounded-full text-xs font-medium">Optional</span>
            </div>
            <p className="text-sm text-gray-400 mb-4">Verify your ID to get a trusted badge and more ride matches.</p>
            <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-lg transition-colors border border-white/10">
              Upload ID Document
            </button>
          </div>
        </div>
        {/* Safety Guidelines (Action Required) */}
        <div className="glass-card rounded-2xl p-5 flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center flex-shrink-0 mt-1">
            <OpenRideIcon name="shield-halved" className="text-gray-400" />
          </div>
          <div className="flex-1">
            <h4 className="text-lg font-medium text-white mb-2">Community Safety Guidelines</h4>
            <p className="text-sm text-gray-400 mb-4">Please review and accept our safety guidelines to continue.</p>
            <div className="space-y-3 mb-4">
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative flex-shrink-0 mt-0.5">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-5 h-5 bg-gray-800 border border-gray-600 rounded peer-checked:bg-brand-accent peer-checked:border-brand-accent flex items-center justify-center transition-colors">
                    <OpenRideIcon name="check" className="text-white text-xs opacity-0 peer-checked:opacity-100" />
                  </div>
                </div>
                <span className="text-sm text-gray-300 group-hover:text-white transition-colors">I agree to treat all community members with respect.</span>
              </label>
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative flex-shrink-0 mt-0.5">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-5 h-5 bg-gray-800 border border-gray-600 rounded peer-checked:bg-brand-accent peer-checked:border-brand-accent flex items-center justify-center transition-colors">
                    <OpenRideIcon name="check" className="text-white text-xs opacity-0 peer-checked:opacity-100" />
                  </div>
                </div>
                <span className="text-sm text-gray-300 group-hover:text-white transition-colors">I will follow all local traffic laws and safety regulations.</span>
              </label>
            </div>
          </div>
        </div>
      </div>
      {/* Footer Actions */}
      <div className="pt-6 border-t border-gray-800 mt-auto flex items-center justify-between gap-4 sticky bottom-0 bg-brand-surface py-4 z-20">
        <button type="button" className="px-6 py-3.5 text-gray-400 font-medium hover:text-white transition-colors">
          Back
        </button>
        <button type="button" className="flex-1 sm:flex-none bg-gradient-to-r from-brand-purple to-brand-accent hover:opacity-90 text-white font-semibold px-10 py-3.5 rounded-xl transition-all duration-300 shadow-lg shadow-brand-accent/20 flex justify-center items-center gap-2 group">
          Terminer
          <OpenRideIcon name="arrow-right" className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  </section>
);

export default TrustCenterContentPanel;
