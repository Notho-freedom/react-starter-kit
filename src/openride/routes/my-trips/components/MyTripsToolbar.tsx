import type { TripViewRole, TripViewTab } from "@/openride/shared/workflows";

type MyTripsToolbarProps = {
  counts: Record<TripViewTab, number>;
  role: TripViewRole;
  setRole: (role: TripViewRole) => void;
  setTab: (tab: TripViewTab) => void;
  tab: TripViewTab;
};

function MyTripsToolbar({ counts, role, setRole, setTab, tab }: MyTripsToolbarProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-2">
      <div className="flex items-center gap-6 border-b border-white/10 w-full sm:w-auto">
        {([
          ["upcoming", "À venir"],
          ["past", "Passés"],
          ["cancelled", "Annulés"],
        ] as const).map(([value, label]) => (
          <button
            key={value}
            className={`pb-3 px-1 text-sm font-medium ${tab === value ? "tab-active" : "tab-inactive"}`}
            onClick={() => setTab(value)}
            type="button"
          >
            {label} ({counts[value]})
          </button>
        ))}
      </div>

      <div className="bg-brand-surfaceLight p-1 rounded-lg border border-white/5 flex items-center w-full sm:w-auto self-start">
        <button
          className={`flex-1 sm:flex-none px-6 py-2 rounded-md text-sm font-medium transition-colors ${role === "passenger" ? "toggle-active" : "toggle-inactive hover:text-white"}`}
          onClick={() => setRole("passenger")}
          type="button"
        >
          Passager
        </button>
        <button
          className={`flex-1 sm:flex-none px-6 py-2 rounded-md text-sm font-medium transition-colors ${role === "driver" ? "toggle-active" : "toggle-inactive hover:text-white"}`}
          onClick={() => setRole("driver")}
          type="button"
        >
          Conducteur
        </button>
      </div>
    </div>
  );
}

export default MyTripsToolbar;
