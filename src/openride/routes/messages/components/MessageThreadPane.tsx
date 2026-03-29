import { useState } from "react";
import { OpenRideIcon } from "@/openride/shared/icons";
import { useOpenRideWorkflow } from "@/openride/shared/workflows";

function MessageThreadPane() {
  const workflow = useOpenRideWorkflow();
  const [draft, setDraft] = useState("");
  const conversation = workflow.activeConversation ?? workflow.conversations[0];

  if (!conversation) {
    return (
      <div id="message-thread" className="hidden md:flex flex-1 items-center justify-center bg-brand-surface/30">
        <p className="text-sm text-brand-textMuted">Aucune conversation active pour le moment.</p>
      </div>
    );
  }

  return (
    <div id="message-thread" className="hidden md:flex flex-1 flex-col bg-brand-surface/30 relative">
      <div className="h-16 border-b border-gray-800/50 flex items-center justify-between px-6 bg-brand-surfaceLight/50 backdrop-blur-md shrink-0">
        <div className="flex items-center gap-3">
          <img src={conversation.participantAvatar} alt={conversation.participantName} className="w-10 h-10 rounded-full border border-gray-600" />
          <div>
            <h3 className="text-white font-medium">{conversation.participantName}</h3>
            <p className="text-xs text-brand-success flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-success" />
              {conversation.isOnline ? "En ligne" : "Hors ligne"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button aria-label="Appeler" className="w-9 h-9 rounded-full hover:bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
            <OpenRideIcon name="phone" />
          </button>
          <button aria-label="Plus d'options" className="w-9 h-9 rounded-full hover:bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
            <OpenRideIcon name="ellipsis-vertical" />
          </button>
          <button aria-label="Infos trajet" className="lg:hidden w-9 h-9 rounded-full bg-brand-accentGreen/10 text-brand-accentGreen flex items-center justify-center">
            <OpenRideIcon name="circle-info" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto chat-scroll p-6 flex flex-col gap-6">
        <div className="flex justify-center">
          <span className="text-xs font-medium text-gray-500 bg-brand-surface px-3 py-1 rounded-full border border-gray-800">
            Aujourd&apos;hui
          </span>
        </div>

        {conversation.messages.map((message, index) => {
          const isMine = message.sender === "me";
          const showAvatar = !isMine && (index === 0 || conversation.messages[index - 1]?.sender !== "them");

          return (
            <div
              key={message.id}
              className={`flex gap-3 max-w-[80%] ${isMine ? "ml-auto justify-end" : ""} ${!isMine && !showAvatar ? "ml-11" : ""}`}
            >
              {!isMine && showAvatar ? (
                <img src={conversation.participantAvatar} alt={conversation.participantName} className="w-8 h-8 rounded-full shrink-0 mt-auto" />
              ) : null}
              <div className={`flex flex-col gap-1 ${isMine ? "items-end" : "items-start"}`}>
                <div className={`${isMine ? "message-bubble-sent font-medium" : "message-bubble-received"} p-3 text-sm shadow-sm ${message.attachmentImage ? "flex flex-col gap-2" : ""}`}>
                  <span>{message.text}</span>
                  {message.attachmentImage ? (
                    <div className="relative rounded-lg overflow-hidden border border-brand-dark/20 w-48 h-32">
                      <img src={message.attachmentImage} alt={message.attachmentLabel ?? "Attachment"} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center text-brand-dark shadow-lg">
                          <OpenRideIcon name="location-dot" />
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
                <div className={`flex items-center gap-1 ${isMine ? "mr-1" : "ml-1"}`}>
                  <span className="text-[10px] text-gray-500">{message.timestamp}</span>
                  {isMine ? <OpenRideIcon name="check-double" className="text-[10px] text-brand-accentGreen" /> : null}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-4 border-t border-gray-800/50 bg-brand-surfaceLight/50 backdrop-blur-md shrink-0">
        <div className="flex items-end gap-2 bg-brand-surface border border-gray-700 rounded-2xl p-2 focus-within:border-brand-accentGreen focus-within:ring-1 focus-within:ring-brand-accentGreen/50 transition-all">
          <button aria-label="Ajouter une pièce jointe" className="w-10 h-10 rounded-xl hover:bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white transition-colors shrink-0">
            <OpenRideIcon name="paperclip" />
          </button>
          <textarea
            rows={1}
            className="flex-1 bg-transparent text-white text-sm py-3 px-2 focus:outline-none resize-none max-h-32 chat-scroll"
            placeholder="Écrivez votre message..."
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
          />
          <button
            aria-label="Envoyer le message"
            className="w-10 h-10 rounded-xl bg-brand-accentGreen hover:bg-[#8be08b] flex items-center justify-center text-brand-dark transition-colors shrink-0 shadow-sm shadow-brand-accentGreen/20"
            onClick={() => {
              workflow.sendMessage(draft);
              setDraft("");
            }}
            type="button"
          >
            <OpenRideIcon name="paper-plane" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default MessageThreadPane;
