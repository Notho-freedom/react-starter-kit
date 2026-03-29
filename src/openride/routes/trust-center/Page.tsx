import { useNavigate } from "react-router-dom";
import { AuthShell, OpenRidePageFrame } from "@/openride/shared/layouts";
import {
  handleOpenRideRouteClick,
  preventDefaultSubmit,
  preventHashAnchor,
} from "@/openride/shared/navigation";
import { TrustCenterContentPanel, TrustCenterVisualPanel } from "./components";

const TrustCenterPage = () => {
  const navigate = useNavigate();

  return (
    <OpenRidePageFrame
      bodyClassName="w-full min-h-screen flex items-center justify-center p-4 sm:p-8 bg-brand-background"
      className="openride-theme-trust-dark"
      onClickCapture={(event) => {
        preventHashAnchor(event);
        handleOpenRideRouteClick(event, navigate);
      }}
      onSubmitCapture={preventDefaultSubmit}
      pageId="trust-center"
      title="Trust Center & Verification"
    >
      <AuthShell
        className="glass-panel max-w-6xl border border-white/10"
        formPanel={<TrustCenterContentPanel />}
        reverseDesktop
        visualPanel={<TrustCenterVisualPanel />}
      />
    </OpenRidePageFrame>
  );
};

export default TrustCenterPage;
