import { OpenRideIcon } from "@/openride/shared/icons";

const MessagesHeader = () => (
<header id="top-header" className="sticky top-0 z-40 h-20 shrink-0 glass-panel flex items-center justify-between border-b border-gray-800/50 px-6">
    <div className="flex items-center gap-4">
      <h1 className="text-xl md:text-2xl font-semibold text-white">Messages</h1>
    </div>
    <div className="flex items-center gap-4">
      <div className="relative hidden md:block">
        <OpenRideIcon name="magnifying-glass" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input type="text" placeholder="Rechercher un message..." className="input-field rounded-full pl-10 pr-4 py-2 text-sm w-64" />
      </div>
      <button className="w-10 h-10 rounded-full bg-brand-surface border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white transition-colors relative">
        <OpenRideIcon name="bell" />
        <span className="absolute top-2 right-2 w-2 h-2 bg-brand-error rounded-full" />
      </button>
    </div>
  </header>
);

export default MessagesHeader;
