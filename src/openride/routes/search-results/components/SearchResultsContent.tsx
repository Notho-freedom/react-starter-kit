import RideResultsList from "./RideResultsList";
import MapPanel from "./MapPanel";

const SearchResultsContent = () => (
  <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
    <RideResultsList />
    <MapPanel />
  </div>
);

export default SearchResultsContent;
