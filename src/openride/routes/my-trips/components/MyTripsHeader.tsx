import {
  DashboardTopBar,
  DashboardTopBarIconButton,
  DashboardTopBarProfileChip,
  DashboardTopBarSearch,
} from "@/openride/shared/layouts";
import { OpenRideIcon } from "@/openride/shared/icons";

const MyTripsHeader = () => (
  <DashboardTopBar
    subtitle="Gérez vos réservations et vos trajets publiés"
    title="Mes Trajets"
    actions={
      <>
        <DashboardTopBarSearch placeholder="Search..." shortcut="F" />
      <div className="flex items-center gap-2">
          <DashboardTopBarIconButton>
          <OpenRideIcon name="moon" className="text-sm" />
          </DashboardTopBarIconButton>
        <button className="px-3 h-9 rounded-lg bg-brand-surface border border-white/10 flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
          <OpenRideIcon name="bolt" className="text-brand-success text-sm" />
          <span className="text-sm font-medium">40</span>
        </button>
        <button className="px-3 h-9 rounded-lg bg-brand-surface border border-white/10 flex items-center gap-2 text-gray-400 hover:text-white transition-colors relative">
          <OpenRideIcon name="bell" className="text-sm" />
          <span className="bg-brand-error text-white text-[10px] px-1.5 rounded-full">2 New</span>
        </button>
      </div>
        <DashboardTopBarProfileChip name="Ronald R." subtitle="Broker" />
      </>
    }
  />
);

export default MyTripsHeader;
