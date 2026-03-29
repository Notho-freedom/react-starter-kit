const MyTripsToolbar = () => (
  <>
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-2">
        {/* Tabs */}
        <div className="flex items-center gap-6 border-b border-white/10 w-full sm:w-auto">
          <button className="pb-3 px-1 text-sm font-medium tab-active">À venir (2)</button>
          <button className="pb-3 px-1 text-sm font-medium tab-inactive">Passés (15)</button>
          <button className="pb-3 px-1 text-sm font-medium tab-inactive">Annulés (1)</button>
        </div>
        {/* Role Toggle */}
        <div className="bg-brand-surfaceLight p-1 rounded-lg border border-white/5 flex items-center w-full sm:w-auto self-start">
          <button className="flex-1 sm:flex-none px-6 py-2 rounded-md text-sm font-medium transition-colors toggle-active">
            Passager
          </button>
          <button className="flex-1 sm:flex-none px-6 py-2 rounded-md text-sm font-medium transition-colors toggle-inactive hover:text-white">
            Conducteur
          </button>
        </div>
      </div>
  </>
);

export default MyTripsToolbar;
