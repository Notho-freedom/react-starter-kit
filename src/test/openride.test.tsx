import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import AppRoutes from "@/AppRoutes";
import { openRideThemeStorageKey } from "@/openride/shared/theme";
import {
  createInitialWorkflowState,
  openRideWorkflowStorageKey,
  type OpenRideWorkflowState,
} from "@/openride/shared/workflows";

function mergeWorkflowState(overrides: Partial<OpenRideWorkflowState> = {}) {
  const base = createInitialWorkflowState();

  return {
    ...base,
    ...overrides,
    bookingDraft: {
      ...base.bookingDraft,
      ...overrides.bookingDraft,
    },
    publishDraft: {
      ...base.publishDraft,
      ...overrides.publishDraft,
    },
    user:
      overrides.user === null
        ? null
        : {
            ...base.user!,
            ...overrides.user,
            verification: {
              ...base.user!.verification,
              ...overrides.user?.verification,
            },
          },
  } satisfies OpenRideWorkflowState;
}

function seedWorkflowState(overrides: Partial<OpenRideWorkflowState> = {}) {
  const state = mergeWorkflowState(overrides);
  window.localStorage.setItem(openRideWorkflowStorageKey, JSON.stringify(state));
  return state;
}

function seedAuthenticatedWorkflow(overrides: Partial<OpenRideWorkflowState> = {}) {
  return seedWorkflowState({
    authStatus: "authenticated",
    profileCompleted: true,
    trustCompleted: true,
    ...overrides,
  });
}

function renderRoute(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <AppRoutes />
    </MemoryRouter>,
  );
}

