import {
  DashboardTopBar,
  DashboardTopBarIconButton,
  DashboardTopBarSearch,
} from "@/openride/shared/layouts";
import { OpenRideIcon } from "@/openride/shared/icons";

const MessagesHeader = () => (
  <DashboardTopBar
    title="Messages"
    actions={
      <>
        <DashboardTopBarSearch
          placeholder="Rechercher un message..."
          rounded="full"
          widthClassName="w-64"
        />
        <DashboardTopBarIconButton
          badge={<span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-brand-error" />}
          shape="full"
        >
        <OpenRideIcon name="bell" />
        </DashboardTopBarIconButton>
      </>
    }
  />
);

export default MessagesHeader;
