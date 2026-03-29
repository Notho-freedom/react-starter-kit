import { useNavigate } from "react-router-dom";
import { DashboardShell, OpenRidePageFrame } from "@/openride/shared/layouts";
import { handleOpenRideRouteClick, preventDefaultSubmit } from "@/openride/shared/navigation";
import { MyTripsContent, MyTripsHeader } from "./components";

const MyTripsPage = () => {
  const navigate = useNavigate();

  return (
    <OpenRidePageFrame
      bodyClassName="w-full min-h-screen flex flex-col md:flex-row bg-brand-background overflow-hidden font-sans text-brand-text"
      onClickCapture={(event) => {
        handleOpenRideRouteClick(event, navigate);
      }}
      onSubmitCapture={preventDefaultSubmit}
      pageId="my-trips"
      title="Ride Sharing - Mes Trajets"
    >
      <DashboardShell activeItem="myTrips" mobileMenuTone="surfaceLight">
        <main className="flex h-full min-h-0 flex-1 flex-col overflow-hidden">
          <MyTripsHeader />
          <MyTripsContent />
        </main>
      </DashboardShell>
    </OpenRidePageFrame>
  );
};

export default MyTripsPage;
