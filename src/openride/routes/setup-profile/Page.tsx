import { useNavigate } from "react-router-dom";
import { AuthShell, OpenRidePageFrame } from "@/openride/shared/layouts";
import {
  handleOpenRideRouteClick,
  preventDefaultSubmit,
  preventHashAnchor,
} from "@/openride/shared/navigation";
import { type OpenRideFixedThemeId } from "@/openride/shared/theme";
import { SetupProfileFormPanel, SetupProfileVisualPanel } from "./components";

const setupThemeId: OpenRideFixedThemeId = "setup-light";

const SetupProfilePage = () => {
  const navigate = useNavigate();

  return (
    <OpenRidePageFrame
      bodyClassName="flex min-h-screen w-full items-center justify-center bg-brand-background p-4 sm:p-8"
      fixedThemeId={setupThemeId}
      onClickCapture={(event) => {
        preventHashAnchor(event);
        handleOpenRideRouteClick(event, navigate);
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
