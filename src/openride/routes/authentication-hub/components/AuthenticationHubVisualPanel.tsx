import { OpenRideIcon } from "@/openride/shared/icons";

const AuthenticationHubVisualPanel = () => (
<section id="auth-image" className="hidden lg:flex lg:w-1/2 relative p-8 flex-col justify-between border-r border-white/10">
    {/* Logo */}
    <div className="mb-10 lg:mb-16 z-10">
      <a href="#" className="flex items-center gap-3 text-2xl font-serif font-semibold text-white tracking-tight">
        <div className="w-10 h-10 rounded-xl bg-brand-accent flex items-center justify-center shadow-lg shadow-brand-accent/30">
          <OpenRideIcon name="car-side" className="text-white text-lg" />
        </div>
        RideShare
      </a>
    </div>
    {/* 3D Illustration Area */}
    <div className="flex-grow flex items-center justify-center relative z-10">
      <div className="w-full max-w-md aspect-square relative">
        <img className="w-full h-full object-contain drop-shadow-2xl" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/b8d2dd9035-5bc1622b5637481fb4ac.png" alt="3d illustration of abstract futuristic transportation elements, floating spheres, glowing paths, purple and blue neon colors, high quality, clean background" />
      </div>
    </div>
    {/* Onboarding Content */}
    <div className="z-10 mt-8">
      <h2 className="text-4xl font-serif font-semibold mb-4 text-white">Master Your Journey</h2>
      <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-md">
        All-in-one platform to find rides, share costs, and travel smarter with verified drivers.
      </p>
      {/* Progress Dots */}
      <div className="flex gap-2">
        <span className="w-8 h-1.5 bg-brand-accent rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
        <span className="w-2 h-1.5 bg-white/20 rounded-full" />
        <span className="w-2 h-1.5 bg-white/20 rounded-full" />
        <span className="w-2 h-1.5 bg-white/20 rounded-full" />
      </div>
    </div>
    {/* Background Decorative Elements */}
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none rounded-l-[2rem]">
      <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-brand-purpleLight rounded-full mix-blend-screen filter blur-[100px] opacity-20" />
      <div className="absolute bottom-[10%] -right-[10%] w-[60%] h-[60%] bg-blue-500 rounded-full mix-blend-screen filter blur-[120px] opacity-10" />
    </div>
  </section>
);

export default AuthenticationHubVisualPanel;
