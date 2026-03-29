import { OpenRideIcon } from "@/openride/shared/icons";

const AuthenticationHubFormsPanel = () => (
<section id="auth-forms" className="w-full lg:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col justify-center relative z-10 bg-brand-background/80 backdrop-blur-xl">
    {/* Mobile Logo (Hidden on Desktop) */}
    <div className="mb-10 lg:hidden flex justify-center">
      <a href="#" className="flex items-center gap-3 text-2xl font-serif font-semibold text-white tracking-tight">
        <div className="w-10 h-10 rounded-xl bg-brand-accent flex items-center justify-center shadow-lg shadow-brand-accent/30">
          <OpenRideIcon name="car-side" className="text-white text-lg" />
        </div>
        RideShare
      </a>
    </div>
    {/* Toggle Switch */}
    <div className="flex p-1 bg-white/5 rounded-xl mb-12 max-w-[240px] mx-auto lg:mx-0 border border-white/10">
      <button id="btn-login" className="flex-1 py-2 text-sm font-medium rounded-lg bg-white text-gray-900 transition-all duration-300 shadow-sm" data-openride-toggle="login">Log In</button>
      <button id="btn-signup" className="flex-1 py-2 text-sm font-medium rounded-lg text-gray-400 hover:text-white transition-all duration-300" data-openride-toggle="signup">Sign Up</button>
    </div>
    {/* Login View */}
    <div id="login-view" className="w-full max-w-md mx-auto lg:mx-0 transition-all duration-500">
      <h1 className="text-3xl sm:text-4xl font-semibold text-white mb-2">Welcome back</h1>
      <p className="text-gray-400 mb-8">Enter your details to access your account.</p>
      <form className="space-y-5" data-openride-auth-form="login">
        {/* Email Input */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-300">Email</label>
          <div className="relative input-field rounded-xl">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <OpenRideIcon name="envelope" className="text-gray-400" />
            </div>
            <input name="email" type="email" placeholder="john.doe@example.com" className="w-full pl-11 pr-4 py-3.5 rounded-xl focus:outline-none text-white bg-transparent placeholder-gray-500" required />
          </div>
        </div>
        {/* Password Input */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-gray-300">Password</label>
            <a href="#" className="text-xs text-brand-accent hover:text-white font-medium transition-colors">Forgot Password?</a>
          </div>
          <div className="relative input-field rounded-xl">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <OpenRideIcon name="lock" className="text-gray-400" />
            </div>
            <input name="password" type="password" placeholder="••••••••••••••••" className="w-full pl-11 pr-12 py-3.5 rounded-xl focus:outline-none text-white bg-transparent placeholder-gray-500" required />
            <button type="button" className="absolute right-4 top-3.5 text-gray-400 hover:text-white transition-colors">
              <OpenRideIcon name="eye-slash" />
            </button>
          </div>
        </div>
        {/* Submit Button */}
        <button type="button" data-openride-auth-submit="login" className="w-full bg-white hover:bg-gray-100 text-gray-900 font-semibold py-4 rounded-xl transition-all duration-300 mt-6 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] flex justify-center items-center gap-2 group">
          Sign In
          <OpenRideIcon name="arrow-right" className="group-hover:translate-x-1 transition-transform" />
        </button>
      </form>
      {/* Social Login */}
      <div className="mt-10">
        <div className="relative flex items-center py-5">
          <div className="flex-grow border-t border-white/10" />
          <span className="flex-shrink-0 mx-4 text-gray-500 text-sm">Or continue with</span>
          <div className="flex-grow border-t border-white/10" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <button className="flex justify-center items-center py-3 px-4 glass-panel rounded-xl hover:bg-white/10 transition-colors group">
            <OpenRideIcon name="google" className="text-white group-hover:scale-110 transition-transform" />
            <span className="ml-2 text-sm font-medium text-white">Google</span>
          </button>
          <button className="flex justify-center items-center py-3 px-4 glass-panel rounded-xl hover:bg-white/10 transition-colors group">
            <OpenRideIcon name="apple" className="text-white group-hover:scale-110 transition-transform" />
            <span className="ml-2 text-sm font-medium text-white">Apple</span>
          </button>
        </div>
      </div>
    </div>
    {/* Signup View (Hidden initially) */}
    <div id="signup-view" className="w-full max-w-md mx-auto lg:mx-0 transition-all duration-500 hidden">
      <h1 className="text-3xl sm:text-4xl font-semibold text-white mb-2">Create an account</h1>
      <p className="text-gray-400 mb-8">Join thousands of smart travelers today.</p>
      <form className="space-y-5" data-openride-auth-form="signup">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-300">First Name</label>
            <div className="relative input-field rounded-xl">
              <input name="firstName" type="text" placeholder="John" className="w-full px-4 py-3.5 rounded-xl focus:outline-none text-white bg-transparent placeholder-gray-500" required />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-300">Last Name</label>
            <div className="relative input-field rounded-xl">
              <input name="lastName" type="text" placeholder="Doe" className="w-full px-4 py-3.5 rounded-xl focus:outline-none text-white bg-transparent placeholder-gray-500" required />
            </div>
          </div>
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-300">Email</label>
          <div className="relative input-field rounded-xl">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <OpenRideIcon name="envelope" className="text-gray-400" />
            </div>
            <input name="email" type="email" placeholder="john.doe@example.com" className="w-full pl-11 pr-4 py-3.5 rounded-xl focus:outline-none text-white bg-transparent placeholder-gray-500" required />
          </div>
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-300">Password</label>
          <div className="relative input-field rounded-xl">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <OpenRideIcon name="lock" className="text-gray-400" />
            </div>
            <input name="password" type="password" placeholder="••••••••••••••••" className="w-full pl-11 pr-12 py-3.5 rounded-xl focus:outline-none text-white bg-transparent placeholder-gray-500" required />
            <button type="button" className="absolute right-4 top-3.5 text-gray-400 hover:text-white transition-colors">
              <OpenRideIcon name="eye-slash" />
            </button>
          </div>
          {/* Password Strength Indicator */}
          <div className="flex gap-1 mt-2">
            <div className="h-1 w-full bg-red-500 rounded-full" />
            <div className="h-1 w-full bg-yellow-500 rounded-full" />
            <div className="h-1 w-full bg-white/20 rounded-full" />
            <div className="h-1 w-full bg-white/20 rounded-full" />
          </div>
          <p className="text-xs text-gray-400 mt-1">Password strength: Fair</p>
        </div>
        <div className="flex items-start gap-3 text-sm mt-6">
          <input type="checkbox" className="mt-1 w-4 h-4 rounded border-gray-600 bg-transparent text-brand-accent focus:ring-brand-accent/50 focus:ring-offset-0 focus:ring-2 cursor-pointer" required />
          <span className="text-gray-400 leading-relaxed">I agree to the <a href="#" className="text-white hover:text-brand-accent transition-colors underline decoration-white/30">Terms of Service</a> and <a href="#" className="text-white hover:text-brand-accent transition-colors underline decoration-white/30">Privacy Policy</a></span>
        </div>
        <button type="button" data-openride-auth-submit="signup" className="w-full bg-brand-accent hover:bg-brand-purpleLight text-white font-semibold py-4 rounded-xl transition-all duration-300 mt-6 shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_25px_rgba(168,85,247,0.5)] flex justify-center items-center gap-2 group">
          Create Account
          <OpenRideIcon name="arrow-right" className="group-hover:translate-x-1 transition-transform" />
        </button>
      </form>
    </div>
  </section>
);

export default AuthenticationHubFormsPanel;
