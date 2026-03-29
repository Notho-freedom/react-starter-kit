import { useNavigate } from "react-router-dom";
import { DashboardShell, OpenRidePageFrame } from "@/openride/shared/layouts";
import { handleOpenRideRouteClick, preventDefaultSubmit } from "@/openride/shared/navigation";
import { SearchFiltersBar, SearchResultsContent, SearchResultsHeader } from "./components";

const SearchResultsPage = () => {
  const navigate = useNavigate();

  return (
    <OpenRidePageFrame
      bodyClassName="w-full min-h-screen flex flex-col md:flex-row bg-brand-background overflow-hidden"
      className="openride-theme-search"
      onClickCapture={(event) => {
        handleOpenRideRouteClick(event, navigate);
      }}
      onSubmitCapture={preventDefaultSubmit}
      pageId="search-results"
      title="Ride Sharing - Résultats de Recherche"
    >
      <DashboardShell activeItem="searchResults">
        <main className="flex-1 flex flex-col overflow-hidden">
          <SearchResultsHeader />
          <SearchFiltersBar />
          <SearchResultsContent />
        </main>
      </DashboardShell>
    </OpenRidePageFrame>
  );
};

export default SearchResultsPage;
