import { OpenRideIcon } from "@/openride/shared/icons";

const ConversationListPane = () => (
  <>
    <div id="conversation-list" className="w-full md:w-80 lg:w-96 flex flex-col border-r border-gray-800/50 bg-brand-background shrink-0">
      {/* Filters */}
      <div className="p-4 border-b border-gray-800/50 flex gap-2 overflow-x-auto hide-scroll">
        <button className="px-4 py-1.5 rounded-full bg-brand-accentGreen text-brand-dark text-sm font-medium whitespace-nowrap">Tous</button>
        <button className="px-4 py-1.5 rounded-full bg-brand-surface border border-gray-700 text-gray-400 hover:text-white text-sm font-medium whitespace-nowrap transition-colors">Non lus (3)</button>
        <button className="px-4 py-1.5 rounded-full bg-brand-surface border border-gray-700 text-gray-400 hover:text-white text-sm font-medium whitespace-nowrap transition-colors">Passagers</button>
        <button className="px-4 py-1.5 rounded-full bg-brand-surface border border-gray-700 text-gray-400 hover:text-white text-sm font-medium whitespace-nowrap transition-colors">Conducteurs</button>
      </div>
      {/* List */}
      <div className="flex-1 overflow-y-auto chat-scroll p-2 space-y-1">
        {/* Active Conversation */}
        <div className="p-3 rounded-xl bg-brand-surfaceLight border border-gray-700 cursor-pointer relative">
          <div className="flex gap-3">
            <div className="relative shrink-0">
              <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg" alt="Avatar" className="w-12 h-12 rounded-full border border-gray-600" />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-brand-success rounded-full border-2 border-brand-surfaceLight" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start mb-1">
                <h4 className="text-white font-medium truncate">Thomas Dubois</h4>
                <span className="text-xs text-brand-accentGreen font-medium">10:42</span>
              </div>
              <p className="text-sm text-white truncate font-medium">Parfait, on se retrouve devant la gare !</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[10px] px-2 py-0.5 rounded bg-gray-800 text-gray-300 border border-gray-700"><OpenRideIcon name="car" className="text-brand-accentGreen mr-1" /> Paris → Lyon</span>
              </div>
            </div>
          </div>
        </div>
        {/* Unread Conversation */}
        <div className="p-3 rounded-xl hover:bg-brand-surface transition-colors cursor-pointer relative group">
          <div className="absolute left-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-brand-accentYellow rounded-full" />
          <div className="flex gap-3 pl-3">
            <div className="relative shrink-0">
              <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg" alt="Avatar" className="w-12 h-12 rounded-full border border-gray-600" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start mb-1">
                <h4 className="text-white font-medium truncate">Marie Laurent</h4>
                <span className="text-xs text-brand-accentYellow font-medium">Hier</span>
              </div>
              <p className="text-sm text-gray-400 truncate font-medium text-white">Est-ce que vous avez de la place pour un grand sac ?</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[10px] px-2 py-0.5 rounded bg-gray-800 text-gray-300 border border-gray-700"><OpenRideIcon name="car" className="text-brand-accentGreen mr-1" /> Bordeaux → Toulouse</span>
              </div>
            </div>
          </div>
        </div>
        {/* Read Conversation */}
        <div className="p-3 rounded-xl hover:bg-brand-surface transition-colors cursor-pointer relative group">
          <div className="flex gap-3 pl-3">
            <div className="relative shrink-0">
              <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg" alt="Avatar" className="w-12 h-12 rounded-full border border-gray-600 grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start mb-1">
                <h4 className="text-gray-300 font-medium truncate group-hover:text-white transition-colors">Lucas Martin</h4>
                <span className="text-xs text-gray-500">Lun</span>
              </div>
              <p className="text-sm text-gray-500 truncate">Merci pour le trajet, c'était super !</p>
              <div className="flex items-center gap-2 mt-2 opacity-70">
                <span className="text-[10px] px-2 py-0.5 rounded bg-gray-800 text-gray-400 border border-gray-700">Terminé</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default ConversationListPane;
