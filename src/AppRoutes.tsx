import { Route, Routes } from "react-router-dom";
import { OpenRideThemeProvider } from "@/openride/shared/theme";
import {
  OnboardingRoute,
  OpenRideBootstrapRoute,
  OpenRideWorkflowProvider,
  ProtectedRoute,
  PublicEntryRoute,
} from "@/openride/shared/workflows";
import {
  AuthPage,
  AuthenticationHubPage,
  MessagesPage,
  MyTripsPage,
  PaymentBookingPage,
  ProfileSettingsPage,
  PublishTripPage,
  SearchResultsPage,
  SetupProfilePage,
  TripDetailsPage,
  TrustCenterPage,
} from "./pages/OpenRidePages";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const AppRoutes = () => {
  return (
    <OpenRideThemeProvider>
      <OpenRideWorkflowProvider>
        <Routes>
          <Route path="/" element={<OpenRideBootstrapRoute />} />

          <Route element={<PublicEntryRoute />}>
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/authentication-hub" element={<AuthenticationHubPage />} />
          </Route>

          <Route element={<OnboardingRoute step="setup-profile" />}>
            <Route path="/setup-profile" element={<SetupProfilePage />} />
          </Route>

          <Route element={<OnboardingRoute step="trust-center" />}>
            <Route path="/trust-center" element={<TrustCenterPage />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/search-results" element={<SearchResultsPage />} />
            <Route path="/publish-trip" element={<PublishTripPage />} />
            <Route path="/messages" element={<MessagesPage />} />
            <Route path="/my-trips" element={<MyTripsPage />} />
            <Route path="/trip-details" element={<TripDetailsPage />} />
            <Route path="/payment-booking" element={<PaymentBookingPage />} />
            <Route path="/profile-settings" element={<ProfileSettingsPage />} />
          </Route>

          <Route path="/index" element={<Index />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </OpenRideWorkflowProvider>
    </OpenRideThemeProvider>
  );
};

export default AppRoutes;
