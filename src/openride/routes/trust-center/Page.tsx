import { useNavigate } from "react-router-dom";
import { AuthShell, OpenRidePageFrame } from "@/openride/shared/layouts";
import {
  handleOpenRideRouteClick,
  preventDefaultSubmit,
  preventHashAnchor,
} from "@/openride/shared/navigation";
import { type OpenRideFixedThemeId } from "@/openride/shared/theme";
import { TrustCenterContentPanel, TrustCenterVisualPanel } from "./components";

const trustThemeId: OpenRideFixedThemeId = "trust-dark";

const TrustCenterPage = () => {
  const navigate = useNavigate();

  return (
    <OpenRidePageFrame
      bodyClassName="flex min-h-screen w-full items-center justify-center bg-brand-background p-4 sm:p-8"
      fixedThemeId={trustThemeId}
      onClickCapture={(event) => {
        preventHashAnchor(event);
        handleOpenRideRouteClick(event, navigate);
      }}
      onSubmitCapture={preventDefaultSubmit}
      pageId="trust-center"
      title="Trust Center & Verification"
    >
      <AuthShell
        className="max-w-6xl"
        formPanel={<TrustCenterContentPanel />}
        reverseDesktop
        visualPanel={<TrustCenterVisualPanel />}
      />
    </OpenRidePageFrame>
  );
};

export default TrustCenterPage;
