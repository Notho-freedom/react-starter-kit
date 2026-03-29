import { Route, Routes } from "react-router-dom";
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
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/search-results" element={<SearchResultsPage />} />
      <Route path="/publish-trip" element={<PublishTripPage />} />
      <Route path="/messages" element={<MessagesPage />} />
      <Route path="/my-trips" element={<MyTripsPage />} />
      <Route path="/trip-details" element={<TripDetailsPage />} />
      <Route path="/payment-booking" element={<PaymentBookingPage />} />
      <Route path="/profile-settings" element={<ProfileSettingsPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/authentication-hub" element={<AuthenticationHubPage />} />
      <Route path="/setup-profile" element={<SetupProfilePage />} />
      <Route path="/trust-center" element={<TrustCenterPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
