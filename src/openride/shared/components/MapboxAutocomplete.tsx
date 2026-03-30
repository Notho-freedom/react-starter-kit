import { useCallback, useEffect, useRef, useState } from "react";

const MAPBOX_TOKEN = "pk.eyJ1IjoicmF2ZWxtb21vIiwiYSI6ImNtaXZnb3ZjNzBoY3gzZHBmbzhnNDJneDkifQ.RPXItFtVT4sQ5Vlx2GoQIg";

type Suggestion = {
  place_name: string;
  center: [number, number];
  text: string;
  context?: Array<{ id: string; text: string; short_code?: string }>;
};

type MapboxAutocompleteProps = {
  name: string;
  placeholder?: string;
  defaultValue?: string;
  className?: string;
  onSelect?: (place: { name: string; lng: number; lat: number }) => void;
};

// Get user's current position for proximity bias
function useUserLocation() {
  const [coords, setCoords] = useState<{ lng: number; lat: number } | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lng: pos.coords.longitude, lat: pos.coords.latitude });
      },
      () => {
        // Fallback: Montreal center
        setCoords({ lng: -73.5673, lat: 45.5017 });
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 300000 },
    );
  }, []);

  return coords;
}

export function MapboxAutocomplete({
  name,
  placeholder = "Rechercher une adresse...",
  defaultValue = "",
  className = "",
  onSelect,
}: MapboxAutocompleteProps) {
  const [query, setQuery] = useState(defaultValue);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();
  const containerRef = useRef<HTMLDivElement>(null);
  const userLocation = useUserLocation();

  const fetchSuggestions = useCallback(
    async (text: string) => {
      if (text.length < 2) {
        setSuggestions([]);
        return;
      }

      try {
        const proximityParam = userLocation
          ? `&proximity=${userLocation.lng},${userLocation.lat}`
          : "&proximity=ip";

        const res = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(text)}.json` +
            `?access_token=${MAPBOX_TOKEN}` +
            `&autocomplete=true` +
            `&language=fr` +
            `&types=place,locality,address,poi,neighborhood,postcode` +
            `&limit=6` +
            `&country=fr,be,ch,ca,ma,sn,ci,cm,cd` +
            proximityParam,
        );
        const data = await res.json();
        setSuggestions(data.features ?? []);
        setIsOpen(true);
        setSelectedIndex(-1);
      } catch {
        setSuggestions([]);
      }
    },
    [userLocation],
  );

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (s: Suggestion) => {
    setQuery(s.place_name);
    setSuggestions([]);
    setIsOpen(false);
    onSelect?.({
      name: s.place_name,
      lng: s.center[0],
      lat: s.center[1],
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      e.preventDefault();
      handleSelect(suggestions[selectedIndex]);
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  // Extract short context (region/country) for sub-label
  const getSubLabel = (s: Suggestion): string => {
    if (!s.context) return "";
    const region = s.context.find((c) => c.id.startsWith("region"));
    const country = s.context.find((c) => c.id.startsWith("country"));
    return [region?.text, country?.short_code?.toUpperCase()].filter(Boolean).join(", ");
  };

  return (
    <div ref={containerRef} className="relative">
      <input
        name={name}
        type="text"
        value={query}
        placeholder={placeholder}
        className={className}
        autoComplete="off"
        onChange={(e) => {
          const val = e.target.value;
          setQuery(val);
          if (debounceRef.current) clearTimeout(debounceRef.current);
          debounceRef.current = setTimeout(() => fetchSuggestions(val), 250);
        }}
        onFocus={() => {
          if (suggestions.length > 0) setIsOpen(true);
        }}
        onKeyDown={handleKeyDown}
      />
      {isOpen && suggestions.length > 0 && (
        <ul className="absolute z-50 mt-1 w-full rounded-xl border border-gray-700 bg-brand-surfaceLight shadow-2xl max-h-72 overflow-y-auto">
          {suggestions.map((s, i) => {
            const sub = getSubLabel(s);
            return (
              <li
                key={`${s.center[0]}-${s.center[1]}-${i}`}
                className={`px-4 py-3 cursor-pointer transition-colors first:rounded-t-xl last:rounded-b-xl ${
                  i === selectedIndex
                    ? "bg-white/15 text-white"
                    : "text-white hover:bg-white/10"
                }`}
                onMouseDown={() => handleSelect(s)}
                onMouseEnter={() => setSelectedIndex(i)}
              >
                <div className="text-sm font-medium truncate">{s.text}</div>
                {sub && <div className="text-xs text-gray-400 truncate mt-0.5">{sub}</div>}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default MapboxAutocomplete;
