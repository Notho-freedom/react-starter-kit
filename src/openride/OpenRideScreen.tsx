import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import type { OpenRideScreen } from "./screens";

const SURFACE_MENU_CLASSES = [
  "absolute",
  "top-20",
  "left-0",
  "w-full",
  "bg-brand-surface",
  "z-50",
  "border-b",
  "border-gray-800",
  "pb-6",
];

const SURFACE_LIGHT_MENU_CLASSES = [
  "absolute",
  "top-20",
  "left-0",
  "w-full",
  "bg-brand-surfaceLight",
  "z-50",
  "border-b",
  "border-white/10",
  "pb-6",
  "shadow-2xl",
];

function normalizeText(value: string | null | undefined) {
  return (value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function getMenuClasses(screen: OpenRideScreen) {
  if (screen.mobileMenuPreset === "surfaceLight") {
    return SURFACE_LIGHT_MENU_CLASSES;
  }

  return SURFACE_MENU_CLASSES;
}

function getRouteForElement(element: Element) {
  const text = normalizeText(element.textContent);

  if (
    text.includes("rideshare") ||
    text.includes("path wounded") ||
    text.includes("accueil (recherche)") ||
    text.includes("accueil") ||
    text.includes("resultats de recherche")
  ) {
    return "/search-results";
  }

  if (text.includes("publier un trajet")) {
    return "/publish-trip";
  }

  if (text === "messages") {
    return "/messages";
  }

  if (text.includes("mes trajets") || text.includes("my trips")) {
    return "/my-trips";
  }

  if (text.includes("profil") || text.includes("profile settings")) {
    return "/profile-settings";
  }

  if (text.includes("trust center")) {
    return "/trust-center";
  }

  if (text.includes("set up your profile")) {
    return "/setup-profile";
  }

  if (text === "view details") {
    return "/trip-details";
  }

  if (text === "reserver") {
    return "/payment-booking";
  }

  if (text.includes("voir dans mes trajets")) {
    return "/my-trips";
  }

  return null;
}

function setSimpleAuthView(root: HTMLElement, view: "login" | "signup") {
  const loginView = root.querySelector<HTMLElement>("#login-view");
  const signupView = root.querySelector<HTMLElement>("#signup-view");

  if (!loginView || !signupView) {
    return;
  }

  if (view === "signup") {
    loginView.classList.add("hidden");
    signupView.classList.remove("hidden");
    return;
  }

  signupView.classList.add("hidden");
  loginView.classList.remove("hidden");
}

function setHubAuthView(root: HTMLElement, view: "login" | "signup") {
  const loginView = root.querySelector<HTMLElement>("#login-view");
  const signupView = root.querySelector<HTMLElement>("#signup-view");
  const btnLogin = root.querySelector<HTMLElement>("#btn-login");
  const btnSignup = root.querySelector<HTMLElement>("#btn-signup");

  if (!loginView || !signupView || !btnLogin || !btnSignup) {
    return;
  }

  if (view === "signup") {
    loginView.classList.add("hidden");
    signupView.classList.remove("hidden");
    btnSignup.classList.replace("text-gray-400", "text-gray-900");
    btnSignup.classList.replace("hover:text-white", "bg-white");
    btnSignup.classList.add("shadow-sm");
    btnLogin.classList.replace("text-gray-900", "text-gray-400");
    btnLogin.classList.replace("bg-white", "hover:text-white");
    btnLogin.classList.remove("shadow-sm");
    return;
  }

  signupView.classList.add("hidden");
  loginView.classList.remove("hidden");
  btnLogin.classList.replace("text-gray-400", "text-gray-900");
  btnLogin.classList.replace("hover:text-white", "bg-white");
  btnLogin.classList.add("shadow-sm");
  btnSignup.classList.replace("text-gray-900", "text-gray-400");
  btnSignup.classList.replace("bg-white", "hover:text-white");
  btnSignup.classList.remove("shadow-sm");
}

function toggleMobileMenu(root: HTMLElement, screen: OpenRideScreen) {
  const nav = root.querySelector<HTMLElement>("#nav-links");

  if (!nav) {
    return;
  }

  nav.classList.toggle("hidden");
  nav.classList.toggle("flex");

  getMenuClasses(screen).forEach((className) => {
    nav.classList.toggle(className);
  });
}

function syncPaymentSelection(root: HTMLElement, activeRadio?: HTMLInputElement | null) {
  const paymentRadios = root.querySelectorAll<HTMLInputElement>('input[name="payment"]');

  paymentRadios.forEach((radio) => {
    const label = radio.closest("label");
    if (!label) {
      return;
    }

    label.classList.remove("border-brand-accentGreen", "border-gray-700");
    label.classList.add(radio === activeRadio && radio.checked ? "border-brand-accentGreen" : "border-gray-700");
  });
}

function wireScreen(root: HTMLElement, screen: OpenRideScreen, navigate: ReturnType<typeof useNavigate>) {
  const timers = new Set<number>();
  const forms = root.querySelectorAll("form");
  const anchors = root.querySelectorAll<HTMLAnchorElement>("a[href]");

  forms.forEach((form) => {
    form.addEventListener("submit", preventDefault);
  });

  anchors.forEach((anchor) => {
    const route = getRouteForElement(anchor);
    anchor.setAttribute("href", route ?? "#");

    if (route) {
      anchor.dataset.openrideRoute = route;
    } else {
      delete anchor.dataset.openrideRoute;
    }
  });

  if (screen.id === "paymentBooking") {
    const activePayment = root.querySelector<HTMLInputElement>('input[name="payment"]:checked');
    syncPaymentSelection(root, activePayment);
  }

  const handleClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement | null;
    const action = target?.closest<HTMLElement>("a, button, [data-openride-toggle], .seat-btn");

    if (!action || !root.contains(action)) {
      return;
    }

    const toggleTarget = action.dataset.openrideToggle;
    if (toggleTarget === "signup" || toggleTarget === "login") {
      event.preventDefault();

      if (screen.id === "auth") {
        setSimpleAuthView(root, toggleTarget);
      }

      if (screen.id === "authenticationHub") {
        setHubAuthView(root, toggleTarget);
      }

      return;
    }

    if (action.id === "btn-login") {
      event.preventDefault();
      setHubAuthView(root, "login");
      return;
    }

    if (action.id === "btn-signup") {
      event.preventDefault();
      setHubAuthView(root, "signup");
      return;
    }

    if (action.id === "mobile-menu-btn") {
      event.preventDefault();
      toggleMobileMenu(root, screen);
      return;
    }

    if (action.classList.contains("seat-btn") && !action.classList.contains("taken")) {
      event.preventDefault();
      action.classList.toggle("selected");
      return;
    }

    if (action.id === "confirm-btn" && screen.id === "paymentBooking") {
      event.preventDefault();

      const modal = root.querySelector<HTMLElement>("#success-modal");
      const originalText = action.innerHTML;
      action.innerHTML = "Traitement...";
      action.classList.add("opacity-80", "cursor-not-allowed");

      const timer = window.setTimeout(() => {
        action.innerHTML = originalText;
        action.classList.remove("opacity-80", "cursor-not-allowed");
        modal?.classList.remove("hidden");
        modal?.classList.add("flex");
        timers.delete(timer);
      }, 1500);

      timers.add(timer);
      return;
    }

    const route = action.dataset.openrideRoute ?? getRouteForElement(action);
    if (route) {
      event.preventDefault();
      navigate(route);
      return;
    }

    if (action.tagName === "A") {
      event.preventDefault();
    }
  };

  const handleChange = (event: Event) => {
    const target = event.target as HTMLInputElement | null;

    if (screen.id !== "paymentBooking" || !target || target.name !== "payment") {
      return;
    }

    syncPaymentSelection(root, target);
  };

  root.addEventListener("click", handleClick);
  root.addEventListener("change", handleChange);

  return () => {
    root.removeEventListener("click", handleClick);
    root.removeEventListener("change", handleChange);
    forms.forEach((form) => {
      form.removeEventListener("submit", preventDefault);
    });
    timers.forEach((timer) => {
      window.clearTimeout(timer);
    });
  };
}

function preventDefault(event: Event) {
  event.preventDefault();
}

type OpenRideScreenProps = {
  screen: OpenRideScreen;
};

export function OpenRideScreenRenderer({ screen }: OpenRideScreenProps) {
  const navigate = useNavigate();
  const rootRef = useRef<HTMLDivElement>(null);
  const shouldRenderStyles = import.meta.env.MODE !== "test";

  useEffect(() => {
    document.title = screen.documentTitle;
  }, [screen.documentTitle]);

  useEffect(() => {
    if (!rootRef.current) {
      return;
    }

    return wireScreen(rootRef.current, screen, navigate);
  }, [navigate, screen]);

  return (
    <>
      {shouldRenderStyles
        ? screen.styles.map((styleContent, index) => (
            <style key={`${screen.id}-style-${index}`}>{styleContent}</style>
          ))
        : null}
      <div
        ref={rootRef}
        className={screen.bodyClassName || undefined}
        data-openride-screen={screen.id}
        dangerouslySetInnerHTML={{ __html: screen.bodyHtml }}
      />
    </>
  );
}
