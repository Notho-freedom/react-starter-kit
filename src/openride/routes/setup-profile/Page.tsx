import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { AuthShell, OpenRidePageFrame } from "@/openride/shared/layouts";
import {
  handleOpenRideRouteClick,
  preventDefaultSubmit,
  preventHashAnchor,
} from "@/openride/shared/navigation";
import { type OpenRideFixedThemeId } from "@/openride/shared/theme";
import { useAuth } from "@/openride/shared/auth";
import { useUpdateProfile } from "@/integrations/supabase/hooks";
import { SetupProfileFormPanel, SetupProfileVisualPanel } from "./components";

const setupThemeId: OpenRideFixedThemeId = "setup-light";

const SetupProfilePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const updateProfile = useUpdateProfile();

  return (
    <OpenRidePageFrame
      bodyClassName="flex min-h-screen w-full items-center justify-center bg-brand-background p-4 sm:p-8"
      fixedThemeId={setupThemeId}
      onClickCapture={(event) => {
        preventHashAnchor(event);
        if (handleOpenRideRouteClick(event, navigate)) {
          return;
        }

        const target = event.target as HTMLElement | null;
        const action =
          target?.closest<HTMLElement>("[data-openride-setup-action]")?.dataset.openrideSetupAction;

        if (action !== "skip" && action !== "continue") {
          return;
        }

        event.preventDefault();
        const form = document.querySelector<HTMLFormElement>('[data-openride-setup-form="profile"]');
        const formData = form ? new FormData(form) : new FormData();
        const phone = `${String(formData.get("phoneCountryCode") ?? "").replace(/\s*\(.+\)\s*/g, "").trim()} ${String(formData.get("phone") ?? "").trim()}`.trim();

        const profileData = {
          first_name: String(formData.get("firstName") ?? "").trim() || undefined,
          last_name: String(formData.get("lastName") ?? "").trim() || undefined,
          phone: phone || undefined,
          currency: String(formData.get("currency") ?? "").trim() || undefined,
          language: String(formData.get("language") ?? "").trim() || undefined,
          emergency_contact_name: String(formData.get("emergencyContactName") ?? "").trim() || undefined,
          emergency_contact_phone: String(formData.get("emergencyContactPhone") ?? "").trim() || undefined,
          email: user?.email,
        };

        updateProfile.mutate(profileData, {
          onSuccess: () => {
            toast.success("Profil mis à jour !");
            navigate("/trust-center");
          },
          onError: (error) => {
            toast.error(error.message || "Erreur lors de la mise à jour du profil");
          },
        });
      }}
      onSubmitCapture={preventDefaultSubmit}
      pageId="setup-profile"
      title="Account Setup"
    >
      <AuthShell
        formPanel={<SetupProfileFormPanel />}
        visualPanel={<SetupProfileVisualPanel />}
      />
    </OpenRidePageFrame>
  );
};

export default SetupProfilePage;
