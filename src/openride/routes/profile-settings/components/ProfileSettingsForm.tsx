import { OpenRideIcon } from "@/openride/shared/icons";
import ThemeSettingsSection from "./ThemeSettingsSection";

const ProfileSettingsForm = () => (
  <>
    <div className="flex-1 max-w-3xl">
      <div className="glass-card rounded-2xl p-8">
          <div className="mb-8 border-b border-white/10 pb-6">
            <h2 className="text-2xl font-bold text-white mb-2">Informations personnelles</h2>
            <p className="text-sm text-gray-400">Mettez à jour vos informations de base et votre bio visible publiquement.</p>
          </div>
          <form className="space-y-8">
            {/* Basic Info Section */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Prénom</label>
                  <input type="text" defaultValue="Ronald" className="w-full input-field rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-accentPurple/50" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Nom</label>
                  <input type="text" defaultValue="Richards" className="w-full input-field rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-accentPurple/50" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Adresse Email</label>
                <div className="relative">
                  <OpenRideIcon name="envelope" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input type="email" defaultValue="ronald.richards@example.com" className="w-full input-field rounded-xl pl-11 pr-4 py-3 text-sm focus:ring-2 focus:ring-brand-accentPurple/50" />
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
                  <input type="tel" defaultValue="6 12 34 56 78" className="flex-1 input-field rounded-r-xl rounded-l-none px-4 py-3 text-sm focus:ring-2 focus:ring-brand-accentPurple/50" />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-brand-success flex items-center gap-1">
                    <OpenRideIcon name="circle-check" /> Vérifié
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Date de naissance</label>
                  <input type="date" defaultValue="1995-08-15" className="w-full input-field rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-accentPurple/50 text-gray-300 [color-scheme:dark]" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Genre</label>
                  <select defaultValue="male" className="w-full input-field rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-accentPurple/50 appearance-none">
                    <option value="male">Homme</option>
                    <option value="female">Femme</option>
                    <option value="other">Autre / Préfère ne pas dire</option>
                  </select>
                </div>
              </div>
            </div>
            <hr className="border-white/10" />
            {/* Public Bio Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-white">Profil Public</h3>
              <p className="text-sm text-gray-400 mb-4">Ces informations seront visibles par les autres utilisateurs lorsqu'ils consulteront vos trajets.</p>
              <div className="space-y-2">
                <div className="flex justify-between items-end">
                  <label className="text-sm font-medium text-gray-300">Mini Bio</label>
                  <span className="text-xs text-gray-500">124/300</span>
                </div>
                <textarea rows={4} className="w-full input-field rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-accentPurple/50 resize-none" defaultValue={"Bonjour ! Je m'appelle Ronald, je fais régulièrement le trajet Paris-Lyon pour le travail. J'aime discuter de musique et de cinéma, mais j'apprécie aussi les trajets calmes. Au plaisir de voyager avec vous !"} />
              </div>
              <div className="space-y-4 pt-2">
                <label className="text-sm font-medium text-gray-300">Préférences de voyage</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-brand-surface border border-white/5">
                    <div className="flex items-center gap-3 text-gray-300">
                      <OpenRideIcon name="music" className="text-lg w-6 text-center" />
                      <span className="text-sm">Musique en voiture</span>
                    </div>
                    <div className="w-10 h-5 bg-brand-accentPurple rounded-full relative cursor-pointer">
                      <div className="absolute right-1 top-0.5 w-4 h-4 bg-white rounded-full" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-brand-surface border border-white/5">
                    <div className="flex items-center gap-3 text-gray-300">
                      <OpenRideIcon name="smoking" className="text-lg w-6 text-center" />
                      <span className="text-sm">Fumeur toléré</span>
                    </div>
                    <div className="w-10 h-5 bg-gray-600 rounded-full relative cursor-pointer">
                      <div className="absolute left-1 top-0.5 w-4 h-4 bg-white rounded-full" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-brand-surface border border-white/5">
                    <div className="flex items-center gap-3 text-gray-300">
                      <OpenRideIcon name="paw" className="text-lg w-6 text-center" />
                      <span className="text-sm">Animaux acceptés</span>
                    </div>
                    <div className="w-10 h-5 bg-brand-accentPurple rounded-full relative cursor-pointer">
                      <div className="absolute right-1 top-0.5 w-4 h-4 bg-white rounded-full" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-brand-surface border border-white/5">
                    <div className="flex items-center gap-3 text-gray-300">
                      <OpenRideIcon name="comments" className="text-lg w-6 text-center" />
                      <span className="text-sm">Discussion</span>
                    </div>
                    <select defaultValue="Normal" className="bg-transparent border-none text-sm text-white focus:ring-0 w-24 text-right appearance-none cursor-pointer">
                      <option className="bg-brand-surfaceLight">Bavard</option>
                      <option className="bg-brand-surfaceLight">Normal</option>
                      <option className="bg-brand-surfaceLight">Silencieux</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <hr className="border-white/10" />
            <ThemeSettingsSection />
            {/* Save Actions */}
            <div className="pt-6 mt-8 border-t border-white/10 flex flex-col-reverse sm:flex-row justify-end gap-4">
              <button type="button" className="px-6 py-3 rounded-xl border border-white/10 text-white text-sm font-medium hover:bg-white/5 transition-colors">
                Annuler
              </button>
              <button type="button" className="px-8 py-3 rounded-xl bg-brand-accentPurple hover:bg-brand-accentPurpleDark text-white text-sm font-medium transition-colors shadow-[0_0_15px_rgba(139,92,246,0.3)]">
                Enregistrer les modifications
              </button>
            </div>
          </form>
        </div>
      </div>
  </>
);

export default ProfileSettingsForm;
