import type {
  MyTripsCollection,
  MyTripsStatusTab,
  TripViewRole,
} from "@/openride/shared/workflows";

type MyTripsToolbarProps = {
  categoryOptions: Array<{ label: string; value: MyTripsCollection }>;
  counts: Partial<Record<MyTripsStatusTab, number>>;
  role: TripViewRole;
  selectedCategory: MyTripsCollection;
  setRole: (role: TripViewRole) => void;
  setSelectedCategory: (collection: MyTripsCollection) => void;
  setTab: (tab: MyTripsStatusTab) => void;
  tab: MyTripsStatusTab;
  tabOptions: Array<{ label: string; value: MyTripsStatusTab }>;
};

function MyTripsToolbar({
  categoryOptions,
  counts,
  role,
  selectedCategory,
  setRole,
  setSelectedCategory,
  setTab,
  tab,
  tabOptions,
}: MyTripsToolbarProps) {
  return (
    <div className="flex flex-col gap-5 pb-2">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="bg-brand-surfaceLight p-1 rounded-lg border border-white/5 flex items-center w-full sm:w-auto self-start">
          <button
            className={`flex-1 sm:flex-none px-6 py-2 rounded-md text-sm font-medium transition-colors ${
              role === "passenger" ? "toggle-active" : "toggle-inactive hover:text-white"
            }`}
            onClick={() => setRole("passenger")}
            type="button"
          >
            Passager
          </button>
          <button
            className={`flex-1 sm:flex-none px-6 py-2 rounded-md text-sm font-medium transition-colors ${
              role === "driver" ? "toggle-active" : "toggle-inactive hover:text-white"
            }`}
            onClick={() => setRole("driver")}
            type="button"
          >
            Conducteur
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {categoryOptions.map((option) => (
            <button
              key={option.value}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                selectedCategory === option.value
                  ? "bg-brand-accentGreen text-brand-dark"
                  : "bg-brand-surface border border-white/10 text-gray-300 hover:text-white"
              }`}
              type="button"
              onClick={() => setSelectedCategory(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-6 border-b border-white/10 w-full overflow-x-auto hide-scroll">
        {tabOptions.map((option) => (
          <button
            key={option.value}
            className={`whitespace-nowrap pb-3 px-1 text-sm font-medium ${
              tab === option.value ? "tab-active" : "tab-inactive"
            }`}
            onClick={() => setTab(option.value)}
            type="button"
          >
            {option.label} ({counts[option.value] ?? 0})
          </button>
        ))}
      </div>
    </div>
  );
}

export default MyTripsToolbar;
