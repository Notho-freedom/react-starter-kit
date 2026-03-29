import PublishTripFooter from "./PublishTripFooter";
import PublishTripFormSections from "./PublishTripFormSections";
import PublishTripSidebar from "./PublishTripSidebar";

const PublishTripContent = () => (
  <div className="flex-1 overflow-y-auto hide-scroll p-6 lg:p-10">
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
      <PublishTripFormSections />
      <PublishTripSidebar />
    </div>
    <PublishTripFooter />
  </div>
);

export default PublishTripContent;