describe("OpenRide workflows", () => {
  it("redirects anonymous users from the root entry point to auth", async () => {
    renderRoute("/");

    expect(await screen.findByRole("heading", { name: "Login" })).toBeInTheDocument();
    await waitFor(() => {
      expect(document.title).toBe("Rideshare Login & Registration");
    });
  });

  it("protects dashboard routes for anonymous users", async () => {
    renderRoute("/search-results");

    expect(await screen.findByRole("heading", { name: "Login" })).toBeInTheDocument();
  });

  it("routes incomplete onboarding users to the next required step", async () => {
    seedWorkflowState({
      authStatus: "authenticated",
      onboardingStep: "setup-profile",
      profileCompleted: false,
      trustCompleted: false,
    });
    const setupView = renderRoute("/");
    expect(await screen.findByRole("heading", { name: "Set up your profile" })).toBeInTheDocument();
    setupView.unmount();

    window.localStorage.clear();
    seedWorkflowState({
      authStatus: "authenticated",
      onboardingStep: "trust-center",
      profileCompleted: true,
      trustCompleted: false,
    });
    renderRoute("/");
    expect(await screen.findByRole("heading", { name: "Trust Center" })).toBeInTheDocument();
  });

  it("renders all protected OpenRide routes for authenticated users", async () => {
    seedAuthenticatedWorkflow();

    const routeExpectations = [
      { path: "/search-results", heading: "Résultats de Recherche" },
      { path: "/publish-trip", heading: "Publier un Trajet" },
      { path: "/messages", heading: "Messages" },
      { path: "/my-trips", heading: "Mes Trajets" },
      { path: "/trip-details", heading: "Détails du Trajet" },
      { path: "/payment-booking", heading: "Paiement & Réservation" },
      { path: "/profile-settings", heading: "Profil & Paramètres" },
    ];

    for (const expectation of routeExpectations) {
      const view = renderRoute(expectation.path);
      expect(await screen.findByRole("heading", { name: expectation.heading })).toBeInTheDocument();
      view.unmount();
    }
  });

  it("keeps auth screen toggles working and signup redirects into onboarding", async () => {
    renderRoute("/auth");

    fireEvent.click(await screen.findByRole("link", { name: "Sign up" }));
    expect(await screen.findByRole("heading", { name: "Sign up" })).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText("John"), { target: { value: "Amina" } });
    fireEvent.change(screen.getByPlaceholderText("Doe"), { target: { value: "Bela" } });
    fireEvent.change(screen.getAllByPlaceholderText("john.doe@gmail.com")[1], {
      target: { value: "amina@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("+1 (555) 000-0000"), {
      target: { value: "+33 6 10 10 10 10" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Create account" }));

    expect(await screen.findByRole("heading", { name: "Set up your profile" })).toBeInTheDocument();

    const stored = JSON.parse(window.localStorage.getItem(openRideWorkflowStorageKey) ?? "{}");
    expect(stored.authStatus).toBe("authenticated");
    expect(stored.profileCompleted).toBe(false);
    expect(stored.trustCompleted).toBe(false);
  });

  it("keeps the authentication hub tabs working and login opens the app", async () => {
    renderRoute("/authentication-hub");

    fireEvent.click(await screen.findByRole("button", { name: "Sign Up" }));
    expect(await screen.findByRole("heading", { name: "Create an account" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Log In" }));
    expect(await screen.findByRole("heading", { name: "Welcome back" })).toBeInTheDocument();

    fireEvent.change(screen.getAllByPlaceholderText("john.doe@example.com")[0], {
      target: { value: "premium@example.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Sign In/i }));

    expect(await screen.findByRole("heading", { name: "Résultats de Recherche" })).toBeInTheDocument();
  });

  it("continues onboarding from setup profile to trust center to search results", async () => {
    seedWorkflowState({
      authStatus: "authenticated",
      onboardingStep: "setup-profile",
      profileCompleted: false,
      trustCompleted: false,
    });
    renderRoute("/setup-profile");

    fireEvent.change(await screen.findByPlaceholderText("John"), { target: { value: "Nina" } });
    fireEvent.change(screen.getByPlaceholderText("Doe"), { target: { value: "Kole" } });
    fireEvent.change(screen.getByPlaceholderText("(555) 000-0000"), {
      target: { value: "6 11 22 33 44" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Save & Continue/i }));

    expect(await screen.findByRole("heading", { name: "Trust Center" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /Terminer/i }));
    expect(await screen.findByRole("heading", { name: "Résultats de Recherche" })).toBeInTheDocument();
  });

  it("completes the passenger booking flow and opens the related conversation", async () => {
    seedAuthenticatedWorkflow();
    renderRoute("/search-results");

    fireEvent.click(await screen.findAllByRole("button", { name: "View Details" }).then((buttons) => buttons[0]));
    expect(await screen.findByRole("heading", { name: "Détails du Trajet" })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Réserver" }));
    expect(await screen.findByRole("heading", { name: "Paiement & Réservation" })).toBeInTheDocument();

    vi.useFakeTimers();
    fireEvent.click(screen.getByRole("button", { name: /Payer et Réserver/i }));
    act(() => {
      vi.advanceTimersByTime(1500);
    });
    expect(screen.getByText("Réservation Confirmée !")).toBeInTheDocument();
    vi.useRealTimers();

    fireEvent.click(screen.getByRole("button", { name: /Envoyer un message/i }));
    expect(await screen.findByRole("heading", { name: "Messages" })).toBeInTheDocument();
    expect((await screen.findAllByText("Paris → Lyon")).length).toBeGreaterThan(0);
    const stored = JSON.parse(window.localStorage.getItem(openRideWorkflowStorageKey) ?? "{}");
    expect(stored.activeConversationId).toBeTruthy();
  });

  it("publishes a trip and stores it in the driver workflow", async () => {
    seedAuthenticatedWorkflow();
    renderRoute("/publish-trip");

    fireEvent.change(await screen.findByPlaceholderText("Ville de départ (ex: Paris)"), {
      target: { value: "Bruxelles" },
    });
    fireEvent.change(screen.getByPlaceholderText("Ville d'arrivée (ex: Lyon)"), {
      target: { value: "Amsterdam" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Sauvegarder Brouillon/i }));
    fireEvent.click(screen.getByRole("button", { name: /Publier le trajet/i }));

    expect(await screen.findByRole("heading", { name: "Mes Trajets" })).toBeInTheDocument();
    const stored = JSON.parse(window.localStorage.getItem(openRideWorkflowStorageKey) ?? "{}");
    expect(stored.publishDraft.departure).toBe("Bruxelles");
    expect(stored.publishedTrips[0].routeLabel).toContain("Bruxelles");
  });

  it("persists profile changes from settings", async () => {
    const state = seedAuthenticatedWorkflow();
    renderRoute("/profile-settings");

    fireEvent.change(await screen.findByDisplayValue(state.user.fullName.includes("Ronald") ? "Ronald" : state.user.firstName), {
      target: { value: "Lina" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Enregistrer les modifications/i }));

    expect((await screen.findAllByText("Lina Richards")).length).toBeGreaterThan(0);
    const stored = JSON.parse(window.localStorage.getItem(openRideWorkflowStorageKey) ?? "{}");
    expect(stored.user.firstName).toBe("Lina");
  });

  it("sends messages inside the active conversation", async () => {
    seedAuthenticatedWorkflow({
      activeConversationId: "conversation-ride-paris-lyon",
    });
    renderRoute("/messages");

    fireEvent.change(await screen.findByPlaceholderText("Écrivez votre message..."), {
      target: { value: "À tout à l'heure !" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Envoyer le message" }));

    expect((await screen.findAllByText("À tout à l'heure !")).length).toBeGreaterThan(0);
  });

  it("applies the selected theme globally and persists it", async () => {
    seedAuthenticatedWorkflow();
    const { container, unmount } = renderRoute("/profile-settings");

    await screen.findByRole("heading", { name: "Profil & Paramètres" });
    fireEvent.click(screen.getByRole("button", { name: /White/i }));

    expect(
      container.querySelector('[data-openride-page="profile-settings"]'),
    ).toHaveAttribute("data-openride-theme", "white");
    expect(window.localStorage.getItem(openRideThemeStorageKey)).toBe("white");

    unmount();

    const nextRender = renderRoute("/messages");
    expect(await screen.findByRole("heading", { name: "Messages" })).toBeInTheDocument();
    expect(
      nextRender.container.querySelector('[data-openride-page="messages"]'),
    ).toHaveAttribute("data-openride-theme", "white");
  });

  it("keeps authentication routes on their fixed visual identity", async () => {
    window.localStorage.setItem(openRideThemeStorageKey, "white");

    const authRender = renderRoute("/auth");
    expect(await screen.findByRole("heading", { name: "Login" })).toBeInTheDocument();
    expect(
      authRender.container.querySelector('[data-openride-page="auth"]'),
    ).toHaveAttribute("data-openride-theme", "auth-light");

    authRender.unmount();

    const hubRender = renderRoute("/authentication-hub");
    expect(await screen.findByRole("heading", { name: "Welcome back" })).toBeInTheDocument();
    expect(
      hubRender.container.querySelector('[data-openride-page="authentication-hub"]'),
    ).toHaveAttribute("data-openride-theme", "auth-dark");
  });

  it("replaces external uxpilot links with local navigation targets", async () => {
    seedAuthenticatedWorkflow();
    const { container } = renderRoute("/search-results");

    await screen.findByRole("heading", { name: "Résultats de Recherche" });
    const links = Array.from(container.querySelectorAll<HTMLAnchorElement>("a[href]"));
    expect(links.some((link) => link.href.includes("uxpilot.ai"))).toBe(false);
  });
});

afterEach(() => {
  vi.useRealTimers();
  window.localStorage.clear();
});
