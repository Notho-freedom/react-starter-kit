import { useNavigate } from "react-router-dom";
import { DashboardShell, OpenRidePageFrame } from "@/openride/shared/layouts";
import { handleOpenRideRouteClick, preventDefaultSubmit } from "@/openride/shared/navigation";
import { ProfileSettingsContent, ProfileSettingsHeader } from "./components";

const ProfileSettingsPage = () => {
  const navigate = useNavigate();

  return (
    <OpenRidePageFrame
      bodyClassName="w-full min-h-screen flex flex-col md:flex-row bg-brand-background overflow-hidden font-sans text-brand-text"
      onClickCapture={(event) => {
        handleOpenRideRouteClick(event, navigate);
      }}
      onSubmitCapture={preventDefaultSubmit}
      pageId="profile-settings"
      title="Ride Sharing - Profil & Paramètres"
    >
      <DashboardShell activeItem="profileSettings" mobileMenuTone="surfaceLight">
        <main className="flex-1 flex flex-col overflow-hidden">
          <ProfileSettingsHeader />
          <ProfileSettingsContent />
        </main>
      </DashboardShell>
    </OpenRidePageFrame>
  );
};

export default ProfileSettingsPage;
