import {
  DashboardTopBarActionGroup,
  DashboardTopBar,
} from "@/openride/shared/layouts";

const MessagesHeader = () => (
  <DashboardTopBar
    subtitle="Suivez vos échanges avec conducteurs et passagers en temps réel."
    title="Messages"
    actions={
      <DashboardTopBarActionGroup
        searchPlaceholder="Rechercher un message..."
        searchWidthClassName="w-52 xl:w-64"
      />
    }
  />
);

export default MessagesHeader;
