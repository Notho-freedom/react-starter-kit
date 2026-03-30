import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useOpenRideWorkflow } from "@/openride/shared/workflows";

const MAPBOX_TOKEN = "pk.eyJ1IjoicmF2ZWxtb21vIiwiYSI6ImNtaXZnb3ZjNzBoY3gzZHBmbzhnNDJneDkifQ.RPXItFtVT4sQ5Vlx2GoQIg";

function MapPanel() {
  const navigate = useNavigate();
  const workflow = useOpenRideWorkflow();
  const selectedRide = workflow.selectedRide ?? workflow.searchRides[0];
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [-73.5673, 45.5017], // Montreal default
      zoom: 5,
      attributionControl: false,
    });

    map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), "top-right");

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Update markers when rides change
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Clear existing markers
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    const bounds = new mapboxgl.LngLatBounds();
    let hasCoords = false;

    // Add markers for rides with coordinates (from Supabase)
    workflow.searchRides.forEach((ride) => {
      const lat = ride.departureLat;
      const lng = ride.departureLng;

      if (lat && lng) {
        hasCoords = true;
        const isSelected = ride.id === selectedRide?.id;

        const el = document.createElement("div");
        el.className = `flex flex-col items-center cursor-pointer`;
        el.innerHTML = `
          <div class="px-3 py-1 rounded-full text-xs font-bold text-white mb-1 shadow-lg ${
            isSelected
              ? "bg-[#8B5CF6] border border-purple-400"
              : "bg-[#1E293B] border border-gray-600 opacity-80"
          }">${ride.priceLabel}</div>
          <div class="w-3 h-3 rounded-full ${isSelected ? "bg-[#8B5CF6]" : "bg-gray-400"} border-2 border-white shadow"></div>
        `;
        el.addEventListener("click", () => {
          workflow.setSelectedRide(ride.id);
          navigate("/trip-details");
        });

        const marker = new mapboxgl.Marker({ element: el })
          .setLngLat([lng, lat])
          .addTo(map);
        markersRef.current.push(marker);
        bounds.extend([lng, lat]);
      }
    });

    // If we have real coordinates, fit bounds
    if (hasCoords) {
      map.fitBounds(bounds, { padding: 80, maxZoom: 12 });
    }
  }, [workflow.searchRides, selectedRide?.id, navigate, workflow]);

  return (
    <div className="hidden lg:block w-7/12 xl:w-1/2 relative h-full border-l border-gray-800/50">
      <div ref={mapContainerRef} className="absolute inset-0" />

      {selectedRide ? (
        <div className="absolute bottom-6 left-6 right-6 z-20 pointer-events-none">
          <div className="glass-card rounded-2xl p-4 pointer-events-auto shadow-2xl border-brand-purple/50 flex gap-4 items-center">
            <img
              src={selectedRide.driver.avatar}
              alt={selectedRide.driver.name}
              className="w-14 h-14 rounded-xl border border-brand-purple/30 object-cover"
            />
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-white font-bold">{selectedRide.driver.shortName}</h4>
                  <p className="text-xs text-gray-400">
                    {selectedRide.departureTime} {selectedRide.originCity} → {selectedRide.arrivalTime}{" "}
                    {selectedRide.arrivalLocation}
                  </p>
                </div>
                <span className="text-lg font-bold text-white">{selectedRide.priceLabel}</span>
              </div>
              <div className="flex gap-2 mt-2">
                <span className="text-[10px] bg-brand-green/20 text-brand-green px-2 py-0.5 rounded border border-brand-green/30">
                  {selectedRide.seatsLeft} seats
                </span>
                {selectedRide.preferences.instantBook ? (
                  <span className="text-[10px] bg-brand-accent/20 text-brand-accent px-2 py-0.5 rounded border border-brand-accent/30">
                    Instant Book
                  </span>
                ) : null}
              </div>
            </div>
            <button
              className="bg-brand-purple hover:bg-brand-purpleLight text-white w-10 h-10 rounded-xl flex items-center justify-center transition-colors"
              onClick={() => navigate("/trip-details")}
              type="button"
            >
              →
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default MapPanel;
