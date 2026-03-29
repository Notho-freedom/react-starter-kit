import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardShell, OpenRidePageFrame } from "@/openride/shared/layouts";
import { handleOpenRideRouteClick, preventDefaultSubmit } from "@/openride/shared/navigation";
import { useOpenRideWorkflow } from "@/openride/shared/workflows";
import { ProfileSettingsContent, ProfileSettingsHeader } from "./components";

const ProfileSettingsPage = () => {
  const navigate = useNavigate();
  const rootRef = useRef<HTMLDivElement>(null);
  const workflow = useOpenRideWorkflow();

  return (
    <OpenRidePageFrame
      bodyClassName="w-full min-h-screen flex flex-col md:flex-row bg-brand-background overflow-hidden font-sans text-brand-text"
      onClickCapture={(event) => {
        if (handleOpenRideRouteClick(event, navigate)) {
          return;
        }

        const target = event.target as HTMLElement | null;
        const action =
          target?.closest<HTMLElement>("[data-openride-profile-action]")?.dataset.openrideProfileAction;

        if (action !== "save") {
          return;
        }

        event.preventDefault();
        const readFieldValue = (name: string) =>
          rootRef.current?.querySelector<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(
            `[name="${name}"]`,
          )?.value ?? "";

        workflow.updateProfile({
          bio: readFieldValue("bio") || workflow.user?.bio,
          birthDate: readFieldValue("birthDate") || workflow.user?.birthDate,
          email: readFieldValue("email") || workflow.user?.email,
          firstName: readFieldValue("firstName") || workflow.user?.firstName,
          gender: readFieldValue("gender") || workflow.user?.gender,
          lastName: readFieldValue("lastName") || workflow.user?.lastName,
          phone: readFieldValue("phone") || workflow.user?.phone,
        });
      }}
      onSubmitCapture={preventDefaultSubmit}
      pageId="profile-settings"
      title="Ride Sharing - Profil & Paramètres"
    >
      <DashboardShell activeItem="profileSettings" mobileMenuTone="surfaceLight">
        <main ref={rootRef} className="flex h-full min-h-0 flex-1 flex-col overflow-hidden">
          <ProfileSettingsHeader />
          <ProfileSettingsContent />
        </main>
      </DashboardShell>
    </OpenRidePageFrame>
  );
};

export default ProfileSettingsPage;
