import { OpenRideIcon } from "@/openride/shared/icons";

const ProfileSettingsHeader = () => (
<header id="top-header" className="h-20 glass-panel border-b border-white/5 flex items-center justify-between px-6 lg:px-10 z-40 shrink-0">
    <div className="flex flex-col">
      <h1 className="text-xl md:text-2xl font-semibold text-white">Profil &amp; Paramètres</h1>
      <p className="text-xs text-gray-400">Gérez vos informations personnelles et préférences</p>
    </div>
    <div className="flex items-center gap-4">
      <div className="relative hidden md:block">
        <OpenRideIcon name="magnifying-glass" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
        <input type="text" placeholder="Search settings..." className="input-field rounded-lg pl-9 pr-8 py-2 text-sm w-48 lg:w-64" />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/10 rounded px-1.5 py-0.5 text-[10px] text-gray-400">F</div>
      </div>
      <div className="flex items-center gap-2">
        <button className="w-9 h-9 rounded-lg bg-brand-surface border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
          <OpenRideIcon name="moon" className="text-sm" />
        </button>
        <button className="px-3 h-9 rounded-lg bg-brand-surface border border-white/10 flex items-center gap-2 text-gray-400 hover:text-white transition-colors relative">
          <OpenRideIcon name="bell" className="text-sm" />
          <span className="bg-brand-error text-white text-[10px] px-1.5 rounded-full">2 New</span>
        </button>
      </div>
      <div className="flex items-center gap-3 pl-4 border-l border-white/10 ml-2 cursor-pointer hover:bg-white/5 p-1.5 rounded-lg transition-colors">
        <div className="text-right hidden lg:block">
          <p className="text-sm font-medium text-white">Ronald R.</p>
          <p className="text-xs text-gray-400">Membre depuis 2023</p>
        </div>
        <div className="relative">
          <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg" alt="Profile" className="w-9 h-9 rounded-full border border-white/20" />
          <div className="absolute -bottom-1 -right-1 bg-brand-error text-white text-[9px] font-bold px-1 rounded-full border border-brand-background">4.8</div>
        </div>
        <OpenRideIcon name="chevron-down" className="text-xs text-gray-500" />
      </div>
    </div>
  </header>
);

export default ProfileSettingsHeader;
