import { OpenRideIcon } from "@/openride/shared/icons";

const PublishTripFormSections = () => (
  <>
    <div className="lg:col-span-8 flex flex-col gap-8">
        {/* Route Section */}
        <section id="route-section" className="glass-card rounded-3xl p-6 md:p-8">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <OpenRideIcon name="map-location-dot" className="text-brand-accentGreen" /> Itinéraire
          </h2>
          <div className="space-y-6 relative">
            {/* Vertical Line connecting dots */}
            <div className="absolute left-6 top-10 bottom-10 w-0.5 bg-gray-700 hidden md:block" />
            {/* From */}
            <div className="flex flex-col md:flex-row gap-4 items-start relative z-10">
              <div className="w-12 h-12 rounded-full bg-brand-surface border border-gray-700 flex items-center justify-center shrink-0 hidden md:flex">
                <div className="w-3 h-3 rounded-full bg-brand-accentGreen" />
              </div>
              <div className="flex-1 w-full">
                <label className="block text-sm font-medium text-brand-textMuted mb-2">Départ</label>
                <div className="relative">
                  <OpenRideIcon name="location-dot" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="text" className="w-full input-field rounded-xl pl-10 pr-4 py-3" placeholder="Ville de départ (ex: Paris)" />
                </div>
              </div>
            </div>
            {/* Intermediate Stops (Dynamic) */}
            <div id="stops-container" className="space-y-4 ml-0 md:ml-16">
              <button type="button" className="text-sm text-brand-accentGreen hover:text-white font-medium flex items-center gap-2 transition-colors">
                <OpenRideIcon name="circle-plus" /> Ajouter une étape (optionnel)
              </button>
            </div>
            {/* To */}
            <div className="flex flex-col md:flex-row gap-4 items-start relative z-10">
              <div className="w-12 h-12 rounded-full bg-brand-surface border border-gray-700 flex items-center justify-center shrink-0 hidden md:flex">
                <div className="w-3 h-3 rounded-full border-2 border-brand-accentYellow" />
              </div>
              <div className="flex-1 w-full">
                <label className="block text-sm font-medium text-brand-textMuted mb-2">Arrivée</label>
                <div className="relative">
                  <OpenRideIcon name="location-dot" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="text" className="w-full input-field rounded-xl pl-10 pr-4 py-3" placeholder="Ville d'arrivée (ex: Lyon)" />
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Date & Time Section */}
        <section id="datetime-section" className="glass-card rounded-3xl p-6 md:p-8">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <OpenRideIcon name="calendar" className="text-brand-accentGreen" /> Date et Heure
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-brand-textMuted mb-2">Date de départ</label>
              <div className="relative">
                <OpenRideIcon name="calendar" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="date" className="w-full input-field rounded-xl pl-10 pr-4 py-3 text-white [color-scheme:dark]" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-textMuted mb-2">Heure de départ</label>
              <div className="relative">
                <OpenRideIcon name="clock" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="time" className="w-full input-field rounded-xl pl-10 pr-4 py-3 text-white [color-scheme:dark]" />
              </div>
            </div>
          </div>
        </section>
        {/* Seats & Price Section */}
        <section id="seats-price-section" className="glass-card rounded-3xl p-6 md:p-8">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <OpenRideIcon name="users" className="text-brand-accentGreen" /> Places et Prix
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Seats */}
            <div>
              <label className="block text-sm font-medium text-brand-textMuted mb-4">Places disponibles</label>
              <div className="flex items-center gap-4 bg-brand-surface rounded-xl p-2 border border-gray-700 w-fit">
                <button className="w-10 h-10 rounded-lg flex items-center justify-center text-brand-textMuted hover:text-white hover:bg-gray-700 transition-colors">
                  <OpenRideIcon name="minus" />
                </button>
                <span className="text-white font-bold text-xl w-8 text-center">3</span>
                <button className="w-10 h-10 rounded-lg flex items-center justify-center text-brand-textMuted hover:text-white hover:bg-gray-700 transition-colors">
                  <OpenRideIcon name="plus" />
                </button>
              </div>
              <p className="text-xs text-brand-textMuted mt-2">Maximum 4 places pour votre confort.</p>
            </div>
            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-brand-textMuted mb-4">Prix par place</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white font-bold text-lg">€</span>
                <input type="number" className="w-full input-field rounded-xl pl-8 pr-4 py-3 text-lg font-bold" defaultValue={35.00} step="0.50" />
              </div>
              <div className="mt-3 flex items-start gap-2 text-xs text-brand-accentYellow bg-brand-accentYellow/10 p-3 rounded-lg border border-brand-accentYellow/20">
                <OpenRideIcon name="lightbulb" className="mt-0.5" />
                <p>Prix suggéré pour ce trajet : entre 30€ et 42€ selon notre algorithme.</p>
              </div>
            </div>
          </div>
        </section>
        {/* Vehicle & Rules Section */}
        <section id="vehicle-rules-section" className="glass-card rounded-3xl p-6 md:p-8">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <OpenRideIcon name="car" className="text-brand-accentGreen" /> Véhicule &amp; Options
          </h2>
          {/* Vehicle Selection */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-brand-textMuted mb-4">Véhicule utilisé</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="flex items-center gap-4 p-4 rounded-2xl border border-brand-accentGreen bg-brand-surfaceLight cursor-pointer transition-colors relative">
                <div className="absolute top-0 right-0 bg-brand-accentGreen text-brand-dark text-[10px] font-bold px-2 py-1 rounded-bl-lg rounded-tr-xl">ACTUEL</div>
                <input type="radio" name="vehicle" className="custom-radio" defaultChecked />
                <div>
                  <p className="text-white font-medium">Peugeot 3008</p>
                  <p className="text-sm text-brand-textMuted">Gris • AB-123-CD</p>
                </div>
              </label>
              <label className="flex items-center gap-4 p-4 rounded-2xl border border-gray-700 bg-brand-surface hover:bg-brand-surfaceLight cursor-pointer transition-colors border-dashed flex justify-center text-brand-textMuted hover:text-white">
                <OpenRideIcon name="plus" /> Ajouter un véhicule
              </label>
            </div>
          </div>
          {/* Rules Toggles */}
          <div>
            <label className="block text-sm font-medium text-brand-textMuted mb-4">Règles du trajet</label>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-brand-surface rounded-xl border border-gray-700">
                <div className="flex items-center gap-3">
                  <OpenRideIcon name="smoking" className="text-gray-400" />
                  <span className="text-white font-medium">Fumeur autorisé</span>
                </div>
                <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                  <input type="checkbox" name="toggle" id="toggle-smoking" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer transition-transform duration-200 ease-in-out border-gray-600" />
                  <label htmlFor="toggle-smoking" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-600 cursor-pointer transition-colors duration-200 ease-in-out" />
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-brand-surface rounded-xl border border-gray-700">
                <div className="flex items-center gap-3">
                  <OpenRideIcon name="paw" className="text-gray-400" />
                  <span className="text-white font-medium">Animaux acceptés</span>
                </div>
                <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                  <input type="checkbox" name="toggle" id="toggle-pets" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer transition-transform duration-200 ease-in-out border-gray-600" />
                  <label htmlFor="toggle-pets" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-600 cursor-pointer transition-colors duration-200 ease-in-out" />
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-brand-surface rounded-xl border border-gray-700">
                <div className="flex items-center gap-3">
                  <OpenRideIcon name="suitcase" className="text-gray-400" />
                  <span className="text-white font-medium">Gros bagages</span>
                </div>
                <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                  <input type="checkbox" name="toggle" id="toggle-luggage" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer transition-transform duration-200 ease-in-out border-gray-600" defaultChecked />
                  <label htmlFor="toggle-luggage" className="toggle-label block overflow-hidden h-6 rounded-full bg-brand-accentGreen cursor-pointer transition-colors duration-200 ease-in-out" />
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Instructions Section */}
        <section id="instructions-section" className="glass-card rounded-3xl p-6 md:p-8">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <OpenRideIcon name="circle-info" className="text-brand-accentGreen" /> Instructions &amp; Détails
          </h2>
          <div>
            <label className="block text-sm font-medium text-brand-textMuted mb-2">Instructions de point de rendez-vous (Optionnel)</label>
            <textarea className="w-full input-field rounded-xl px-4 py-3 h-24 resize-none" placeholder="Précisez le lieu exact de rendez-vous (ex: Devant la gare, côté sud...)" defaultValue={""} />
          </div>
        </section>
      </div>
  </>
);

export default PublishTripFormSections;
