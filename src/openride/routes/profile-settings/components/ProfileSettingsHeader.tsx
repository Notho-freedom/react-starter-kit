import {
  DashboardTopBar,
  DashboardTopBarIconButton,
  DashboardTopBarProfileChip,
  DashboardTopBarSearch,
} from "@/openride/shared/layouts";
import { OpenRideIcon } from "@/openride/shared/icons";

const ProfileSettingsHeader = () => (
  <DashboardTopBar
    subtitle="Gérez vos informations personnelles et préférences"
    title="Profil & Paramètres"
    actions={
      <>
        <DashboardTopBarSearch placeholder="Search settings..." shortcut="F" />
      <div className="flex items-center gap-2">
          <DashboardTopBarIconButton>
          <OpenRideIcon name="moon" className="text-sm" />
          </DashboardTopBarIconButton>
        <button className="px-3 h-9 rounded-lg bg-brand-surface border border-white/10 flex items-center gap-2 text-gray-400 hover:text-white transition-colors relative">
          <OpenRideIcon name="bell" className="text-sm" />
          <span className="bg-brand-error text-white text-[10px] px-1.5 rounded-full">2 New</span>
        </button>
      </div>
        <DashboardTopBarProfileChip name="Ronald R." subtitle="Membre depuis 2023" />
      </>
    }
  />
);

export default ProfileSettingsHeader;
