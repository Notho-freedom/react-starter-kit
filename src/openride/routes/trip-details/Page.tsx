import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardShell, OpenRidePageFrame } from "@/openride/shared/layouts";
import { handleOpenRideRouteClick, preventDefaultSubmit } from "@/openride/shared/navigation";
import { TripDetailsContent, TripDetailsHeader } from "./components";

const TripDetailsPage = () => {
  const navigate = useNavigate();
  const rootRef = useRef<HTMLDivElement>(null);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }

    const seatButtons = Array.from(root.querySelectorAll<HTMLElement>(".seat-btn:not(.taken)"));
    seatButtons.forEach((button, index) => {
      button.classList.toggle("selected", selectedSeats.includes(index));
    });
  }, [selectedSeats]);

  return (
    <OpenRidePageFrame
      bodyClassName="w-full min-h-screen flex flex-col md:flex-row bg-brand-background overflow-hidden font-sans"
      className="openride-theme-dashboard"
      onClickCapture={(event) => {
        if (handleOpenRideRouteClick(event, navigate)) {
          return;
        }

        const target = event.target as HTMLElement | null;
        const seatButton = target?.closest<HTMLElement>(".seat-btn");

        if (!seatButton || seatButton.classList.contains("taken")) {
          return;
        }

        event.preventDefault();
        const seatButtons = Array.from(
          rootRef.current?.querySelectorAll<HTMLElement>(".seat-btn:not(.taken)") ?? [],
        );
        const seatIndex = seatButtons.indexOf(seatButton);

        if (seatIndex < 0) {
          return;
        }

        setSelectedSeats((current) =>
          current.includes(seatIndex)
            ? current.filter((value) => value !== seatIndex)
            : [...current, seatIndex],
        );
      }}
      onSubmitCapture={preventDefaultSubmit}
      pageId="trip-details"
      title="Ride Sharing - Détails du Trajet"
    >
      <DashboardShell activeItem="myTrips">
        <main ref={rootRef} className="flex-1 flex flex-col overflow-hidden">
          <TripDetailsHeader />
          <TripDetailsContent />
        </main>
      </DashboardShell>
    </OpenRidePageFrame>
  );
};

export default TripDetailsPage;
