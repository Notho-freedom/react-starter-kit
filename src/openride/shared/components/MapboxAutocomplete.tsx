import { useCallback, useEffect, useRef, useState } from "react";

const MAPBOX_TOKEN = "pk.eyJ1IjoicmF2ZWxtb21vIiwiYSI6ImNtaXZnb3ZjNzBoY3gzZHBmbzhnNDJneDkifQ.RPXItFtVT4sQ5Vlx2GoQIg";

type Suggestion = {
  place_name: string;
  center: [number, number];
  text: string;
};

type MapboxAutocompleteProps = {
  name: string;
  placeholder?: string;
  defaultValue?: string;
  className?: string;
  onSelect?: (place: { name: string; lng: number; lat: number }) => void;
};

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
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();
  const containerRef = useRef<HTMLDivElement>(null);

  const fetchSuggestions = useCallback(async (text: string) => {
    if (text.length < 2) {
      setSuggestions([]);
      return;
    }

    try {
      const res = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(text)}.json?access_token=${MAPBOX_TOKEN}&autocomplete=true&language=fr&types=place,locality,address&limit=5`
      );
      const data = await res.json();
      setSuggestions(data.features ?? []);
      setIsOpen(true);
    } catch {
      setSuggestions([]);
    }
  }, []);

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
          debounceRef.current = setTimeout(() => fetchSuggestions(val), 300);
        }}
        onFocus={() => {
          if (suggestions.length > 0) setIsOpen(true);
        }}
      />
      {isOpen && suggestions.length > 0 && (
        <ul className="absolute z-50 mt-1 w-full rounded-xl border border-gray-700 bg-brand-surfaceLight shadow-2xl max-h-60 overflow-y-auto">
          {suggestions.map((s, i) => (
            <li
              key={i}
              className="px-4 py-3 text-sm text-white hover:bg-white/10 cursor-pointer transition-colors first:rounded-t-xl last:rounded-b-xl"
              onMouseDown={() => {
                setQuery(s.place_name);
                setSuggestions([]);
                setIsOpen(false);
                onSelect?.({
                  name: s.place_name,
                  lng: s.center[0],
                  lat: s.center[1],
                });
              }}
            >
              {s.place_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MapboxAutocomplete;
