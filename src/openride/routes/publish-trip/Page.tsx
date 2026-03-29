import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { DashboardShell, OpenRidePageFrame } from "@/openride/shared/layouts";
import { handleOpenRideRouteClick, preventDefaultSubmit } from "@/openride/shared/navigation";
import { useOpenRideWorkflow } from "@/openride/shared/workflows";
import { PublishTripContent, PublishTripHeader } from "./components";

const PublishTripPage = () => {
  const navigate = useNavigate();
  const rootRef = useRef<HTMLDivElement>(null);
  const workflow = useOpenRideWorkflow();

  return (
    <OpenRidePageFrame
      bodyClassName="w-full min-h-screen flex flex-col md:flex-row bg-brand-background overflow-hidden font-sans text-brand-text"
      onClickCapture={(event) => {
        if (handleOpenRideRouteClick(event, navigate)) {
          return;
        }

        const target = event.target as HTMLElement | null;
        const seatAction =
          target?.closest<HTMLElement>("[data-openride-publish-seat]")?.dataset.openridePublishSeat;

        if (seatAction === "increment" || seatAction === "decrement") {
          event.preventDefault();
          const currentSeats = workflow.publishDraft.seats;
          const nextSeats =
            seatAction === "increment"
              ? Math.min(currentSeats + 1, 4)
              : Math.max(currentSeats - 1, 1);
          workflow.savePublishDraft({ seats: nextSeats });
          return;
        }

        const action =
          target?.closest<HTMLElement>("[data-openride-publish-action]")?.dataset.openridePublishAction;

        if (action !== "save-draft" && action !== "publish") {
          return;
        }

        event.preventDefault();
        const readFieldValue = (name: string) => {
          const field = rootRef.current?.querySelector<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
          >(`[name="${name}"]`);

          if (!field) {
            return "";
          }

          if (field instanceof HTMLInputElement && field.type === "checkbox") {
            return field.checked ? "true" : "";
          }

          return field.value;
        };
        const payload = {
          date: readFieldValue("date") || workflow.publishDraft.date,
          departure: readFieldValue("departure") || workflow.publishDraft.departure,
          destination: readFieldValue("destination") || workflow.publishDraft.destination,
          instructions: readFieldValue("instructions"),
          luggageAllowed: readFieldValue("luggageAllowed") === "true",
          petsAllowed: readFieldValue("petsAllowed") === "true",
          price: Number(readFieldValue("price") || workflow.publishDraft.price),
          seats: workflow.publishDraft.seats,
          smokingAllowed: readFieldValue("smokingAllowed") === "true",
          time: readFieldValue("time") || workflow.publishDraft.time,
          vehicleName: workflow.publishDraft.vehicleName,
        };

        if (action === "save-draft") {
          workflow.savePublishDraft(payload);
          return;
        }

        workflow.publishTrip(payload);
        navigate("/my-trips");
      }}
      onSubmitCapture={preventDefaultSubmit}
      pageId="publish-trip"
      title="Ride Sharing - Publier un Trajet"
    >
      <DashboardShell activeItem="publishTrip">
        <main ref={rootRef} className="flex h-full min-h-0 flex-1 flex-col overflow-hidden">
          <PublishTripHeader />
          <PublishTripContent />
        </main>
      </DashboardShell>
    </OpenRidePageFrame>
  );
};

export default PublishTripPage;
