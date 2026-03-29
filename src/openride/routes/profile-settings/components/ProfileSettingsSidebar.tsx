import { useNavigate } from "react-router-dom";
import { OpenRideIcon } from "@/openride/shared/icons";
import { useOpenRideWorkflow } from "@/openride/shared/workflows";
import { useAuth } from "@/openride/shared/auth";

function ProfileSettingsSidebar() {
  const navigate = useNavigate();
  const workflow = useOpenRideWorkflow();
  const { signOut } = useAuth();
  const user = workflow.user;

  return (
    <div className="w-full lg:w-80 flex-shrink-0 flex flex-col gap-6">
      <div className="glass-card rounded-2xl p-6 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-br from-brand-accentPurple/20 to-transparent" />
        <div className="relative z-10">
          <div className="relative inline-block mb-4">
            <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg" alt={user?.fullName ?? "Ronald R."} className="w-24 h-24 rounded-full border-4 border-brand-surfaceLight shadow-xl mx-auto object-cover" />
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-brand-accentPurple rounded-full text-white flex items-center justify-center border-2 border-brand-surfaceLight hover:bg-brand-accentPurpleDark transition-colors">
              <OpenRideIcon name="camera" className="text-xs" />
            </button>
          </div>
          <h2 className="text-xl font-bold text-white mb-1">{user?.fullName ?? "Ronald Richards"}</h2>
          <p className="text-sm text-gray-400 mb-4">
            {user?.city ?? "Paris"}, {user?.country ?? "France"} • {user?.ageLabel ?? "28 ans"}
          </p>
          <div className="flex justify-center gap-4 mb-6">
            <div className="text-center">
              <div className="flex items-center gap-1 text-brand-warning font-semibold text-lg">
                <OpenRideIcon name="star" className="text-sm" /> {user?.rating?.toFixed(1) ?? "4.8"}
              </div>
              <span className="text-xs text-gray-500">{user?.reviewCount ?? 124} Avis</span>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="text-center">
              <div className="text-white font-semibold text-lg">{user?.tripCount ?? 45}</div>
              <span className="text-xs text-gray-500">Trajets</span>
            </div>
          </div>
          <button className="w-full py-2.5 rounded-lg border border-white/10 text-sm font-medium text-white hover:bg-white/5 transition-colors flex items-center justify-center gap-2">
            <OpenRideIcon name="eye" /> Voir le profil public
          </button>
        </div>
      </div>

      <div className="glass-card rounded-2xl p-6">
        <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Niveau de confiance</h3>
        <div className="space-y-4">
          {([
            ["Email", workflow.user?.verification.emailVerified, "circle-check"] as const,
            ["Téléphone", workflow.user?.verification.phoneVerified, "circle-check"] as const,
            ["Pièce d'identité", workflow.user?.verification.idVerified, "id-card"] as const,
          ] as const).map(([label, verified, icon]) => (
            <div key={label} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full ${verified ? "bg-brand-success/10 text-brand-success" : "bg-brand-surface border border-white/10 text-gray-400"} flex items-center justify-center`}>
                  <OpenRideIcon name={icon} className="text-sm" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{label}</p>
                  <p className={`text-xs ${verified ? "text-gray-500" : "text-brand-warning"}`}>{verified ? "Vérifié" : "À vérifier"}</p>
                </div>
              </div>
              {!verified ? (
                <button
                  className="text-xs text-brand-accentPurple hover:text-white transition-colors font-medium"
                  onClick={() => navigate("/trust-center")}
                  type="button"
                >
                  Ajouter
                </button>
              ) : null}
            </div>
          ))}
        </div>
        <div className="mt-6 pt-4 border-t border-white/10">
          <button
            className="text-sm text-brand-accentPurple hover:text-white transition-colors flex items-center gap-2 font-medium"
            onClick={() => navigate("/trust-center")}
            type="button"
          >
            Aller à Vérification &amp; Confiance <OpenRideIcon name="arrow-right" className="text-xs" />
          </button>
        </div>
      </div>

      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="p-2 flex flex-col gap-1">
          <button className="settings-nav-item active flex items-center justify-between px-4 py-3 rounded-lg text-left w-full">
            <div className="flex items-center gap-3">
              <OpenRideIcon name="user" className="w-5 text-center text-gray-400" />
              <span className="text-sm font-medium">Informations personnelles</span>
            </div>
            <OpenRideIcon name="chevron-right" className="text-xs text-gray-500" />
          </button>
          <button className="settings-nav-item flex items-center justify-between px-4 py-3 rounded-lg text-left w-full text-gray-400">
            <div className="flex items-center gap-3">
              <OpenRideIcon name="shield-halved" className="w-5 text-center" />
              <span className="text-sm font-medium">Mot de passe &amp; Sécurité</span>
            </div>
          </button>
          <button className="settings-nav-item flex items-center justify-between px-4 py-3 rounded-lg text-left w-full text-gray-400">
            <div className="flex items-center gap-3">
              <OpenRideIcon name="credit-card" className="w-5 text-center" />
              <span className="text-sm font-medium">Moyens de paiement</span>
            </div>
          </button>
          <button className="settings-nav-item flex items-center justify-between px-4 py-3 rounded-lg text-left w-full text-gray-400">
            <div className="flex items-center gap-3">
              <OpenRideIcon name="bell" className="w-5 text-center" />
              <span className="text-sm font-medium">Notifications</span>
            </div>
          </button>
          <button className="settings-nav-item flex items-center justify-between px-4 py-3 rounded-lg text-left w-full text-gray-400">
            <div className="flex items-center gap-3">
              <OpenRideIcon name="car" className="w-5 text-center" />
              <span className="text-sm font-medium">Mes véhicules</span>
            </div>
          </button>
          <div className="my-2 border-t border-white/5 mx-2" />
          <button className="settings-nav-item flex items-center justify-between px-4 py-3 rounded-lg text-left w-full text-gray-400">
            <div className="flex items-center gap-3">
              <OpenRideIcon name="globe" className="w-5 text-center" />
              <span className="text-sm font-medium">Langue &amp; Région</span>
            </div>
          </button>
          <button className="settings-nav-item flex items-center justify-between px-4 py-3 rounded-lg text-left w-full text-gray-400">
            <div className="flex items-center gap-3">
              <OpenRideIcon name="circle-question" className="w-5 text-center" />
              <span className="text-sm font-medium">Aide &amp; Support</span>
            </div>
          </button>
          <button
            className="mt-4 flex items-center gap-3 px-4 py-3 rounded-lg text-left w-full text-brand-error hover:bg-brand-error/10 transition-colors"
            onClick={() => {
              workflow.logout();
              navigate("/auth");
            }}
            type="button"
          >
            <OpenRideIcon name="arrow-right-from-bracket" className="w-5 text-center" />
            <span className="text-sm font-medium">Déconnexion</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileSettingsSidebar;
