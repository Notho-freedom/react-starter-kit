import {
  DashboardTopBarActionGroup,
  DashboardTopBar,
} from "@/openride/shared/layouts";

const ProfileSettingsHeader = () => (
  <DashboardTopBar
    subtitle="Gérez vos informations personnelles et préférences"
    title="Profil & Paramètres"
    actions={
      <DashboardTopBarActionGroup
        searchPlaceholder="Search settings..."
        searchShortcut="F"
      />
    }
  />
);

export default ProfileSettingsHeader;
