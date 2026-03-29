import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardShell, OpenRidePageFrame } from "@/openride/shared/layouts";
import { handleOpenRideRouteClick, preventDefaultSubmit } from "@/openride/shared/navigation";
import { useOpenRideWorkflow } from "@/openride/shared/workflows";
import { TripDetailsContent, TripDetailsHeader } from "./components";

const TripDetailsPage = () => {
  const navigate = useNavigate();
  const rootRef = useRef<HTMLDivElement>(null);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const workflow = useOpenRideWorkflow();
  const updateBookingDraft = workflow.updateBookingDraft;
  const bookingDraftRideId = workflow.bookingDraft.rideId;
  const bookingDraftSeatCount = workflow.bookingDraft.seatCount;
  const selectedRideId = workflow.selectedRide?.id ?? null;

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

  useEffect(() => {
    const nextSeatCount = Math.max(selectedSeats.length, 1);

    if (
      selectedRideId &&
      (bookingDraftRideId !== selectedRideId || bookingDraftSeatCount !== nextSeatCount)
    ) {
      updateBookingDraft({
        rideId: selectedRideId,
        seatCount: nextSeatCount,
      });
    }
  }, [bookingDraftRideId, bookingDraftSeatCount, selectedRideId, selectedSeats, updateBookingDraft]);

  return (
    <OpenRidePageFrame
      bodyClassName="w-full min-h-screen flex flex-col md:flex-row bg-brand-background overflow-hidden font-sans"
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
        <main ref={rootRef} className="flex h-full min-h-0 flex-1 flex-col overflow-hidden">
          <TripDetailsHeader />
          <TripDetailsContent />
        </main>
      </DashboardShell>
    </OpenRidePageFrame>
  );
};

export default TripDetailsPage;
