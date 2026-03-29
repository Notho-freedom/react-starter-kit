import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import AppRoutes from "@/AppRoutes";
import { openRideThemeStorageKey } from "@/openride/shared/theme";

const routeExpectations = [
  { path: "/", heading: "Résultats de Recherche", title: "Ride Sharing - Résultats de Recherche" },
  { path: "/search-results", heading: "Résultats de Recherche", title: "Ride Sharing - Résultats de Recherche" },
  { path: "/publish-trip", heading: "Publier un Trajet", title: "Ride Sharing - Publier un Trajet" },
  { path: "/messages", heading: "Messages", title: "Ride Sharing - Messages" },
  { path: "/my-trips", heading: "Mes Trajets", title: "Ride Sharing - Mes Trajets" },
  { path: "/trip-details", heading: "Détails du Trajet", title: "Ride Sharing - Détails du Trajet" },
  { path: "/payment-booking", heading: "Paiement & Réservation", title: "Ride Sharing - Paiement & Réservation" },
  { path: "/profile-settings", heading: "Profil & Paramètres", title: "Ride Sharing - Profil & Paramètres" },
  { path: "/auth", heading: "Login", title: "Rideshare Login & Registration" },
  { path: "/authentication-hub", heading: "Welcome back", title: "Authentication Hub - Rideshare" },
  { path: "/setup-profile", heading: "Set up your profile", title: "Account Setup" },
  { path: "/trust-center", heading: "Trust Center", title: "Trust Center & Verification" },
];

function renderRoute(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <AppRoutes />
    </MemoryRouter>,
  );
}

describe("OpenRide routes", () => {
  it.each(routeExpectations)("renders $path", async ({ path, heading, title }) => {
    renderRoute(path);

    expect(await screen.findByRole("heading", { name: heading })).toBeInTheDocument();
    await waitFor(() => {
      expect(document.title).toBe(title);
    });
  });

  it("uses the default OpenRide theme when no preference is saved", async () => {
    const { container } = renderRoute("/search-results");

    await screen.findByRole("heading", { name: "Résultats de Recherche" });
    expect(
      container.querySelector('[data-openride-page="search-results"]'),
    ).toHaveAttribute("data-openride-theme", "default");
  });

  it("toggles auth screens on the login and registration page", async () => {
    renderRoute("/auth");

    expect(await screen.findByRole("heading", { name: "Login" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("link", { name: "Sign up" }));
    expect(await screen.findByRole("heading", { name: "Sign up" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("link", { name: "Login" }));
    expect(await screen.findByRole("heading", { name: "Login" })).toBeInTheDocument();
  });

  it("toggles the authentication hub tabs", async () => {
    renderRoute("/authentication-hub");

    expect(await screen.findByRole("heading", { name: "Welcome back" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Sign Up" }));
    expect(await screen.findByRole("heading", { name: "Create an account" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Log In" }));
    expect(await screen.findByRole("heading", { name: "Welcome back" })).toBeInTheDocument();
  });

  it("opens the mobile navigation on dashboard screens", async () => {
    const { container } = renderRoute("/search-results");

    await screen.findByRole("heading", { name: "Résultats de Recherche" });
    const nav = container.querySelector<HTMLElement>("#nav-links");
    const menuButton = container.querySelector<HTMLElement>("#mobile-menu-btn");
    expect(nav).toHaveClass("hidden");
    fireEvent.click(menuButton!);
    expect(nav).toHaveClass("flex");
    expect(nav).not.toHaveClass("hidden");
  });

  it("toggles available seats on the trip details screen", async () => {
    const { container } = renderRoute("/trip-details");

    await screen.findByRole("heading", { name: "Détails du Trajet" });
    const seatButton = container.querySelector<HTMLElement>(".seat-btn:not(.taken)");
    expect(seatButton).not.toBeNull();
    fireEvent.click(seatButton!);
    expect(seatButton).toHaveClass("selected");
  });

  it("updates payment selection and shows the success modal", async () => {
    const { container } = renderRoute("/payment-booking");

    await screen.findByRole("heading", { name: "Paiement & Réservation" });
    vi.useFakeTimers();
    const radios = container.querySelectorAll<HTMLInputElement>('input[name="payment"]');
    fireEvent.click(radios[1]);
    expect(radios[1].closest("label")).toHaveClass("border-brand-accentGreen");

    fireEvent.click(container.querySelector<HTMLElement>("#confirm-btn")!);
    act(() => {
      vi.advanceTimersByTime(1500);
    });
    expect(container.querySelector("#success-modal")).toHaveClass("flex");
    vi.useRealTimers();
  });

  it("applies the selected theme globally and persists it", async () => {
    const { container, unmount } = renderRoute("/profile-settings");

    await screen.findByRole("heading", { name: "Profil & Paramètres" });
    fireEvent.click(screen.getByRole("button", { name: /Auth sombre/i }));

    expect(
      container.querySelector('[data-openride-page="profile-settings"]'),
    ).toHaveAttribute("data-openride-theme", "auth-dark");
    expect(window.localStorage.getItem(openRideThemeStorageKey)).toBe("auth-dark");

    unmount();

    const nextRender = renderRoute("/auth");
    expect(await screen.findByRole("heading", { name: "Login" })).toBeInTheDocument();
    expect(
      nextRender.container.querySelector('[data-openride-page="auth"]'),
    ).toHaveAttribute("data-openride-theme", "auth-dark");
  });

  it("replaces external uxpilot links with local navigation targets", async () => {
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
