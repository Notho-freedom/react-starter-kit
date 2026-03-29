import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { AuthShell, OpenRidePageFrame } from "@/openride/shared/layouts";
import { preventDefaultSubmit, preventHashAnchor } from "@/openride/shared/navigation";
import { type OpenRideFixedThemeId } from "@/openride/shared/theme";
import { useAuth } from "@/openride/shared/auth";
import { AuthFormsPanel, AuthVisualPanel } from "./components";

const authThemeId: OpenRideFixedThemeId = "auth-light";

function syncSimpleAuthView(root: HTMLDivElement | null, view: "login" | "signup") {
  if (!root) return;
  root.querySelector<HTMLElement>("#login-view")?.classList.toggle("hidden", view !== "login");
  root.querySelector<HTMLElement>("#signup-view")?.classList.toggle("hidden", view !== "signup");
}

const AuthPage = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<"login" | "signup">("login");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signIn, signUp, signInWithProvider, user } = useAuth();

  useEffect(() => {
    syncSimpleAuthView(rootRef.current, view);
  }, [view]);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/setup-profile", { replace: true });
    }
  }, [user, navigate]);

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
    } else {
      const firstName = String(formData.get("firstName") ?? "").trim();
      const lastName = String(formData.get("lastName") ?? "").trim();
      const passwordConfirm = String(formData.get("passwordConfirmation") ?? "").trim();

      if (password !== passwordConfirm) {
        setLoading(false);
        toast.error("Les mots de passe ne correspondent pas");
        return;
      }

      const { error } = await signUp(email, password, {
        first_name: firstName,
        last_name: lastName,
        phone: String(formData.get("phone") ?? "").trim(),
      });
      setLoading(false);
      if (error) {
        toast.error(error.message || "Erreur lors de l'inscription");
        return;
      }
      toast.success("Compte créé ! Vérifiez votre email pour confirmer.");
      navigate("/setup-profile");
    }
  };

  return (
    <OpenRidePageFrame
      bodyClassName="w-full min-h-screen flex items-center justify-center bg-brand-background p-4 sm:p-8"
      fixedThemeId={authThemeId}
      onClickCapture={(event) => {
        preventHashAnchor(event);
        const target = event.target as HTMLElement | null;
        const toggle = target?.closest<HTMLElement>("[data-openride-toggle]")?.dataset.openrideToggle;
        const submitAction =
          target?.closest<HTMLElement>("[data-openride-auth-submit]")?.dataset.openrideAuthSubmit;

        // Social login buttons
        const socialBtn = target?.closest<HTMLElement>("button");
        if (socialBtn) {
          const icon = socialBtn.querySelector("[data-openride-icon]");
          const iconName = icon?.getAttribute("data-openride-icon");
          if (iconName === "google") {
            event.preventDefault();
            signInWithProvider("google");
            return;
          }
          if (iconName === "apple") {
            event.preventDefault();
            signInWithProvider("apple");
            return;
          }
          if (iconName === "facebook") {
            event.preventDefault();
            signInWithProvider("facebook");
            return;
          }
        }

        if (toggle === "login" || toggle === "signup") {
          event.preventDefault();
          setView(toggle);
          return;
        }

        if (submitAction === "login" || submitAction === "signup") {
          event.preventDefault();
          if (loading) return;
          const form = rootRef.current?.querySelector<HTMLFormElement>(
            `[data-openride-auth-form="${submitAction}"]`,
          );
          if (!form) return;
          handleAuthSubmit(submitAction, form);
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
