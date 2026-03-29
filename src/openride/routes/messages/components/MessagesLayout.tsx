import ConversationListPane from "./ConversationListPane";
import MessageThreadPane from "./MessageThreadPane";
import TripContextSidebar from "./TripContextSidebar";

const MessagesLayout = () => (
  <div className="flex min-h-0 flex-1 overflow-hidden">
    <ConversationListPane />
    <MessageThreadPane />
    <TripContextSidebar />
  </div>
);

export default MessagesLayout;
