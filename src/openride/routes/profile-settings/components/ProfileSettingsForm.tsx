import { OpenRideIcon } from "@/openride/shared/icons";
import { useOpenRideWorkflow } from "@/openride/shared/workflows";
import ThemeSettingsSection from "./ThemeSettingsSection";

function ProfileSettingsForm() {
  const workflow = useOpenRideWorkflow();
  const user = workflow.user;

  return (
    <div className="flex-1 max-w-3xl">
      <div className="glass-card rounded-2xl p-8">
        <div className="mb-8 border-b border-white/10 pb-6">
          <h2 className="text-2xl font-bold text-white mb-2">Informations personnelles</h2>
          <p className="text-sm text-gray-400">Mettez à jour vos informations de base et votre bio visible publiquement.</p>
        </div>
        <form className="space-y-8">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Prénom</label>
                <input name="firstName" type="text" defaultValue={user?.firstName ?? "Ronald"} className="w-full input-field rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-accentPurple/50" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Nom</label>
                <input name="lastName" type="text" defaultValue={user?.lastName ?? "Richards"} className="w-full input-field rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-accentPurple/50" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Adresse Email</label>
              <div className="relative">
                <OpenRideIcon name="envelope" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input name="email" type="email" defaultValue={user?.email ?? "ronald.richards@example.com"} className="w-full input-field rounded-xl pl-11 pr-4 py-3 text-sm focus:ring-2 focus:ring-brand-accentPurple/50" />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-brand-success flex items-center gap-1">
                  <OpenRideIcon name="circle-check" /> Vérifié
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Numéro de téléphone</label>
              <div className="relative flex">
                <div className="flex items-center justify-center px-4 bg-brand-surface border border-white/10 border-r-0 rounded-l-xl text-sm text-gray-300">
                  +33
                </div>
                <input name="phone" type="tel" defaultValue={user?.phone ?? "6 12 34 56 78"} className="flex-1 input-field rounded-r-xl rounded-l-none px-4 py-3 text-sm focus:ring-2 focus:ring-brand-accentPurple/50" />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-brand-success flex items-center gap-1">
                  <OpenRideIcon name="circle-check" /> Vérifié
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Date de naissance</label>
                <input name="birthDate" type="date" defaultValue={user?.birthDate ?? "1995-08-15"} className="w-full input-field rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-accentPurple/50 text-gray-300 [color-scheme:dark]" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Genre</label>
                <select name="gender" defaultValue={user?.gender ?? "male"} className="w-full input-field rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-accentPurple/50 appearance-none">
                  <option value="male">Homme</option>
                  <option value="female">Femme</option>
                  <option value="other">Autre / Préfère ne pas dire</option>
                </select>
              </div>
            </div>
          </div>
          <hr className="border-white/10" />

          <div className="space-y-6">
            <h3 className="text-lg font-medium text-white">Profil Public</h3>
            <p className="text-sm text-gray-400 mb-4">Ces informations seront visibles par les autres utilisateurs lorsqu&apos;ils consulteront vos trajets.</p>
            <div className="space-y-2">
              <div className="flex justify-between items-end">
                <label className="text-sm font-medium text-gray-300">Mini Bio</label>
                <span className="text-xs text-gray-500">{user?.bio.length ?? 0}/300</span>
              </div>
              <textarea
                name="bio"
                rows={4}
                className="w-full input-field rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-accentPurple/50 resize-none"
                defaultValue={
                  user?.bio ??
                  "Bonjour ! Je fais régulièrement le trajet Paris-Lyon pour le travail. J'aime discuter de musique et de cinéma, mais j'apprécie aussi les trajets calmes."
                }
              />
            </div>
          </div>

          <hr className="border-white/10" />
          <ThemeSettingsSection />

          <div className="pt-6 mt-8 border-t border-white/10 flex flex-col-reverse sm:flex-row justify-end gap-4">
            <button type="button" className="px-6 py-3 rounded-xl border border-white/10 text-white text-sm font-medium hover:bg-white/5 transition-colors">
              Annuler
            </button>
            <button
              type="button"
              data-openride-profile-action="save"
              className="px-8 py-3 rounded-xl bg-brand-accentPurple hover:bg-brand-accentPurpleDark text-white text-sm font-medium transition-colors shadow-[0_0_15px_rgba(139,92,246,0.3)]"
            >
              Enregistrer les modifications
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfileSettingsForm;
