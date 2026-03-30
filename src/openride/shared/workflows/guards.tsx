import type { ReactNode } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/openride/shared/auth";
import { useProfile } from "@/integrations/supabase/hooks";

type GuardProps = {
  children?: ReactNode;
};

type OnboardingRouteProps = GuardProps & {
  step: "setup-profile" | "trust-center";
};

function renderGuardContent(children?: ReactNode) {
  return children ?? <Outlet />;
}

export function PublicEntryRoute({ children }: GuardProps) {
  const { user, loading } = useAuth();
  const { data: profile, isLoading: profileLoading } = useProfile(user?.id);

  if (loading || (user && profileLoading)) return null;

  if (user) {
    const profileCompleted = !!profile?.first_name;
    const trustCompleted = !!(profile?.email_verified && profile?.phone_verified);
    const nextRoute = !profileCompleted
      ? "/setup-profile"
      : !trustCompleted
        ? "/trust-center"
        : "/search-results";

    return <Navigate replace to={nextRoute} />;
  }

  return renderGuardContent(children);
}

export function ProtectedRoute({ children }: GuardProps) {
  const location = useLocation();
  const { user, loading } = useAuth();
  const { data: profile, isLoading: profileLoading } = useProfile(user?.id);

  if (loading || profileLoading) return null;

  if (!user) {
    return <Navigate replace state={{ from: location.pathname }} to="/auth" />;
  }

  const profileCompleted = !!(profile?.first_name);
  const trustCompleted = !!(profile?.email_verified && profile?.phone_verified);

  if (!profileCompleted) {
    return <Navigate replace to="/setup-profile" />;
  }

  if (!trustCompleted) {
    return <Navigate replace to="/trust-center" />;
  }

  return renderGuardContent(children);
}

export function OnboardingRoute({ children, step }: OnboardingRouteProps) {
  const { user, loading } = useAuth();
  const { data: profile, isLoading: profileLoading } = useProfile(user?.id);

  if (loading || profileLoading) return null;

  if (!user) {
    return <Navigate replace to="/auth" />;
  }

  const profileCompleted = !!(profile?.first_name);

  if (step === "setup-profile") {
    // Allow access even if profile is completed (user might want to edit)
    return renderGuardContent(children);
  }

  // trust-center step
  if (!profileCompleted) {
    return <Navigate replace to="/setup-profile" />;
  }

  return renderGuardContent(children);
}

export function OpenRideBootstrapRoute() {
  const { user, loading } = useAuth();
  const { data: profile, isLoading: profileLoading } = useProfile(user?.id);

  if (loading || (user && profileLoading)) return null;

  if (!user) {
    return <Navigate replace to="/auth" />;
  }

  const profileCompleted = !!profile?.first_name;
  const trustCompleted = !!(profile?.email_verified && profile?.phone_verified);

  if (!profileCompleted) {
    return <Navigate replace to="/setup-profile" />;
  }

  if (!trustCompleted) {
    return <Navigate replace to="/trust-center" />;
  }

  return <Navigate replace to="/search-results" />;
}
