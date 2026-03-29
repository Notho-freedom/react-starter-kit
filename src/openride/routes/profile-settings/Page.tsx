import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { DashboardShell, OpenRidePageFrame } from "@/openride/shared/layouts";
import { handleOpenRideRouteClick, preventDefaultSubmit } from "@/openride/shared/navigation";
import { useUpdateProfile } from "@/integrations/supabase/hooks";
import { ProfileSettingsContent, ProfileSettingsHeader } from "./components";

const ProfileSettingsPage = () => {
  const navigate = useNavigate();
  const rootRef = useRef<HTMLDivElement>(null);
  const updateProfile = useUpdateProfile();

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

        updateProfile.mutate({
          bio: readFieldValue("bio") || undefined,
          birth_date: readFieldValue("birthDate") || undefined,
          email: readFieldValue("email") || undefined,
          first_name: readFieldValue("firstName") || undefined,
          gender: readFieldValue("gender") || undefined,
          last_name: readFieldValue("lastName") || undefined,
          phone: readFieldValue("phone") || undefined,
        }, {
          onSuccess: () => toast.success("Profil mis à jour !"),
          onError: (err) => toast.error(err.message || "Erreur"),
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
