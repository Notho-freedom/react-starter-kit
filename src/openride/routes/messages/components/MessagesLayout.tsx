import ConversationListPane from "./ConversationListPane";
import MessageThreadPane from "./MessageThreadPane";
import TripContextSidebar from "./TripContextSidebar";

const MessagesLayout = () => (
  <div className="flex-1 flex overflow-hidden">
    <ConversationListPane />
    <MessageThreadPane />
    <TripContextSidebar />
  </div>
);

export default MessagesLayout;
