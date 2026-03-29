import { OpenRideIcon } from "@/openride/shared/icons";

const AuthFormsPanel = () => (
<section id="auth-forms" className="w-full lg:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col justify-center relative z-10">
    {/* Logo */}
    <div className="mb-10 lg:mb-16">
      <a href="#" className="flex items-center gap-2 text-2xl font-serif font-semibold text-gray-900 tracking-tight">
        <OpenRideIcon name="car-side" className="text-brand-accent" />
        RideShare
      </a>
    </div>
    {/* Login View (Default) */}
    <div id="login-view" className="w-full max-w-md mx-auto transition-all duration-500">
      <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-2">Login</h1>
      <p className="text-gray-500 mb-8">Login to access your rideshare account</p>
      <form className="space-y-5" data-openride-auth-form="login">
        {/* Email Input */}
        <div className="relative input-field border border-gray-200 rounded-lg bg-white">
          <label className="absolute -top-2.5 left-3 bg-white px-1 text-xs font-medium text-gray-500">Email</label>
          <input name="email" type="email" placeholder="john.doe@gmail.com" className="w-full px-4 py-3.5 rounded-lg focus:outline-none text-gray-700 bg-transparent" required />
        </div>
        {/* Password Input */}
        <div className="relative input-field border border-gray-200 rounded-lg bg-white">
          <label className="absolute -top-2.5 left-3 bg-white px-1 text-xs font-medium text-gray-500">Password</label>
          <input name="password" type="password" placeholder="••••••••••••••••" className="w-full px-4 py-3.5 rounded-lg focus:outline-none text-gray-700 bg-transparent" required />
          <button type="button" className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600">
            <OpenRideIcon name="eye-slash" />
          </button>
        </div>
        {/* Options */}
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-brand-accent focus:ring-brand-accent/20" />
            <span className="text-gray-600 group-hover:text-gray-900 transition-colors">Remember me</span>
          </label>
          <a href="#" className="text-brand-accent hover:opacity-80 font-medium transition-colors">Forgot Password?</a>
        </div>
        {/* Submit Button */}
        <button type="button" data-openride-auth-submit="login" className="w-full bg-brand-accent hover:opacity-90 text-white font-medium py-3.5 rounded-lg transition-colors mt-6 shadow-lg shadow-brand-accent/20">
          Login
        </button>
      </form>
      <p className="text-center text-sm text-gray-600 mt-6">
        Don't have an account? <a href="#" className="text-brand-accent font-medium hover:underline" data-openride-toggle="signup">Sign up</a>
      </p>
      {/* Social Login */}
      <div className="mt-8">
        <div className="relative flex items-center py-5">
          <div className="flex-grow border-t border-gray-200" />
          <span className="flex-shrink-0 mx-4 text-gray-400 text-sm">Or login with</span>
          <div className="flex-grow border-t border-gray-200" />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <button className="flex justify-center items-center py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <OpenRideIcon name="facebook" className="text-[#1877F2] text-xl" />
          </button>
          <button className="flex justify-center items-center py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <OpenRideIcon name="google" className="text-red-500 text-xl" />
          </button>
          <button className="flex justify-center items-center py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <OpenRideIcon name="apple" className="text-gray-900 text-xl" />
          </button>
        </div>
      </div>
    </div>
    {/* Signup View (Hidden initially) */}
    <div id="signup-view" className="w-full max-w-md mx-auto hidden transition-all duration-500">
      <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-2">Sign up</h1>
      <p className="text-gray-500 mb-8">Let's get you all set up so you can access your personal account.</p>
      <form className="space-y-5" data-openride-auth-form="signup">
        <div className="grid grid-cols-2 gap-4">
          <div className="relative input-field border border-gray-200 rounded-lg bg-white">
            <label className="absolute -top-2.5 left-3 bg-white px-1 text-xs font-medium text-gray-500">First Name</label>
            <input name="firstName" type="text" placeholder="John" className="w-full px-4 py-3.5 rounded-lg focus:outline-none text-gray-700 bg-transparent" required />
          </div>
          <div className="relative input-field border border-gray-200 rounded-lg bg-white">
            <label className="absolute -top-2.5 left-3 bg-white px-1 text-xs font-medium text-gray-500">Last Name</label>
            <input name="lastName" type="text" placeholder="Doe" className="w-full px-4 py-3.5 rounded-lg focus:outline-none text-gray-700 bg-transparent" required />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="relative input-field border border-gray-200 rounded-lg bg-white">
            <label className="absolute -top-2.5 left-3 bg-white px-1 text-xs font-medium text-gray-500">Email</label>
            <input name="email" type="email" placeholder="john.doe@gmail.com" className="w-full px-4 py-3.5 rounded-lg focus:outline-none text-gray-700 bg-transparent" required />
          </div>
          <div className="relative input-field border border-gray-200 rounded-lg bg-white">
            <label className="absolute -top-2.5 left-3 bg-white px-1 text-xs font-medium text-gray-500">Phone Number</label>
            <input name="phone" type="tel" placeholder="+1 (555) 000-0000" className="w-full px-4 py-3.5 rounded-lg focus:outline-none text-gray-700 bg-transparent" required />
          </div>
        </div>
        <div className="relative input-field border border-gray-200 rounded-lg bg-white">
          <label className="absolute -top-2.5 left-3 bg-white px-1 text-xs font-medium text-gray-500">Password</label>
          <input name="password" type="password" placeholder="••••••••••••••••" className="w-full px-4 py-3.5 rounded-lg focus:outline-none text-gray-700 bg-transparent" required />
          <button type="button" className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600">
            <OpenRideIcon name="eye-slash" />
          </button>
        </div>
        <div className="relative input-field border border-gray-200 rounded-lg bg-white">
          <label className="absolute -top-2.5 left-3 bg-white px-1 text-xs font-medium text-gray-500">Confirm Password</label>
          <input name="passwordConfirmation" type="password" placeholder="••••••••••••••••" className="w-full px-4 py-3.5 rounded-lg focus:outline-none text-gray-700 bg-transparent" required />
          <button type="button" className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600">
            <OpenRideIcon name="eye-slash" />
          </button>
        </div>
        <div className="flex items-start gap-2 text-sm mt-4">
          <input type="checkbox" className="mt-1 w-4 h-4 rounded border-gray-300 text-brand-accent focus:ring-brand-accent/20" required />
          <span className="text-gray-600">I agree to all the <a href="#" className="text-brand-accent hover:underline">Terms</a> and <a href="#" className="text-brand-accent hover:underline">Privacy Policies</a></span>
        </div>
        <button type="button" data-openride-auth-submit="signup" className="w-full bg-brand-accent hover:opacity-90 text-white font-medium py-3.5 rounded-lg transition-colors mt-6 shadow-lg shadow-brand-accent/20">
          Create account
        </button>
      </form>
      <p className="text-center text-sm text-gray-600 mt-6">
        Already have an account? <a href="#" className="text-brand-accent font-medium hover:underline" data-openride-toggle="login">Login</a>
      </p>
      {/* Social Signup */}
      <div className="mt-6">
        <div className="relative flex items-center py-4">
          <div className="flex-grow border-t border-gray-200" />
          <span className="flex-shrink-0 mx-4 text-gray-400 text-sm">Or Sign up with</span>
          <div className="flex-grow border-t border-gray-200" />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <button className="flex justify-center items-center py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <OpenRideIcon name="facebook" className="text-[#1877F2] text-lg" />
          </button>
          <button className="flex justify-center items-center py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <OpenRideIcon name="google" className="text-red-500 text-lg" />
          </button>
          <button className="flex justify-center items-center py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <OpenRideIcon name="apple" className="text-gray-900 text-lg" />
          </button>
        </div>
      </div>
    </div>
  </section>
);

export default AuthFormsPanel;
