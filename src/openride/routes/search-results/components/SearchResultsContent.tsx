import RideResultsList from "./RideResultsList";
import MapPanel from "./MapPanel";

const SearchResultsContent = () => (
  <div className="flex min-h-0 flex-1 flex-col overflow-hidden lg:flex-row">
    <RideResultsList />
    <MapPanel />
  </div>
);

export default SearchResultsContent;
