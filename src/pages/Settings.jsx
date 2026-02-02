import { useState } from "react";

const Settings = () => {
  const [notifications, setNotifications] = useState({
    tradeUpdates: true,
    priceAlerts: true,
    emailReports: false,
  });
  const [security, setSecurity] = useState({
    twoFactor: true,
    loginAlerts: true,
  });

  return (
    <section className="bg-[#f4f7fe] px-4 sm:px-6 py-6">
      <div className="mx-auto max-w-4xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Settings
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your preferences and account security.
          </p>
        </div>

        <div className="rounded-2xl border-2 bg-white p-6 shadow-xl">
          <div className="mb-4 border-b border-gray-100 pb-4">
            <h2 className="text-lg font-semibold text-gray-800">Notifications</h2>
            <p className="text-sm text-gray-500">Choose which updates you want to receive.</p>
          </div>
          <div className="space-y-4">
            <label className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
              <div>
                <p className="text-sm font-semibold text-gray-800">Trade updates</p>
                <p className="text-xs text-gray-500">Execution and auto-trade status alerts</p>
              </div>
              <input
                type="checkbox"
                checked={notifications.tradeUpdates}
                onChange={(event) =>
                  setNotifications((prev) => ({
                    ...prev,
                    tradeUpdates: event.target.checked,
                  }))
                }
                className="h-4 w-4"
              />
            </label>

            <label className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
              <div>
                <p className="text-sm font-semibold text-gray-800">Price alerts</p>
                <p className="text-xs text-gray-500">Notify me when assets cross thresholds</p>
              </div>
              <input
                type="checkbox"
                checked={notifications.priceAlerts}
                onChange={(event) =>
                  setNotifications((prev) => ({
                    ...prev,
                    priceAlerts: event.target.checked,
                  }))
                }
                className="h-4 w-4"
              />
            </label>

            <label className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
              <div>
                <p className="text-sm font-semibold text-gray-800">Email reports</p>
                <p className="text-xs text-gray-500">Weekly performance summaries</p>
              </div>
              <input
                type="checkbox"
                checked={notifications.emailReports}
                onChange={(event) =>
                  setNotifications((prev) => ({
                    ...prev,
                    emailReports: event.target.checked,
                  }))
                }
                className="h-4 w-4"
              />
            </label>
          </div>
        </div>

        <div className="rounded-2xl border-2 bg-white p-6 shadow-xl">
          <div className="mb-4 border-b border-gray-100 pb-4">
            <h2 className="text-lg font-semibold text-gray-800">Security</h2>
            <p className="text-sm text-gray-500">Control account protection settings.</p>
          </div>
          <div className="space-y-4">
            <label className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
              <div>
                <p className="text-sm font-semibold text-gray-800">Two-factor authentication</p>
                <p className="text-xs text-gray-500">Recommended for extra security</p>
              </div>
              <input
                type="checkbox"
                checked={security.twoFactor}
                onChange={(event) =>
                  setSecurity((prev) => ({
                    ...prev,
                    twoFactor: event.target.checked,
                  }))
                }
                className="h-4 w-4"
              />
            </label>

            <label className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
              <div>
                <p className="text-sm font-semibold text-gray-800">Login alerts</p>
                <p className="text-xs text-gray-500">Notify me of new device logins</p>
              </div>
              <input
                type="checkbox"
                checked={security.loginAlerts}
                onChange={(event) =>
                  setSecurity((prev) => ({
                    ...prev,
                    loginAlerts: event.target.checked,
                  }))
                }
                className="h-4 w-4"
              />
            </label>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-2 text-sm font-semibold text-white"
          >
            Save Settings
          </button>
        </div>
      </div>
    </section>
  );
};

export default Settings;
