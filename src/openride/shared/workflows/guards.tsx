import type { ReactNode } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useOpenRideWorkflow } from "./OpenRideWorkflowProvider";

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
  const workflow = useOpenRideWorkflow();

  if (workflow.isAuthenticated) {
    return <Navigate replace to={workflow.getNextRoute()} />;
  }

  return renderGuardContent(children);
}

export function ProtectedRoute({ children }: GuardProps) {
  const location = useLocation();
  const workflow = useOpenRideWorkflow();

  if (!workflow.isAuthenticated) {
    return <Navigate replace state={{ from: location.pathname }} to="/auth" />;
  }

  const nextRoute = workflow.getNextRoute();
  if (nextRoute !== "/search-results") {
    return <Navigate replace to={nextRoute} />;
  }

  return renderGuardContent(children);
}

export function OnboardingRoute({ children, step }: OnboardingRouteProps) {
  const workflow = useOpenRideWorkflow();

  if (!workflow.isAuthenticated) {
    return <Navigate replace to="/auth" />;
  }

  if (step === "setup-profile") {
    if (workflow.profileCompleted) {
      return <Navigate replace to={workflow.getNextRoute()} />;
    }

    return renderGuardContent(children);
  }

  if (!workflow.profileCompleted) {
    return <Navigate replace to="/setup-profile" />;
  }

  if (workflow.trustCompleted) {
    return <Navigate replace to={workflow.getNextRoute()} />;
  }

  return renderGuardContent(children);
}

export function OpenRideBootstrapRoute() {
  const workflow = useOpenRideWorkflow();

  return <Navigate replace to={workflow.getNextRoute()} />;
}
