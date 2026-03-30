import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { AuthShell, OpenRidePageFrame } from "@/openride/shared/layouts";
import { preventDefaultSubmit, preventHashAnchor } from "@/openride/shared/navigation";
import { type OpenRideFixedThemeId } from "@/openride/shared/theme";
import { useAuth } from "@/openride/shared/auth";
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
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signIn, signUp, user } = useAuth();

  useEffect(() => {
    syncHubAuthView(rootRef.current, view);
  }, [view]);

  useEffect(() => {
    if (user) {
      navigate("/search-results", { replace: true });
    }
  }, [navigate, user]);

  const handleAuthSubmit = async (action: "login" | "signup", form: HTMLFormElement) => {
    const formData = new FormData(form);
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "").trim();

    if (!email || !password) {
      toast.error("Email et mot de passe requis");
      return;
    }

    setLoading(true);

    if (action === "login") {
      const { error } = await signIn(email, password);
      setLoading(false);
      if (error) {
        toast.error(error.message || "Erreur de connexion");
        return;
      }
      toast.success("Connexion réussie !");
      navigate("/search-results");
      return;
    }

    const firstName = String(formData.get("firstName") ?? "").trim();
    const lastName = String(formData.get("lastName") ?? "").trim();
    const passwordConfirmation = String(formData.get("passwordConfirmation") ?? "").trim();

    if (password !== passwordConfirmation) {
      setLoading(false);
      toast.error("Les mots de passe ne correspondent pas");
      return;
    }

    const { error } = await signUp(email, password, {
      first_name: firstName,
      last_name: lastName,
    });
    setLoading(false);
    if (error) {
      toast.error(error.message || "Erreur lors de l'inscription");
      return;
    }
    toast.success("Compte créé !");
    navigate("/setup-profile");
  };

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
          if (loading) {
            return;
          }
          const form = rootRef.current?.querySelector<HTMLFormElement>(
            `[data-openride-auth-form="${submitAction}"]`,
          );

          if (!form) {
            return;
          }

          handleAuthSubmit(submitAction, form);
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
