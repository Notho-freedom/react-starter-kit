import { useNavigate } from "react-router-dom";
import { AuthShell, OpenRidePageFrame } from "@/openride/shared/layouts";
import {
  handleOpenRideRouteClick,
  preventDefaultSubmit,
  preventHashAnchor,
} from "@/openride/shared/navigation";
import { SetupProfileFormPanel, SetupProfileVisualPanel } from "./components";

const SetupProfilePage = () => {
  const navigate = useNavigate();

  return (
    <OpenRidePageFrame
      bodyClassName="w-full min-h-screen flex items-center justify-center p-4 sm:p-8 bg-[#f1f5f9]"
      className="openride-theme-setup-light"
      onClickCapture={(event) => {
        preventHashAnchor(event);
        handleOpenRideRouteClick(event, navigate);
      }}
      onSubmitCapture={preventDefaultSubmit}
      pageId="setup-profile"
      title="Account Setup"
    >
      <AuthShell
        className="bg-white"
        formPanel={<SetupProfileFormPanel />}
        visualPanel={<SetupProfileVisualPanel />}
      />
    </OpenRidePageFrame>
  );
};

export default SetupProfilePage;
