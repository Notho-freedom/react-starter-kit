import { useNavigate } from "react-router-dom";
import { DashboardShell, OpenRidePageFrame } from "@/openride/shared/layouts";
import { handleOpenRideRouteClick, preventDefaultSubmit } from "@/openride/shared/navigation";
import { PublishTripContent, PublishTripHeader } from "./components";

const PublishTripPage = () => {
  const navigate = useNavigate();

  return (
    <OpenRidePageFrame
      bodyClassName="w-full min-h-screen flex flex-col md:flex-row bg-brand-background overflow-hidden font-sans text-brand-text"
      onClickCapture={(event) => {
        handleOpenRideRouteClick(event, navigate);
      }}
      onSubmitCapture={preventDefaultSubmit}
      pageId="publish-trip"
      title="Ride Sharing - Publier un Trajet"
    >
      <DashboardShell activeItem="publishTrip">
        <main className="flex h-full min-h-0 flex-1 flex-col overflow-hidden">
          <PublishTripHeader />
          <PublishTripContent />
        </main>
      </DashboardShell>
    </OpenRidePageFrame>
  );
};

export default PublishTripPage;
