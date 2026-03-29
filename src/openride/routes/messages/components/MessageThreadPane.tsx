import { OpenRideIcon } from "@/openride/shared/icons";

const MessageThreadPane = () => (
  <>
    <div id="message-thread" className="hidden md:flex flex-1 flex-col bg-brand-surface/30 relative">
      {/* Thread Header */}
      <div className="h-16 border-b border-gray-800/50 flex items-center justify-between px-6 bg-brand-surfaceLight/50 backdrop-blur-md shrink-0">
        <div className="flex items-center gap-3">
          <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg" alt="Thomas" className="w-10 h-10 rounded-full border border-gray-600" />
          <div>
            <h3 className="text-white font-medium">Thomas Dubois</h3>
            <p className="text-xs text-brand-success flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-brand-success" /> En ligne</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="w-9 h-9 rounded-full hover:bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
            <OpenRideIcon name="phone" />
          </button>
          <button className="w-9 h-9 rounded-full hover:bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
            <OpenRideIcon name="ellipsis-vertical" />
          </button>
          {/* Mobile context toggle */}
          <button className="lg:hidden w-9 h-9 rounded-full bg-brand-accentGreen/10 text-brand-accentGreen flex items-center justify-center">
            <OpenRideIcon name="circle-info" />
          </button>
        </div>
      </div>
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto chat-scroll p-6 flex flex-col gap-6">
        {/* Date Divider */}
        <div className="flex justify-center">
          <span className="text-xs font-medium text-gray-500 bg-brand-surface px-3 py-1 rounded-full border border-gray-800">Aujourd'hui</span>
        </div>
        {/* Received Message */}
        <div className="flex gap-3 max-w-[80%]">
          <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg" alt="Thomas" className="w-8 h-8 rounded-full shrink-0 mt-auto" />
          <div className="flex flex-col gap-1 items-start">
            <div className="message-bubble-received p-3 text-sm shadow-sm">
              Bonjour Devon ! J'ai réservé une place pour le trajet Paris-Lyon de demain.
            </div>
            <span className="text-[10px] text-gray-500 ml-1">10:30</span>
          </div>
        </div>
        {/* Received Message (Consecutive) */}
        <div className="flex gap-3 max-w-[80%] ml-11">
          <div className="flex flex-col gap-1 items-start">
            <div className="message-bubble-received p-3 text-sm shadow-sm">
              Est-ce qu'il serait possible de se retrouver devant la gare de Lyon plutôt qu'à Bercy ? J'ai une valise assez lourde.
            </div>
            <span className="text-[10px] text-gray-500 ml-1">10:31</span>
          </div>
        </div>
        {/* Sent Message */}
        <div className="flex gap-3 max-w-[80%] ml-auto justify-end">
          <div className="flex flex-col gap-1 items-end">
            <div className="message-bubble-sent p-3 text-sm shadow-sm font-medium">
              Salut Thomas ! Oui pas de problème, la gare de Lyon m'arrange aussi finalement.
            </div>
            <div className="flex items-center gap-1 mr-1">
              <span className="text-[10px] text-gray-500">10:35</span>
              <OpenRideIcon name="check-double" className="text-[10px] text-brand-accentGreen" />
            </div>
          </div>
        </div>
        {/* Sent Message with Attachment */}
        <div className="flex gap-3 max-w-[80%] ml-auto justify-end">
          <div className="flex flex-col gap-1 items-end">
            <div className="message-bubble-sent p-3 text-sm shadow-sm font-medium flex flex-col gap-2">
              <span>Je serai garé exactement ici, devant le dépose-minute :</span>
              <div className="relative rounded-lg overflow-hidden border border-brand-dark/20 w-48 h-32">
                <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" alt="Map Location" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center text-brand-dark shadow-lg">
                    <OpenRideIcon name="location-dot" />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1 mr-1">
              <span className="text-[10px] text-gray-500">10:38</span>
              <OpenRideIcon name="check-double" className="text-[10px] text-brand-accentGreen" />
            </div>
          </div>
        </div>
        {/* Received Message */}
        <div className="flex gap-3 max-w-[80%]">
          <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg" alt="Thomas" className="w-8 h-8 rounded-full shrink-0 mt-auto" />
          <div className="flex flex-col gap-1 items-start">
            <div className="message-bubble-received p-3 text-sm shadow-sm">
              Parfait, on se retrouve devant la gare ! À demain.
            </div>
            <span className="text-[10px] text-gray-500 ml-1">10:42</span>
          </div>
        </div>
      </div>
      {/* Input Area */}
      <div className="p-4 border-t border-gray-800/50 bg-brand-surfaceLight/50 backdrop-blur-md shrink-0">
        <div className="flex items-end gap-2 bg-brand-surface border border-gray-700 rounded-2xl p-2 focus-within:border-brand-accentGreen focus-within:ring-1 focus-within:ring-brand-accentGreen/50 transition-all">
          <button className="w-10 h-10 rounded-xl hover:bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white transition-colors shrink-0">
            <OpenRideIcon name="paperclip" />
          </button>
          <textarea rows={1} className="flex-1 bg-transparent text-white text-sm py-3 px-2 focus:outline-none resize-none max-h-32 chat-scroll" placeholder="Écrivez votre message..." defaultValue={""} />
          <button className="w-10 h-10 rounded-xl bg-brand-accentGreen hover:bg-[#8be08b] flex items-center justify-center text-brand-dark transition-colors shrink-0 shadow-sm shadow-brand-accentGreen/20">
            <OpenRideIcon name="paper-plane" />
          </button>
        </div>
      </div>
    </div>
  </>
);

export default MessageThreadPane;
