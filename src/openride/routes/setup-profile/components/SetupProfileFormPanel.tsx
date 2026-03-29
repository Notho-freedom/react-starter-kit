import { OpenRideIcon } from "@/openride/shared/icons";

const SetupProfileFormPanel = () => (
<section id="setup-forms" className="w-full lg:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col relative z-10 overflow-y-auto hide-scroll">
    {/* Header */}
    <div className="mb-10 flex items-center justify-between">
      <a href="#" className="flex items-center gap-3 text-2xl font-serif font-semibold text-brand-dark tracking-tight">
        <div className="w-10 h-10 rounded-xl bg-brand-accent flex items-center justify-center shadow-lg shadow-brand-accent/30">
          <OpenRideIcon name="car-side" className="text-white text-lg" />
        </div>
        RideShare
      </a>
    </div>
    <div className="max-w-md w-full mx-auto lg:mx-0">
      <h1 className="text-3xl sm:text-4xl font-semibold text-brand-dark mb-2">Set up your profile</h1>
      <p className="text-gray-500 mb-8">Let's get the basics down before you start riding.</p>
      <form className="space-y-8" data-openride-setup-form="profile">
        {/* Profile Photo Section */}
        <div id="section-photo" className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Profile Photo</h3>
          <div className="flex items-center gap-6">
            <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center group cursor-pointer hover:border-brand-accent transition-colors">
              <img className="w-full h-full object-cover hidden" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/74bc8ab68d-80cb9a60aa24312f2899.png" alt="professional headshot profile picture, neutral background, bright lighting" />
              <OpenRideIcon name="camera" className="text-2xl text-gray-400 group-hover:text-brand-accent transition-colors" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white text-xs font-medium">Upload</span>
              </div>
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-500 mb-3">Upload a clear photo of your face. This helps drivers and riders recognize you.</p>
              <button type="button" className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                Choose File
              </button>
            </div>
          </div>
        </div>
        {/* Personal Info Section */}
        <div id="section-personal" className="space-y-5">
          <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Personal Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">First Name</label>
              <div className="relative input-field rounded-xl">
                <input name="firstName" type="text" placeholder="John" className="w-full px-4 py-3 rounded-xl focus:outline-none text-gray-900 bg-transparent placeholder-gray-400" required />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Last Name</label>
              <div className="relative input-field rounded-xl">
                <input name="lastName" type="text" placeholder="Doe" className="w-full px-4 py-3 rounded-xl focus:outline-none text-gray-900 bg-transparent placeholder-gray-400" required />
              </div>
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">Phone Number</label>
            <div className="relative input-field rounded-xl flex">
              <select name="phoneCountryCode" className="bg-gray-50 border-r border-gray-200 px-3 py-3 rounded-l-xl text-gray-700 focus:outline-none">
                <option>+1 (US)</option>
                <option>+44 (UK)</option>
                <option>+33 (FR)</option>
              </select>
              <input name="phone" type="tel" placeholder="(555) 000-0000" className="flex-1 px-4 py-3 rounded-r-xl focus:outline-none text-gray-900 bg-transparent placeholder-gray-400" required />
            </div>
            <p className="text-xs text-gray-500">We'll send a code to verify this number later.</p>
          </div>
        </div>
        {/* Localization Section */}
        <div id="section-localization" className="space-y-5">
          <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Preferences</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Preferred Language</label>
              <div className="relative input-field rounded-xl">
                <select name="language" className="w-full px-4 py-3 rounded-xl focus:outline-none text-gray-900 bg-transparent appearance-none">
                  <option>English</option>
                  <option>French</option>
                  <option>Spanish</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <OpenRideIcon name="chevron-down" className="text-gray-400 text-xs" />
                </div>
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Currency</label>
              <div className="relative input-field rounded-xl">
                <select name="currency" className="w-full px-4 py-3 rounded-xl focus:outline-none text-gray-900 bg-transparent appearance-none">
                  <option>USD ($)</option>
                  <option>EUR (€)</option>
                  <option>GBP (£)</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <OpenRideIcon name="chevron-down" className="text-gray-400 text-xs" />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Emergency Contact Section */}
        <div id="section-emergency" className="space-y-5">
          <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Emergency Contact</h3>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">Contact Name</label>
            <div className="relative input-field rounded-xl">
              <input name="emergencyContactName" type="text" placeholder="Jane Doe" className="w-full px-4 py-3 rounded-xl focus:outline-none text-gray-900 bg-transparent placeholder-gray-400" />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">Contact Phone</label>
            <div className="relative input-field rounded-xl">
              <input name="emergencyContactPhone" type="tel" placeholder="+1 (555) 111-2222" className="w-full px-4 py-3 rounded-xl focus:outline-none text-gray-900 bg-transparent placeholder-gray-400" />
            </div>
          </div>
        </div>
        {/* Notifications Section */}
        <div id="section-notifications" className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Notifications</h3>
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative">
                <input name="smsUpdates" type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-accent" />
              </div>
              <span className="text-sm text-gray-700 group-hover:text-gray-900">SMS updates about my rides</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative">
                <input name="marketingOptIn" type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-accent" />
              </div>
              <span className="text-sm text-gray-700 group-hover:text-gray-900">Email marketing and promotions</span>
            </label>
          </div>
        </div>
        {/* Actions */}
        <div className="pt-6 border-t mt-8 flex items-center justify-between gap-4 sticky bottom-0 bg-white py-4 z-20">
          <button type="button" data-openride-setup-action="skip" className="px-6 py-3.5 text-gray-600 font-medium hover:text-gray-900 transition-colors">
            Skip for now
          </button>
          <button type="button" data-openride-setup-action="continue" className="flex-1 sm:flex-none bg-brand-dark hover:bg-black text-white font-semibold px-8 py-3.5 rounded-xl transition-all duration-300 shadow-lg shadow-gray-900/20 flex justify-center items-center gap-2 group">
            Save &amp; Continue
            <OpenRideIcon name="arrow-right" className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </form>
    </div>
  </section>
);

export default SetupProfileFormPanel;
