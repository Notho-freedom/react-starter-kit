import {
  DashboardTopBarActionGroup,
  DashboardTopBar,
} from "@/openride/shared/layouts";
import { OpenRideIcon } from "@/openride/shared/icons";

const MyTripsHeader = () => (
  <DashboardTopBar
    subtitle="Gérez vos réservations et vos trajets publiés"
    title="Mes Trajets"
    actions={
      <DashboardTopBarActionGroup searchPlaceholder="Search..." searchShortcut="F">
        <button className="px-3 h-9 rounded-lg bg-brand-surface border border-white/10 flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
          <OpenRideIcon name="bolt" className="text-brand-success text-sm" />
          <span className="text-sm font-medium">40</span>
        </button>
      </DashboardTopBarActionGroup>
    }
  />
);

export default MyTripsHeader;
