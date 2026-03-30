import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { toast } from "sonner";
import { DashboardShell, OpenRidePageFrame } from "@/openride/shared/layouts";
import { handleOpenRideRouteClick, preventDefaultSubmit } from "@/openride/shared/navigation";
import { useOpenRideWorkflow } from "@/openride/shared/workflows";
import { usePublishTrip, usePublishAvailability } from "@/integrations/supabase/hooks";
import { PublishTripContent, PublishTripHeader } from "./components";

const PublishTripPage = () => {
  const navigate = useNavigate();
  const rootRef = useRef<HTMLDivElement>(null);
  const workflow = useOpenRideWorkflow();
  const publishTripMutation = usePublishTrip();
  const publishAvailabilityMutation = usePublishAvailability();

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
          const currentSeats =
            workflow.publishMode === "availability"
              ? workflow.availabilityDraft.seats
              : workflow.publishDraft.seats;
          const nextSeats =
            seatAction === "increment"
              ? Math.min(currentSeats + 1, 4)
              : Math.max(currentSeats - 1, 1);

          if (workflow.publishMode === "availability") {
            workflow.saveAvailabilityDraft({ seats: nextSeats });
          } else {
            workflow.savePublishDraft({ seats: nextSeats });
          }
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
          if (!field) return "";
          if (field instanceof HTMLInputElement && field.type === "checkbox") {
            return field.checked ? "true" : "";
          }
          return field.value;
        };

        if (workflow.publishMode === "availability") {
          const payload = {
            zone: readFieldValue("availabilityZone") || workflow.availabilityDraft.zone,
            date: readFieldValue("availabilityDate") || workflow.availabilityDraft.date || new Date().toISOString().split("T")[0],
            start_time: readFieldValue("availabilityStartTime") || workflow.availabilityDraft.startTime,
            end_time: readFieldValue("availabilityEndTime") || workflow.availabilityDraft.endTime,
            seats: workflow.availabilityDraft.seats,
            vehicle_name: readFieldValue("availabilityVehicleName") || workflow.availabilityDraft.vehicleName,
            notes: readFieldValue("availabilityNotes") || workflow.availabilityDraft.notes,
          };

          if (action === "save-draft") {
            workflow.saveAvailabilityDraft({
              zone: payload.zone,
              date: payload.date,
              startTime: payload.start_time,
              endTime: payload.end_time,
              seats: payload.seats,
              vehicleName: payload.vehicle_name,
              notes: payload.notes,
            });
            toast.success("Brouillon sauvegardé");
            return;
          }

          publishAvailabilityMutation.mutate(payload, {
            onSuccess: () => {
              toast.success("Disponibilité publiée !");
              navigate("/my-trips");
            },
            onError: (err) => toast.error(err.message || "Erreur lors de la publication"),
          });
          return;
        }

        // Planned trip mode
        const tripPayload = {
          departure: readFieldValue("departure") || workflow.publishDraft.departure,
          destination: readFieldValue("destination") || workflow.publishDraft.destination,
          date: readFieldValue("date") || workflow.publishDraft.date || new Date().toISOString().split("T")[0],
          time: readFieldValue("time") || workflow.publishDraft.time || "08:00",
          price: Number(readFieldValue("price") || workflow.publishDraft.price),
          seats_total: workflow.publishDraft.seats,
          vehicle_name: workflow.publishDraft.vehicleName,
          luggage_allowed: readFieldValue("luggageAllowed") === "true",
          pets_allowed: readFieldValue("petsAllowed") === "true",
          smoking_allowed: readFieldValue("smokingAllowed") === "true",
          instructions: readFieldValue("instructions"),
        };

        if (action === "save-draft") {
          workflow.savePublishDraft({
            departure: tripPayload.departure,
            destination: tripPayload.destination,
            date: tripPayload.date,
            time: tripPayload.time,
            price: tripPayload.price,
            seats: tripPayload.seats_total,
            vehicleName: tripPayload.vehicle_name || "",
            luggageAllowed: tripPayload.luggage_allowed,
            petsAllowed: tripPayload.pets_allowed,
            smokingAllowed: tripPayload.smoking_allowed,
            instructions: tripPayload.instructions,
          });
          toast.success("Brouillon sauvegardé");
          return;
        }

        publishTripMutation.mutate(tripPayload, {
          onSuccess: () => {
            toast.success("Trajet publié !");
            navigate("/my-trips");
          },
          onError: (err) => toast.error(err.message || "Erreur lors de la publication"),
        });
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
