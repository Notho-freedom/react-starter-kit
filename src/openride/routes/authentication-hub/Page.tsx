import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthShell, OpenRidePageFrame } from "@/openride/shared/layouts";
import { preventDefaultSubmit, preventHashAnchor } from "@/openride/shared/navigation";
import { type OpenRideFixedThemeId } from "@/openride/shared/theme";
import { useOpenRideWorkflow } from "@/openride/shared/workflows";
import { AuthenticationHubFormsPanel, AuthenticationHubVisualPanel } from "./components";

const authHubThemeId: OpenRideFixedThemeId = "auth-dark";

function syncHubAuthView(root: HTMLDivElement | null, view: "login" | "signup") {
  if (!root) {
    return;
  }

  const loginView = root.querySelector<HTMLElement>("#login-view");
  const signupView = root.querySelector<HTMLElement>("#signup-view");
  const loginButton = root.querySelector<HTMLElement>("#btn-login");
  const signupButton = root.querySelector<HTMLElement>("#btn-signup");

  loginView?.classList.toggle("hidden", view !== "login");
  signupView?.classList.toggle("hidden", view !== "signup");
  loginButton?.classList.toggle("bg-white", view === "login");
  loginButton?.classList.toggle("text-gray-900", view === "login");
  loginButton?.classList.toggle("shadow-sm", view === "login");
  loginButton?.classList.toggle("text-gray-400", view !== "login");
  loginButton?.classList.toggle("hover:text-white", view !== "login");
  signupButton?.classList.toggle("bg-white", view === "signup");
  signupButton?.classList.toggle("text-gray-900", view === "signup");
  signupButton?.classList.toggle("shadow-sm", view === "signup");
  signupButton?.classList.toggle("text-gray-400", view !== "signup");
  signupButton?.classList.toggle("hover:text-white", view !== "signup");
}

const AuthenticationHubPage = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<"login" | "signup">("login");
  const navigate = useNavigate();
  const workflow = useOpenRideWorkflow();

  useEffect(() => {
    syncHubAuthView(rootRef.current, view);
  }, [view]);

  return (
    <OpenRidePageFrame
      bodyClassName="bg-gradient-custom flex min-h-screen w-full items-center justify-center p-4 sm:p-8"
      fixedThemeId={authHubThemeId}
      onClickCapture={(event) => {
        preventHashAnchor(event);
        const target = event.target as HTMLElement | null;
        const toggle = target?.closest<HTMLElement>("[data-openride-toggle]")?.dataset.openrideToggle;
        const submitAction =
          target?.closest<HTMLElement>("[data-openride-auth-submit]")?.dataset.openrideAuthSubmit;

        if (toggle === "login" || toggle === "signup") {
          event.preventDefault();
          setView(toggle);
          return;
        }

        if (submitAction === "login" || submitAction === "signup") {
          event.preventDefault();
          const form = rootRef.current?.querySelector<HTMLFormElement>(
            `[data-openride-auth-form="${submitAction}"]`,
          );

          if (!form) {
            return;
          }

          const formData = new FormData(form);
          const payload = {
            email: String(formData.get("email") ?? "").trim(),
            firstName: String(formData.get("firstName") ?? "").trim(),
            lastName: String(formData.get("lastName") ?? "").trim(),
          };
          const nextRoute =
            submitAction === "login"
              ? workflow.login("premium", payload)
              : workflow.signup("premium", payload);

          navigate(nextRoute);
        }
      }}
      onSubmitCapture={preventDefaultSubmit}
      pageId="authentication-hub"
      title="Authentication Hub - Rideshare"
    >
      <AuthShell
        className="max-w-6xl"
        formPanel={<div ref={rootRef} className="contents"><AuthenticationHubFormsPanel /></div>}
        visualPanel={<AuthenticationHubVisualPanel />}
      />
    </OpenRidePageFrame>
  );
};

export default AuthenticationHubPage;
