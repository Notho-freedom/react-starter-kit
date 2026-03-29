import { useNavigate } from "react-router-dom";
import { AuthShell, OpenRidePageFrame } from "@/openride/shared/layouts";
import {
  handleOpenRideRouteClick,
  preventDefaultSubmit,
  preventHashAnchor,
} from "@/openride/shared/navigation";
import { type OpenRideFixedThemeId } from "@/openride/shared/theme";
import { useOpenRideWorkflow } from "@/openride/shared/workflows";
import { SetupProfileFormPanel, SetupProfileVisualPanel } from "./components";

const setupThemeId: OpenRideFixedThemeId = "setup-light";

const SetupProfilePage = () => {
  const navigate = useNavigate();
  const workflow = useOpenRideWorkflow();

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

        workflow.completeSetupProfile({
          currency: String(formData.get("currency") ?? "").trim() || workflow.user?.currency,
          emergencyContactName:
            String(formData.get("emergencyContactName") ?? "").trim() ||
            workflow.user?.emergencyContactName,
          emergencyContactPhone:
            String(formData.get("emergencyContactPhone") ?? "").trim() ||
            workflow.user?.emergencyContactPhone,
          firstName: String(formData.get("firstName") ?? "").trim() || workflow.user?.firstName,
          language: String(formData.get("language") ?? "").trim() || workflow.user?.language,
          lastName: String(formData.get("lastName") ?? "").trim() || workflow.user?.lastName,
          phone: phone || workflow.user?.phone,
        });
        navigate("/trust-center");
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
