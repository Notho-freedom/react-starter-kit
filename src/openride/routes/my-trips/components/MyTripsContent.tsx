import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useOpenRideWorkflow,
  type MyTripsCollection,
  type MyTripsStatusTab,
  type TripViewRole,
  type PassengerTrip,
  type PublishedTrip,
  type RiderRequestPost,
  type DriverAvailabilityPost,
} from "@/openride/shared/workflows";
import MyTripsToolbar from "./MyTripsToolbar";
import TripsList from "./TripsList";
import TripsSummaryPanel from "./TripsSummaryPanel";

const passengerCategories: Array<{ label: string; value: MyTripsCollection }> = [
  { label: "Réservations", value: "bookings" },
  { label: "Demandes", value: "requests" },
];

const driverCategories: Array<{ label: string; value: MyTripsCollection }> = [
  { label: "Trajets", value: "trips" },
  { label: "Disponibilités", value: "availabilities" },
];

const tripStatusTabs: Array<{ label: string; value: MyTripsStatusTab }> = [
  { label: "À venir", value: "upcoming" },
  { label: "Passés", value: "past" },
  { label: "Annulés", value: "cancelled" },
];

const flexStatusTabs: Array<{ label: string; value: MyTripsStatusTab }> = [
  { label: "Actives", value: "active" },
  { label: "Pourvues", value: "fulfilled" },
  { label: "Annulées", value: "cancelled" },
];

function MyTripsContent() {
  const navigate = useNavigate();
  const workflow = useOpenRideWorkflow();
  const [role, setRole] = useState<TripViewRole>("passenger");
  const [selectedCategory, setSelectedCategory] = useState<MyTripsCollection>("bookings");
  const [tab, setTab] = useState<MyTripsStatusTab>("upcoming");
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const categoryOptions = role === "passenger" ? passengerCategories : driverCategories;
  const isFlexCategory = selectedCategory === "requests" || selectedCategory === "availabilities";
  const tabOptions = isFlexCategory ? flexStatusTabs : tripStatusTabs;

  // Reset category & tab when role changes
  const handleSetRole = (nextRole: TripViewRole) => {
    setRole(nextRole);
    const defaultCat = nextRole === "passenger" ? "bookings" : "trips";
    setSelectedCategory(defaultCat);
    setTab(defaultCat === "bookings" || defaultCat === "trips" ? "upcoming" : "active");
    setSelectedItemId(null);
  };

  const handleSetCategory = (nextCategory: MyTripsCollection) => {
    setSelectedCategory(nextCategory);
    const isFlex = nextCategory === "requests" || nextCategory === "availabilities";
    setTab(isFlex ? "active" : "upcoming");
    setSelectedItemId(null);
  };

  const items = useMemo(() => {
    if (selectedCategory === "bookings") {
      return workflow.passengerTrips.filter((t) => t.kind === tab);
    }
    if (selectedCategory === "trips") {
      return workflow.publishedTrips.filter((t) => t.kind === tab);
    }
    if (selectedCategory === "requests") {
      return workflow.myRideRequests.filter((r) => r.kind === tab);
    }
    if (selectedCategory === "availabilities") {
      return workflow.myDriverAvailabilities.filter((a) => a.kind === tab);
    }
    return [];
  }, [
    selectedCategory,
    tab,
    workflow.driverAvailabilities,
    workflow.myDriverAvailabilities,
    workflow.myRideRequests,
    workflow.passengerTrips,
    workflow.publishedTrips,
  ]);

  const counts = useMemo(() => {
    const source =
      selectedCategory === "bookings"
        ? workflow.passengerTrips
        : selectedCategory === "trips"
          ? workflow.publishedTrips
          : selectedCategory === "requests"
            ? workflow.myRideRequests
            : workflow.myDriverAvailabilities;

    const result: Partial<Record<MyTripsStatusTab, number>> = {};
    for (const option of tabOptions) {
      result[option.value] = source.filter((item) => item.kind === option.value).length;
    }
    return result;
  }, [
    selectedCategory,
    tabOptions,
    workflow.myDriverAvailabilities,
    workflow.myRideRequests,
    workflow.passengerTrips,
    workflow.publishedTrips,
  ]);

  const selectedItem = items.find((item) => item.id === selectedItemId) ?? items[0] ?? null;

  // For summary panel, find a matching ride if it's a booking/trip
  const summaryTrip: PassengerTrip | PublishedTrip | null =
    selectedCategory === "bookings" || selectedCategory === "trips"
      ? (selectedItem as PassengerTrip | PublishedTrip | null)
      : null;

  const selectedRide =
    summaryTrip && "rideId" in summaryTrip
      ? workflow.searchRides.find((ride) => ride.id === summaryTrip.rideId) ?? workflow.selectedRide ?? null
      : null;

  return (
    <div className="flex-1 overflow-y-auto custom-scroll p-6 lg:p-10">
      <div className="max-w-7xl mx-auto space-y-6">
        <MyTripsToolbar
          categoryOptions={categoryOptions}
          counts={counts}
          role={role}
          selectedCategory={selectedCategory}
          setRole={handleSetRole}
          setSelectedCategory={handleSetCategory}
          setTab={setTab}
          tab={tab}
          tabOptions={tabOptions}
        />
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <TripsList
            collection={selectedCategory}
            items={items as Array<PassengerTrip | PublishedTrip | RiderRequestPost | DriverAvailabilityPost>}
            onCancelAvailability={(id) => workflow.cancelAvailability(id)}
            onCancelRequest={(id) => workflow.cancelRideRequest(id)}
            onMessage={async (rideId) => {
              await workflow.openConversationForRide(rideId);
              navigate("/messages");
            }}
            onOpenDetails={(rideId) => {
              workflow.setSelectedRide(rideId);
              navigate("/trip-details");
            }}
            onSelectItem={setSelectedItemId}
            selectedItemId={selectedItemId}
          />
          <TripsSummaryPanel
            onMessage={async (rideId) => {
              await workflow.openConversationForRide(rideId);
              navigate("/messages");
            }}
            ride={selectedRide}
            role={role}
            trip={summaryTrip}
          />
        </div>
      </div>
    </div>
  );
}

export default MyTripsContent;
