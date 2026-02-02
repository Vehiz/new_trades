import { useAutoTrade } from "../hooks/useAutoTrade";

const AutoTradePanel = () => {
  const { settings, updateSettings, isFrozen } = useAutoTrade();

  return (
    <div className="bg-white rounded-lg shadow-md border p-4 sm:p-6 mb-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-wide text-gray-500">
            Automated Trading Status
          </p>
          <h3 className="text-lg sm:text-xl font-semibold">
            {isFrozen ? "Trading Paused" : "Trading Active"}
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            {isFrozen
              ? "Assets are frozen while the market is falling."
              : "Trading resumes automatically when the market rises."}
          </p>
        </div>
        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full border ${
            isFrozen
              ? "bg-red-50 text-red-600 border-red-200"
              : "bg-emerald-50 text-emerald-600 border-emerald-200"
          }`}
        >
          {isFrozen ? "Frozen" : "Live"}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="flex items-center gap-3 text-sm">
          <input
            type="checkbox"
            checked={settings.enabled}
            onChange={(event) => updateSettings({ enabled: event.target.checked })}
            className="h-4 w-4"
          />
          Enable auto trading
        </label>

        <div className="text-sm">
          <label className="block text-gray-600 mb-1">Market trend</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={settings.trend}
            onChange={(event) => updateSettings({ trend: event.target.value })}
          >
            <option value="rising">Rising</option>
            <option value="falling">Falling</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default AutoTradePanel;
