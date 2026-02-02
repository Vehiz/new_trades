import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  HiOutlineCog,
  HiOutlineTrendingUp,
  HiOutlineTrendingDown,
  HiOutlineClock,
  HiOutlineShieldCheck,
  HiOutlineChartBar,
  HiOutlineExclamation,
  HiOutlineCheckCircle,
  HiOutlineLightningBolt,
} from "react-icons/hi";
import { FaSnowflake } from "react-icons/fa";

const AutoTradingConfig = ({ rules, onUpdateRule }) => {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleToggle = (ruleId, enabled) => {
    onUpdateRule(ruleId, {
      enabled,
      startAt: enabled ? new Date().toISOString() : null,
    });
  };

  const handleInputChange = (ruleId, field, value) => {
    const numericValue = typeof value === "number" ? value : Number(value);
    onUpdateRule(ruleId, { [field]: Number.isNaN(numericValue) ? 0 : numericValue });
  };

  const handleEditRule = (ruleId) => {
    const timelineInput = document.getElementById(`timeline-${ruleId}`);
    if (timelineInput) {
      timelineInput.focus();
      timelineInput.select?.();
    }
  };

  const formatDuration = (milliseconds) => {
    const totalSeconds = Math.max(0, Math.floor(milliseconds / 1000));
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  const activeRules = rules.filter((rule) => rule.enabled).length;
  const totalRules = rules.length;
  const freezeProtectionEnabled = rules.filter(
    (rule) => rule.enabled && rule.freezeOnDrop
  ).length;

  if (rules.length === 0) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
            <HiOutlineCog className="h-8 w-8 animate-spin text-slate-400" />
          </div>
          <p className="font-medium text-gray-600">Loading trading rules...</p>
          <p className="mt-1 text-sm text-gray-400">
            Initializing auto-trading configuration
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 p-4 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-semibold text-blue-900">Active Trading</p>
            <HiOutlineChartBar className="h-5 w-5 text-blue-600" />
          </div>
          <div className="text-3xl font-bold text-blue-700">
            {activeRules}/{totalRules}
          </div>
          <p className="mt-1 text-xs text-blue-600">Assets configured</p>
          <div className="mt-3 h-2 rounded-full bg-blue-200">
            <div
              className="h-2 rounded-full bg-blue-600"
              style={{ width: `${(activeRules / totalRules) * 100}%` }}
            />
          </div>
        </div>

        <div className="rounded-2xl border border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100 p-4 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-semibold text-purple-900">24/7 Trading</p>
            <HiOutlineClock className="h-5 w-5 text-purple-600" />
          </div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
            </span>
            <span className="text-2xl font-bold text-purple-700">LIVE</span>
          </div>
          <p className="mt-1 text-xs text-purple-600">Automated execution</p>
        </div>

        <div className="rounded-2xl border border-cyan-200 bg-gradient-to-br from-cyan-50 to-cyan-100 p-4 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-semibold text-cyan-900">Freeze Protection</p>
            <HiOutlineShieldCheck className="h-5 w-5 text-cyan-600" />
          </div>
          <div className="text-3xl font-bold text-cyan-700">
            {freezeProtectionEnabled}
          </div>
          <p className="mt-1 text-xs text-cyan-600">Assets protected</p>
          {freezeProtectionEnabled > 0 && (
            <span className="mt-2 inline-flex items-center gap-1 rounded-full border border-cyan-300 px-2 py-1 text-xs font-semibold text-cyan-700">
              <FaSnowflake className="h-3 w-3" />
              Active
            </span>
          )}
        </div>
      </div>

      <div className="rounded-2xl border border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50 p-4">
        <div className="flex items-start gap-3">
          <HiOutlineLightningBolt className="mt-0.5 h-4 w-4 text-indigo-600" />
          <p className="text-sm text-indigo-900">
            <strong>Auto-Trading System Active:</strong> Configure rules below to enable 24/7
            automated trading with intelligent freeze protection. The system monitors prices
            every 5 seconds and executes trades based on your configured thresholds.
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="flex items-center gap-3 border-b border-gray-100 bg-gradient-to-r from-slate-50 to-slate-100 px-4 py-4">
          <HiOutlineCog className="h-6 w-6 text-blue-600" />
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Trading Rules Configuration</h3>
            <p className="text-sm text-gray-500">
              Configure automated trading rules and freeze protection for each cryptocurrency
            </p>
          </div>
        </div>
        <div className="space-y-6 p-4 sm:p-6">
          {rules.map((rule) => (
            <div
              key={rule.id}
              className={`rounded-2xl border-2 p-4 sm:p-6 transition-all ${
                rule.enabled
                  ? "border-green-400 bg-green-50/50 shadow-lg"
                  : "border-gray-200"
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg ${
                      rule.enabled
                        ? "bg-gradient-to-br from-green-500 to-emerald-500"
                        : "bg-gradient-to-br from-slate-300 to-slate-400"
                    }`}
                  >
                    <span className="text-lg font-bold">{rule.symbol.slice(0, 2)}</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-800">{rule.symbol}</h4>
                    <div className="mt-1 flex flex-wrap items-center gap-2">
                      {rule.enabled ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-green-600 px-2 py-1 text-xs font-semibold text-white">
                          <HiOutlineCheckCircle className="h-3 w-3" />
                          Trading Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-600">
                          <HiOutlineClock className="h-3 w-3" />
                          Inactive
                        </span>
                      )}
                      {rule.enabled && rule.freezeOnDrop && (
                        <span className="inline-flex items-center gap-1 rounded-full border border-cyan-300 px-2 py-1 text-xs font-semibold text-cyan-700">
                          <HiOutlineShieldCheck className="h-3 w-3" />
                          Protected
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-gray-700">
                    {rule.enabled ? "Enabled" : "Disabled"}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleToggle(rule.id, !rule.enabled)}
                    className={`relative h-6 w-11 rounded-full transition ${
                      rule.enabled ? "bg-green-600" : "bg-gray-300"
                    }`}
                    aria-pressed={rule.enabled}
                  >
                    <span
                      className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition ${
                        rule.enabled ? "left-5" : "left-0.5"
                      }`}
                    />
                  </button>
                </div>
              </div>

              {rule.enabled && (
                <>
                  {(() => {
                    const totalMs = rule.timelineDays * 24 * 60 * 60 * 1000;
                    const startAt = rule.startAt ? new Date(rule.startAt).getTime() : now;
                    const remainingMs = Math.max(0, totalMs - (now - startAt));
                    const countdown = formatDuration(remainingMs);
                    const isComplete = remainingMs === 0;

                    return (
                      <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <div>
                            <p className="text-sm font-semibold text-amber-900">
                              Active trade set
                            </p>
                            <p className="text-xs text-amber-700">
                              Timeline: {rule.timelineDays} days. Remaining: {isComplete ? "Completed" : countdown}
                            </p>
                            <p className="text-[11px] text-amber-600">
                              You can only edit or cancel this trade.
                            </p>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <button
                              type="button"
                              onClick={() => handleEditRule(rule.id)}
                              className="rounded-lg border border-amber-300 bg-white px-3 py-2 text-xs font-semibold text-amber-800 hover:bg-amber-100"
                            >
                              Edit Trade
                            </button>
                            <button
                              type="button"
                              onClick={() => onUpdateRule(rule.id, { enabled: false, startAt: null })}
                              className="rounded-lg bg-red-500 px-3 py-2 text-xs font-semibold text-white hover:bg-red-600"
                            >
                              Cancel Trade
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                  <div className="my-6 h-px w-full bg-gray-100" />
                  <div className="space-y-6">
                    <div>
                      <h5 className="mb-4 flex items-center gap-2 text-sm font-semibold text-gray-700">
                        <HiOutlineTrendingDown className="h-4 w-4 text-green-600" />
                        Buy & Sell Thresholds
                      </h5>
                      <div className="grid gap-4 md:grid-cols-3">
                        <div className="space-y-2">
                          <label className="text-xs font-semibold text-gray-500">
                            Buy Threshold (%)
                          </label>
                          <input
                            type="number"
                            step="0.1"
                            min="0"
                            value={rule.buyThreshold}
                            onChange={(event) =>
                              handleInputChange(
                                rule.id,
                                "buyThreshold",
                                event.target.value
                              )
                            }
                            className="w-full rounded-lg border-2 border-gray-200 px-3 py-2 text-sm"
                          />
                          <p className="flex items-center gap-1 text-xs text-gray-500">
                            <HiOutlineTrendingDown className="h-3 w-3 text-green-600" />
                            Buy when price drops by this %
                          </p>
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs font-semibold text-gray-500">
                            Sell Threshold (%)
                          </label>
                          <input
                            type="number"
                            step="0.1"
                            min="0"
                            value={rule.sellThreshold}
                            onChange={(event) =>
                              handleInputChange(
                                rule.id,
                                "sellThreshold",
                                event.target.value
                              )
                            }
                            className="w-full rounded-lg border-2 border-gray-200 px-3 py-2 text-sm"
                          />
                          <p className="flex items-center gap-1 text-xs text-gray-500">
                            <HiOutlineTrendingUp className="h-3 w-3 text-red-600" />
                            Sell when price rises by this %
                          </p>
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs font-semibold text-gray-500">
                            Trade Amount ($)
                          </label>
                          <input
                            type="number"
                            step="100"
                            min="0"
                            value={rule.tradeAmount}
                            onChange={(event) =>
                              handleInputChange(
                                rule.id,
                                "tradeAmount",
                                event.target.value
                              )
                            }
                            className="w-full rounded-lg border-2 border-gray-200 px-3 py-2 text-sm"
                          />
                          <p className="text-xs text-gray-500">Amount per trade in USD</p>
                        </div>
                      </div>
                    </div>

                    <div className="h-px w-full bg-gray-100" />

                    <div>
                      <h5 className="mb-4 flex items-center gap-2 text-sm font-semibold text-gray-700">
                        <HiOutlineClock className="h-4 w-4 text-purple-600" />
                        Trading Timeline
                      </h5>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <label className="text-xs font-semibold text-gray-500">
                            Timeline (Days)
                          </label>
                          <input
                            id={`timeline-${rule.id}`}
                            type="number"
                            min="3"
                            step="1"
                            value={rule.timelineDays}
                            onChange={(event) => {
                              const nextValue = Math.max(
                                3,
                                Number(event.target.value || 0)
                              );
                              handleInputChange(rule.id, "timelineDays", nextValue);
                            }}
                            className="w-full rounded-lg border-2 border-gray-200 px-3 py-2 text-sm"
                          />
                          <p className="text-xs text-gray-500">
                            Minimum timeline is 3 days.
                          </p>
                        </div>

                        <div className="rounded-lg border-2 border-purple-100 bg-purple-50 p-4">
                          <p className="text-xs font-semibold text-purple-700">3-Day Timeline</p>
                          <ul className="mt-3 space-y-2 text-xs text-purple-700">
                            <li className="flex items-center gap-2">
                              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-purple-200 text-[10px] font-bold">
                                1
                              </span>
                              Day 1: Activate rule & start monitoring
                            </li>
                            <li className="flex items-center gap-2">
                              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-purple-200 text-[10px] font-bold">
                                2
                              </span>
                              Day 2: Execute trades on signals
                            </li>
                            <li className="flex items-center gap-2">
                              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-purple-200 text-[10px] font-bold">
                                3
                              </span>
                              Day 3: Review performance & adjust
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="h-px w-full bg-gray-100" />

                    <div>
                      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <h5 className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                            <HiOutlineShieldCheck className="h-4 w-4 text-cyan-600" />
                            Intelligent Freeze Protection
                          </h5>
                          <p className="mt-1 text-xs text-gray-500">
                            Automatically pause trading during market crashes and resume when price recovers
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            onUpdateRule(rule.id, { freezeOnDrop: !rule.freezeOnDrop })
                          }
                          className={`relative h-6 w-11 rounded-full transition ${
                            rule.freezeOnDrop ? "bg-cyan-600" : "bg-gray-300"
                          }`}
                          aria-pressed={rule.freezeOnDrop}
                        >
                          <span
                            className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition ${
                              rule.freezeOnDrop ? "left-5" : "left-0.5"
                            }`}
                          />
                        </button>
                      </div>

                      {rule.freezeOnDrop && (
                        <div className="rounded-lg border-2 border-cyan-200 bg-cyan-50 p-4">
                          <div className="mb-3 grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                              <label className="text-xs font-semibold text-cyan-900">
                                Freeze Threshold (%)
                              </label>
                              <input
                                type="number"
                                step="0.5"
                                min="0"
                                value={rule.freezeThreshold}
                                onChange={(event) =>
                                  handleInputChange(
                                    rule.id,
                                    "freezeThreshold",
                                    event.target.value
                                  )
                                }
                                className="w-full rounded-lg border-2 border-cyan-300 px-3 py-2 text-sm"
                              />
                              <p className="flex items-center gap-1 text-xs text-cyan-700">
                                <HiOutlineExclamation className="h-3 w-3" />
                                Freeze if price drops by this %
                              </p>
                            </div>

                            <div className="space-y-2">
                              <label className="text-xs font-semibold text-cyan-900">
                                Unfreeze Margin (%)
                              </label>
                              <input
                                type="number"
                                step="0.5"
                                min="0"
                                value={rule.unfreezeMargin}
                                onChange={(event) =>
                                  handleInputChange(
                                    rule.id,
                                    "unfreezeMargin",
                                    event.target.value
                                  )
                                }
                                className="w-full rounded-lg border-2 border-cyan-300 px-3 py-2 text-sm"
                              />
                              <p className="flex items-center gap-1 text-xs text-cyan-700">
                                <HiOutlineCheckCircle className="h-3 w-3" />
                                Resume when price recovers by this %
                              </p>
                            </div>
                          </div>

                          <div className="mt-2 flex items-start gap-2 text-xs text-cyan-800">
                            <FaSnowflake className="mt-0.5 h-4 w-4 text-cyan-600" />
                            <p>
                              <strong>How it works:</strong> When the price drops {rule.freezeThreshold}% below your average
                              purchase price, trading will automatically pause. It resumes when the price recovers by {rule.unfreezeMargin}%
                              from the freeze point.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5">
        <div className="flex items-center gap-2">
          <HiOutlineChartBar className="h-4 w-4 text-slate-500" />
          <h4 className="text-sm font-semibold text-slate-700">How Auto-Trading Works</h4>
        </div>
        <div className="mt-4 space-y-3 text-sm text-slate-600">
          <div className="flex gap-3">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600">
              1
            </div>
            <p>
              <strong>Enable Trading:</strong> Toggle on auto-trading for any cryptocurrency to start 24/7 automated execution.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-100 text-xs font-bold text-purple-600">
              2
            </div>
            <p>
              <strong>Set Thresholds:</strong> Configure buy threshold (price drop %) and sell threshold (price rise %) for automatic trades.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan-100 text-xs font-bold text-cyan-600">
              3
            </div>
            <p>
              <strong>Freeze Protection:</strong> Enable intelligent protection to automatically pause trading during crashes and resume on recovery.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-xs font-bold text-green-600">
              4
            </div>
            <p>
              <strong>Monitor & Adjust:</strong> Watch the Trades tab for execution history and adjust your rules anytime based on performance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

AutoTradingConfig.propTypes = {
  rules: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      symbol: PropTypes.string.isRequired,
      enabled: PropTypes.bool.isRequired,
      buyThreshold: PropTypes.number.isRequired,
      sellThreshold: PropTypes.number.isRequired,
      tradeAmount: PropTypes.number.isRequired,
      freezeOnDrop: PropTypes.bool.isRequired,
      freezeThreshold: PropTypes.number.isRequired,
      unfreezeMargin: PropTypes.number.isRequired,
      timelineDays: PropTypes.number.isRequired,
      startAt: PropTypes.string,
    })
  ).isRequired,
  onUpdateRule: PropTypes.func.isRequired,
};

export default AutoTradingConfig;
