import { useEffect, useMemo, useState, type ReactNode } from "react";
import { ChevronRight, Menu } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { RideShareLogoIcon } from "@/openride/shared/icons";
import { dashboardNavItems, type DashboardNavKey } from "@/openride/shared/navigation";

type DashboardShellProps = {
  activeItem: DashboardNavKey;
  children: ReactNode;
  mobileMenuTone?: "surface" | "surfaceLight";
};

export function DashboardShell({
  activeItem,
  children,
  mobileMenuTone = "surface",
}: DashboardShellProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const mainItems = useMemo(
    () => dashboardNavItems.filter((item) => item.section === "main"),
    [],
  );
  const accountItems = useMemo(
    () => dashboardNavItems.filter((item) => item.section === "account"),
    [],
  );

  const mobileMenuClassName =
    mobileMenuTone === "surfaceLight"
      ? "bg-brand-surfaceLight border-white/10"
      : "bg-brand-surface border-gray-800";

  return (
    <>
      <aside
        id="sidebar-nav"
        className="relative z-50 flex h-auto w-full flex-shrink-0 flex-col glass-panel border-r border-gray-800/50 md:h-screen md:w-64 lg:w-72"
      >
        <div className="flex items-center gap-3 border-b border-gray-800/50 p-6">
          <RideShareLogoIcon />
          <span className="font-serif text-2xl font-semibold tracking-tight text-white">RideShare</span>
        </div>

        <div className="absolute right-6 top-6 md:hidden">
          <button
            id="mobile-menu-btn"
            className="text-gray-400 transition-colors hover:text-white"
            type="button"
            onClick={() => setMobileMenuOpen((value) => !value)}
          >
            <Menu className="h-7 w-7" />
          </button>
        </div>

        <nav
          id="nav-links"
          className={cn(
            "flex-1 overflow-y-auto px-4 py-6 flex-col gap-2",
            mobileMenuOpen
              ? "absolute left-0 top-20 flex w-full border-b pb-6 shadow-2xl md:static md:w-auto md:border-b-0 md:pb-6 md:shadow-none"
              : "hidden md:flex",
            mobileMenuClassName,
            "md:bg-transparent md:border-transparent",
          )}
        >
          <div className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-gray-500">Main Menu</div>

          {mainItems.map((item) => {
            const Icon = item.icon;
            const isCurrent = item.key === activeItem;

            return (
              <NavLink
                key={item.key}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "relative flex items-center gap-3 rounded-lg px-4 py-3 transition-colors",
                    isCurrent || isActive
                      ? "nav-item-active text-white"
                      : "text-gray-400 hover:bg-white/5 hover:text-white",
                  )
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                <Icon className={cn("h-5 w-5", isCurrent ? "text-brand-purpleLight" : "")} />
                <span className="font-medium">{item.label}</span>
                {item.badge ? (
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-brand-accent px-2 py-0.5 text-[10px] font-bold text-white">
                    {item.badge}
                  </span>
                ) : null}
              </NavLink>
            );
          })}

          <div className="mb-2 mt-8 px-4 text-xs font-semibold uppercase tracking-wider text-gray-500">Account</div>

          {accountItems.map((item) => {
            const Icon = item.icon;
            const isCurrent = item.key === activeItem;

            return (
              <NavLink
                key={item.key}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-lg px-4 py-3 transition-colors",
                    isCurrent || isActive
                      ? "nav-item-active text-white"
                      : "text-gray-400 hover:bg-white/5 hover:text-white",
                  )
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                <Icon className={cn("h-5 w-5", isCurrent ? "text-brand-purpleLight" : "")} />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="hidden border-t border-gray-800/50 p-4 md:block">
          <NavLink to="/profile-settings" className="glass-card flex items-center gap-3 rounded-xl p-3">
            <img
              src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg"
              alt="User Profile"
              className="h-10 w-10 rounded-full border border-brand-purple/30"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-white">Devon Lane</p>
              <p className="truncate text-xs text-brand-purpleLight">Verified Member</p>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-500" />
          </NavLink>
        </div>
      </aside>

      {children}
    </>
  );
}
