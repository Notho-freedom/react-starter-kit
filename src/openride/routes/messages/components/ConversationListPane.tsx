import { OpenRideIcon } from "@/openride/shared/icons";
import { useOpenRideWorkflow } from "@/openride/shared/workflows";

function ConversationListPane() {
  const workflow = useOpenRideWorkflow();

  return (
    <div id="conversation-list" className="w-full md:w-80 lg:w-96 flex flex-col border-r border-gray-800/50 bg-brand-background shrink-0">
      <div className="p-4 border-b border-gray-800/50 flex gap-2 overflow-x-auto hide-scroll">
        <button className="px-4 py-1.5 rounded-full bg-brand-accentGreen text-brand-dark text-sm font-medium whitespace-nowrap">
          Tous
        </button>
        <button className="px-4 py-1.5 rounded-full bg-brand-surface border border-gray-700 text-gray-400 hover:text-white text-sm font-medium whitespace-nowrap transition-colors">
          Non lus ({workflow.conversations.filter((conversation) => conversation.unread).length})
        </button>
        <button className="px-4 py-1.5 rounded-full bg-brand-surface border border-gray-700 text-gray-400 hover:text-white text-sm font-medium whitespace-nowrap transition-colors">
          Passagers
        </button>
        <button className="px-4 py-1.5 rounded-full bg-brand-surface border border-gray-700 text-gray-400 hover:text-white text-sm font-medium whitespace-nowrap transition-colors">
          Conducteurs
        </button>
      </div>

      <div className="flex-1 overflow-y-auto chat-scroll p-2 space-y-1">
        {workflow.conversations.map((conversation) => {
          const isActive = workflow.activeConversation?.id === conversation.id;

          return (
            <button
              key={conversation.id}
              className={`w-full p-3 rounded-xl transition-colors cursor-pointer relative text-left ${isActive ? "bg-brand-surfaceLight border border-gray-700" : "hover:bg-brand-surface"}`}
              onClick={() => workflow.setActiveConversation(conversation.id)}
              type="button"
            >
              {conversation.unread && !isActive ? (
                <div className="absolute left-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-brand-accentYellow rounded-full" />
              ) : null}

              <div className={`flex gap-3 ${conversation.unread && !isActive ? "pl-3" : ""}`}>
                <div className="relative shrink-0">
                  <img src={conversation.participantAvatar} alt={conversation.participantName} className="w-12 h-12 rounded-full border border-gray-600" />
                  {conversation.isOnline ? (
                    <div className={`absolute bottom-0 right-0 w-3 h-3 bg-brand-success rounded-full border-2 ${isActive ? "border-brand-surfaceLight" : "border-brand-background"}`} />
                  ) : null}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className={`${isActive ? "text-white" : conversation.unread ? "text-white" : "text-gray-300"} font-medium truncate`}>
                      {conversation.participantName}
                    </h4>
                    <span className={`text-xs ${conversation.unread ? "text-brand-accentYellow" : "text-gray-500"} font-medium`}>
                      {conversation.lastTimestamp}
                    </span>
                  </div>
                  <p className={`text-sm truncate ${conversation.unread ? "text-white font-medium" : "text-gray-400"}`}>
                    {conversation.lastMessage}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[10px] px-2 py-0.5 rounded bg-gray-800 text-gray-300 border border-gray-700">
                      <OpenRideIcon name="car" className="text-brand-accentGreen mr-1" /> {conversation.routeLabel}
                    </span>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default ConversationListPane;
