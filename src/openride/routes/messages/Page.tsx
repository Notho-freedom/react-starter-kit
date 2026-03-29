import { useNavigate } from "react-router-dom";
import { DashboardShell, OpenRidePageFrame } from "@/openride/shared/layouts";
import { handleOpenRideRouteClick, preventDefaultSubmit } from "@/openride/shared/navigation";
import { MessagesHeader, MessagesLayout } from "./components";

const MessagesPage = () => {
  const navigate = useNavigate();

  return (
    <OpenRidePageFrame
      bodyClassName="w-full min-h-screen flex flex-col md:flex-row bg-brand-background overflow-hidden font-sans text-brand-text"
      className="openride-theme-dashboard"
      onClickCapture={(event) => {
        handleOpenRideRouteClick(event, navigate);
      }}
      onSubmitCapture={preventDefaultSubmit}
      pageId="messages"
      title="Ride Sharing - Messages"
    >
      <DashboardShell activeItem="messages">
        <main className="flex-1 flex flex-col overflow-hidden">
          <MessagesHeader />
          <MessagesLayout />
        </main>
      </DashboardShell>
    </OpenRidePageFrame>
  );
};

export default MessagesPage;
