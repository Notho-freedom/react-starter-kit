import { cn } from "@/lib/utils";
import { useOpenRideTheme } from "@/openride/shared/theme";

const ThemeSettingsSection = () => {
  const { themeId, themes, setTheme } = useOpenRideTheme();

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-lg font-medium text-white">Thème de l'application</h3>
          <p className="mt-1 text-sm text-gray-400">
            Le thème choisi s&apos;applique immédiatement à tous les écrans OpenRide sur cet appareil.
          </p>
        </div>
        <span className="inline-flex w-fit rounded-full border border-brand-success/20 bg-brand-success/10 px-3 py-1 text-xs font-medium text-brand-success">
          Sauvegarde automatique
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {themes.map((theme) => {
          const isActive = theme.id === themeId;

          return (
            <button
              key={theme.id}
              type="button"
              data-openride-theme-option={theme.id}
              aria-pressed={isActive}
              className={cn(
                "rounded-2xl border p-4 text-left transition-all",
                isActive
                  ? "border-brand-accentGreen bg-brand-surfaceLight shadow-[0_0_0_1px_rgba(163,240,163,0.18)]"
                  : "border-white/10 bg-brand-surface hover:bg-brand-surfaceLight hover:border-white/20",
              )}
              onClick={() => setTheme(theme.id)}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-white">{theme.label}</p>
                  <p className="mt-1 text-xs leading-relaxed text-gray-400">{theme.description}</p>
                </div>
                <span
                  className={cn(
                    "rounded-full px-2.5 py-1 text-[11px] font-medium",
                    isActive
                      ? "bg-brand-accentGreen/20 text-brand-accentGreen"
                      : "bg-white/5 text-gray-400",
                  )}
                >
                  {isActive ? "Actif" : "Choisir"}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-4 gap-2">
                {theme.previewColors.map((color, index) => (
                  <span
                    key={`${theme.id}-${index}`}
                    aria-hidden="true"
                    className="h-10 rounded-xl border border-white/10"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default ThemeSettingsSection;
