import { OpenRideIcon } from "@/openride/shared/icons";
import { useOpenRideWorkflow } from "@/openride/shared/workflows";

const cardClassName = "glass-card rounded-3xl p-6 md:p-8";

const PublishTripFormSections = () => {
  const workflow = useOpenRideWorkflow();
  const isAvailabilityMode = workflow.publishMode === "availability";
  const tripDraft = workflow.publishDraft;
  const availabilityDraft = workflow.availabilityDraft;

  if (isAvailabilityMode) {
    return (
      <div className="lg:col-span-8 flex flex-col gap-8">
        <section className={cardClassName}>
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <OpenRideIcon name="map-location-dot" className="text-brand-accentGreen" /> Zone &
            créneau
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-brand-textMuted mb-2">Zone</label>
              <input
                name="availabilityZone"
                type="text"
                defaultValue={availabilityDraft.zone}
                className="w-full input-field rounded-xl px-4 py-3"
                placeholder="Ville ou zone de départ"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-textMuted mb-2">Date</label>
              <input
                name="availabilityDate"
                type="date"
                defaultValue={availabilityDraft.date}
                className="w-full input-field rounded-xl px-4 py-3 text-white [color-scheme:dark]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-textMuted mb-2">
                Début de disponibilité
              </label>
              <input
                name="availabilityStartTime"
                type="time"
                defaultValue={availabilityDraft.startTime}
                className="w-full input-field rounded-xl px-4 py-3 text-white [color-scheme:dark]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-textMuted mb-2">
                Fin de disponibilité
              </label>
              <input
                name="availabilityEndTime"
                type="time"
                defaultValue={availabilityDraft.endTime}
                className="w-full input-field rounded-xl px-4 py-3 text-white [color-scheme:dark]"
              />
            </div>
          </div>
        </section>

        <section className={cardClassName}>
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <OpenRideIcon name="users" className="text-brand-accentGreen" /> Places & véhicule
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-brand-textMuted mb-4">
                Places disponibles
              </label>
              <div className="flex items-center gap-4 bg-brand-surface rounded-xl p-2 border border-gray-700 w-fit">
                <button
                  data-openride-publish-seat="decrement"
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-brand-textMuted hover:text-white hover:bg-gray-700 transition-colors"
                >
                  <OpenRideIcon name="minus" />
                </button>
                <span className="text-white font-bold text-xl w-8 text-center">
                  {availabilityDraft.seats}
                </span>
                <button
                  data-openride-publish-seat="increment"
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-brand-textMuted hover:text-white hover:bg-gray-700 transition-colors"
                >
                  <OpenRideIcon name="plus" />
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-textMuted mb-2">
                Véhicule
              </label>
              <input
                name="availabilityVehicleName"
                type="text"
                defaultValue={availabilityDraft.vehicleName}
                className="w-full input-field rounded-xl px-4 py-3"
                placeholder="Ex: Toyota RAV4"
              />
            </div>
          </div>
        </section>

        <section className={cardClassName}>
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <OpenRideIcon name="circle-info" className="text-brand-accentGreen" /> Détails de la
            disponibilité
          </h2>
          <textarea
            name="availabilityNotes"
            className="w-full input-field rounded-xl px-4 py-3 h-28 resize-none"
            placeholder="Précisez votre zone, votre flexibilité et les conditions du trajet."
            defaultValue={availabilityDraft.notes}
          />
        </section>
      </div>
    );
  }

  return (
    <div className="lg:col-span-8 flex flex-col gap-8">
      <section id="route-section" className={cardClassName}>
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <OpenRideIcon name="map-location-dot" className="text-brand-accentGreen" /> Itinéraire
        </h2>
        <div className="space-y-6 relative">
          <div className="absolute left-6 top-10 bottom-10 w-0.5 bg-gray-700 hidden md:block" />
          <div className="flex flex-col md:flex-row gap-4 items-start relative z-10">
            <div className="w-12 h-12 rounded-full bg-brand-surface border border-gray-700 flex items-center justify-center shrink-0 hidden md:flex">
              <div className="w-3 h-3 rounded-full bg-brand-accentGreen" />
            </div>
            <div className="flex-1 w-full">
              <label className="block text-sm font-medium text-brand-textMuted mb-2">Départ</label>
              <div className="relative">
                <OpenRideIcon name="location-dot" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  name="departure"
                  type="text"
                  defaultValue={tripDraft.departure}
                  className="w-full input-field rounded-xl pl-10 pr-4 py-3"
                  placeholder="Ville de départ (ex: Paris)"
                />
              </div>
            </div>
          </div>
          <div id="stops-container" className="space-y-4 ml-0 md:ml-16">
            <button type="button" className="text-sm text-brand-accentGreen hover:text-white font-medium flex items-center gap-2 transition-colors">
              <OpenRideIcon name="circle-plus" /> Ajouter une étape (optionnel)
            </button>
          </div>
          <div className="flex flex-col md:flex-row gap-4 items-start relative z-10">
            <div className="w-12 h-12 rounded-full bg-brand-surface border border-gray-700 flex items-center justify-center shrink-0 hidden md:flex">
              <div className="w-3 h-3 rounded-full border-2 border-brand-accentYellow" />
            </div>
            <div className="flex-1 w-full">
              <label className="block text-sm font-medium text-brand-textMuted mb-2">Arrivée</label>
              <div className="relative">
                <OpenRideIcon name="location-dot" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  name="destination"
                  type="text"
                  defaultValue={tripDraft.destination}
                  className="w-full input-field rounded-xl pl-10 pr-4 py-3"
                  placeholder="Ville d'arrivée (ex: Lyon)"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="datetime-section" className={cardClassName}>
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <OpenRideIcon name="calendar" className="text-brand-accentGreen" /> Date et Heure
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-brand-textMuted mb-2">Date de départ</label>
            <div className="relative">
              <OpenRideIcon name="calendar" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                name="date"
                type="date"
                defaultValue={tripDraft.date}
                className="w-full input-field rounded-xl pl-10 pr-4 py-3 text-white [color-scheme:dark]"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-textMuted mb-2">Heure de départ</label>
            <div className="relative">
              <OpenRideIcon name="clock" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                name="time"
                type="time"
                defaultValue={tripDraft.time}
                className="w-full input-field rounded-xl pl-10 pr-4 py-3 text-white [color-scheme:dark]"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="seats-price-section" className={cardClassName}>
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <OpenRideIcon name="users" className="text-brand-accentGreen" /> Places et Prix
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-sm font-medium text-brand-textMuted mb-4">Places disponibles</label>
            <div className="flex items-center gap-4 bg-brand-surface rounded-xl p-2 border border-gray-700 w-fit">
              <button data-openride-publish-seat="decrement" className="w-10 h-10 rounded-lg flex items-center justify-center text-brand-textMuted hover:text-white hover:bg-gray-700 transition-colors">
                <OpenRideIcon name="minus" />
              </button>
              <span className="text-white font-bold text-xl w-8 text-center">{tripDraft.seats}</span>
              <button data-openride-publish-seat="increment" className="w-10 h-10 rounded-lg flex items-center justify-center text-brand-textMuted hover:text-white hover:bg-gray-700 transition-colors">
                <OpenRideIcon name="plus" />
              </button>
            </div>
            <p className="text-xs text-brand-textMuted mt-2">Maximum 4 places pour votre confort.</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-textMuted mb-4">Prix par place</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white font-bold text-lg">€</span>
              <input
                name="price"
                type="number"
                className="w-full input-field rounded-xl pl-8 pr-4 py-3 text-lg font-bold"
                defaultValue={tripDraft.price}
                step="0.50"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="vehicle-rules-section" className={cardClassName}>
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <OpenRideIcon name="car" className="text-brand-accentGreen" /> Véhicule &amp; Options
        </h2>
        <div className="mb-8">
          <label className="block text-sm font-medium text-brand-textMuted mb-4">Véhicule utilisé</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="flex items-center gap-4 p-4 rounded-2xl border border-brand-accentGreen bg-brand-surfaceLight cursor-pointer transition-colors relative">
              <div className="absolute top-0 right-0 bg-brand-accentGreen text-brand-dark text-[10px] font-bold px-2 py-1 rounded-bl-lg rounded-tr-xl">ACTUEL</div>
              <input type="radio" name="vehicle" className="custom-radio" defaultChecked />
              <div>
                <p className="text-white font-medium">{tripDraft.vehicleName}</p>
                <p className="text-sm text-brand-textMuted">Gris • AB-123-CD</p>
              </div>
            </label>
          </div>
        </div>

        <div className="space-y-4">
          {[
            ["smokingAllowed", "smoking", "Fumeur autorisé", tripDraft.smokingAllowed],
            ["petsAllowed", "paw", "Animaux acceptés", tripDraft.petsAllowed],
            ["luggageAllowed", "suitcase", "Gros bagages", tripDraft.luggageAllowed],
          ].map(([name, iconName, label, checked]) => (
            <div
              key={name}
              className="flex items-center justify-between p-4 bg-brand-surface rounded-xl border border-gray-700"
            >
              <div className="flex items-center gap-3">
                <OpenRideIcon
                  name={iconName as "smoking" | "paw" | "suitcase"}
                  className="text-gray-400"
                />
                <span className="text-white font-medium">{label}</span>
              </div>
              <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                <input
                  type="checkbox"
                  name={name}
                  id={`toggle-${name}`}
                  className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer transition-transform duration-200 ease-in-out border-gray-600"
                  defaultChecked={Boolean(checked)}
                />
                <label
                  htmlFor={`toggle-${name}`}
                  className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-600 cursor-pointer transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="instructions-section" className={cardClassName}>
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <OpenRideIcon name="circle-info" className="text-brand-accentGreen" /> Instructions &amp;
          Détails
        </h2>
        <textarea
          name="instructions"
          className="w-full input-field rounded-xl px-4 py-3 h-24 resize-none"
          placeholder="Précisez le lieu exact de rendez-vous."
          defaultValue={tripDraft.instructions}
        />
      </section>
    </div>
  );
};

export default PublishTripFormSections;
