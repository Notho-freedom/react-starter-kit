import { OpenRideScreenRenderer } from "@/openride/OpenRideScreen";
import { openRideScreens } from "@/openride/screens";

export const SearchResultsPage = () => <OpenRideScreenRenderer screen={openRideScreens.searchResults} />;

export const PublishTripPage = () => <OpenRideScreenRenderer screen={openRideScreens.publishTrip} />;

export const MessagesPage = () => <OpenRideScreenRenderer screen={openRideScreens.messages} />;

export const MyTripsPage = () => <OpenRideScreenRenderer screen={openRideScreens.myTrips} />;

export const TripDetailsPage = () => <OpenRideScreenRenderer screen={openRideScreens.tripDetails} />;

export const PaymentBookingPage = () => <OpenRideScreenRenderer screen={openRideScreens.paymentBooking} />;

export const ProfileSettingsPage = () => <OpenRideScreenRenderer screen={openRideScreens.profileSettings} />;

export const AuthPage = () => <OpenRideScreenRenderer screen={openRideScreens.auth} />;

export const AuthenticationHubPage = () => <OpenRideScreenRenderer screen={openRideScreens.authenticationHub} />;

export const SetupProfilePage = () => <OpenRideScreenRenderer screen={openRideScreens.setupProfile} />;

export const TrustCenterPage = () => <OpenRideScreenRenderer screen={openRideScreens.trustCenter} />;
