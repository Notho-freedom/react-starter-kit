import TripDetailsBookingSidebar from "./TripDetailsBookingSidebar";
import TripDetailsFooter from "./TripDetailsFooter";
import TripDetailsMainColumn from "./TripDetailsMainColumn";

const TripDetailsContent = () => (
  <div className="flex-1 overflow-y-auto hide-scroll p-6 lg:p-10">
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
      <TripDetailsMainColumn />
      <TripDetailsBookingSidebar />
    </div>
    <TripDetailsFooter />
  </div>
);

export default TripDetailsContent;
