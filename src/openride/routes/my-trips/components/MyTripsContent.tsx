import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOpenRideWorkflow, type TripViewRole, type TripViewTab } from "@/openride/shared/workflows";
import MyTripsToolbar from "./MyTripsToolbar";
import TripsList from "./TripsList";
import TripsSummaryPanel from "./TripsSummaryPanel";

function MyTripsContent() {
  const navigate = useNavigate();
  const workflow = useOpenRideWorkflow();
  const [role, setRole] = useState<TripViewRole>("passenger");
  const [tab, setTab] = useState<TripViewTab>("upcoming");

  const trips = useMemo(
    () =>
      (role === "passenger" ? workflow.passengerTrips : workflow.publishedTrips).filter(
        (trip) => trip.kind === tab,
      ),
    [role, tab, workflow.passengerTrips, workflow.publishedTrips],
  );
  const [selectedTripId, setSelectedTripId] = useState<string | null>(null);

  const selectedTrip = trips.find((trip) => trip.id === selectedTripId) ?? trips[0] ?? null;
  const selectedRide =
    workflow.searchRides.find((ride) => ride.id === selectedTrip?.rideId) ?? workflow.selectedRide ?? null;

  const counts = useMemo(
    () => ({
      upcoming: (role === "passenger" ? workflow.passengerTrips : workflow.publishedTrips).filter(
        (trip) => trip.kind === "upcoming",
      ).length,
      past: (role === "passenger" ? workflow.passengerTrips : workflow.publishedTrips).filter(
        (trip) => trip.kind === "past",
      ).length,
      cancelled: (role === "passenger" ? workflow.passengerTrips : workflow.publishedTrips).filter(
        (trip) => trip.kind === "cancelled",
      ).length,
    }),
    [role, workflow.passengerTrips, workflow.publishedTrips],
  );

  return (
    <div className="flex-1 overflow-y-auto custom-scroll p-6 lg:p-10">
      <div className="max-w-7xl mx-auto space-y-6">
        <MyTripsToolbar counts={counts} role={role} setRole={setRole} setTab={setTab} tab={tab} />
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <TripsList
            onMessage={(rideId) => {
              workflow.openConversationForRide(rideId);
              navigate("/messages");
            }}
            onOpenDetails={(rideId) => {
              workflow.setSelectedRide(rideId);
              navigate("/trip-details");
            }}
            onSelectTrip={setSelectedTripId}
            role={role}
            selectedTripId={selectedTripId}
            trips={trips}
          />
          <TripsSummaryPanel
            onMessage={(rideId) => {
              workflow.openConversationForRide(rideId);
              navigate("/messages");
            }}
            ride={selectedRide}
            role={role}
            trip={selectedTrip}
          />
        </div>
      </div>
    </div>
  );
}

export default MyTripsContent;
