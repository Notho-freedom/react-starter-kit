import ProfileSettingsForm from "./ProfileSettingsForm";
import ProfileSettingsSidebar from "./ProfileSettingsSidebar";

const ProfileSettingsContent = () => (
  <div className="min-h-0 flex-1 overflow-y-auto custom-scroll">
    <div className="max-w-7xl mx-auto p-6 lg:p-10 flex flex-col lg:flex-row gap-8">
      <ProfileSettingsSidebar />
      <ProfileSettingsForm />
    </div>
  </div>
);

export default ProfileSettingsContent;
