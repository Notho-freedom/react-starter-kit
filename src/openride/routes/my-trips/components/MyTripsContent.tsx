import MyTripsToolbar from "./MyTripsToolbar";
import TripsList from "./TripsList";
import TripsSummaryPanel from "./TripsSummaryPanel";

const MyTripsContent = () => (
  <div className="flex-1 overflow-y-auto custom-scroll p-6 lg:p-10">
    <div className="max-w-7xl mx-auto space-y-6">
      <MyTripsToolbar />
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <TripsList />
        <TripsSummaryPanel />
      </div>
    </div>
  </div>
);

export default MyTripsContent;
