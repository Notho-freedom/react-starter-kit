import { useEffect, useRef, useState } from "react";
import { AuthShell, OpenRidePageFrame } from "@/openride/shared/layouts";
import { preventDefaultSubmit, preventHashAnchor } from "@/openride/shared/navigation";
import { type OpenRideFixedThemeId } from "@/openride/shared/theme";
import { AuthFormsPanel, AuthVisualPanel } from "./components";

const authThemeId: OpenRideFixedThemeId = "auth-light";

function syncSimpleAuthView(root: HTMLDivElement | null, view: "login" | "signup") {
  if (!root) {
    return;
  }

  root.querySelector<HTMLElement>("#login-view")?.classList.toggle("hidden", view !== "login");
  root.querySelector<HTMLElement>("#signup-view")?.classList.toggle("hidden", view !== "signup");
}

const AuthPage = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<"login" | "signup">("login");

  useEffect(() => {
    syncSimpleAuthView(rootRef.current, view);
  }, [view]);

  return (
    <OpenRidePageFrame
      bodyClassName="w-full min-h-screen flex items-center justify-center bg-brand-background p-4 sm:p-8"
      fixedThemeId={authThemeId}
      onClickCapture={(event) => {
        preventHashAnchor(event);
        const target = event.target as HTMLElement | null;
        const toggle = target?.closest<HTMLElement>("[data-openride-toggle]")?.dataset.openrideToggle;

        if (toggle === "login" || toggle === "signup") {
          event.preventDefault();
          setView(toggle);
        }
      }}
      onSubmitCapture={preventDefaultSubmit}
      pageId="auth"
      title="Rideshare Login & Registration"
    >
      <AuthShell
        formPanel={<div ref={rootRef} className="contents"><AuthFormsPanel /></div>}
        visualPanel={<AuthVisualPanel />}
      />
    </OpenRidePageFrame>
  );
};

export default AuthPage;
