import { useMemo, useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import MarketView from "../widgets/MarketView";
import WidgetTicker from "../widgets/WidgetTicker";
import MiniSymbolChart from "../widgets/MiniSymbolChart";
import AutoTradingConfig from "../components/AutoTradingConfig";
import { Link } from "react-router-dom";
import { fetchDeposits, fetchWithdrawals } from "../services/transactions";

const Dashboard = () => {
  const total = parseFloat(sessionStorage.getItem("totalAmount")) || 0;
  const [user, setUser] = useState(null);
  const [totalSum, setTotalSum] = useState(0);
  const [depositTotal, setDepositTotal] = useState(0);
  const [activeTab, setActiveTab] = useState("market");
  const [transactions, setTransactions] = useState([]);
  const [transactionsLoading, setTransactionsLoading] = useState(false);
  const [transactionFilter, setTransactionFilter] = useState("all");
  const [tradeHistory, setTradeHistory] = useState([]);
  const [priceMap, setPriceMap] = useState({});
  const [autoTradingRules, setAutoTradingRules] = useState([
    {
      id: "rule-btc",
      symbol: "BTC",
      enabled: false,
      buyThreshold: 2.0,
      sellThreshold: 3.0,
      tradeAmount: 500,
      freezeOnDrop: true,
      freezeThreshold: 5.0,
      unfreezeMargin: 3.0,
      timelineDays: 3,
      startAt: new Date().toISOString(),
    },
    {
      id: "rule-eth",
      symbol: "ETH",
      enabled: false,
      buyThreshold: 2.5,
      sellThreshold: 3.5,
      tradeAmount: 400,
      freezeOnDrop: true,
      freezeThreshold: 5.0,
      unfreezeMargin: 3.0,
      timelineDays: 3,
      startAt: new Date().toISOString(),
    },
    {
      id: "rule-bnb",
      symbol: "BNB",
      enabled: false,
      buyThreshold: 2.0,
      sellThreshold: 3.0,
      tradeAmount: 300,
      freezeOnDrop: true,
      freezeThreshold: 5.0,
      unfreezeMargin: 3.0,
      timelineDays: 3,
      startAt: new Date().toISOString(),
    },
  ]);

  const profit = (() => {
    const parsed = parseFloat(user?.profit ?? 0);
    return Number.isNaN(parsed) ? 0 : parsed;
  })();
  const sum = depositTotal + profit;
  const portfolioValue = 0;
  const dashMessage = "";

  const tradeStats = useMemo(() => {
    const totalTrades = tradeHistory.length;
    const realizedTrades = tradeHistory.filter(
      (trade) => trade.status === "Completed" && trade.pnl && trade.pnl !== "-"
    );
    const wins = realizedTrades.filter((trade) => trade.pnl.startsWith("+"));
    const winRate = realizedTrades.length
      ? Math.round((wins.length / realizedTrades.length) * 100)
      : 0;

    const realizedPnL = realizedTrades.reduce((acc, trade) => {
      const numeric = parseFloat((trade.pnl || "0").replace(/[^0-9.-]/g, "")) || 0;
      return acc + numeric;
    }, 0);

    const feesPaid = tradeHistory.reduce((acc, trade) => {
      const numeric = parseFloat((trade.fee || "0").replace(/[^0-9.-]/g, "")) || 0;
      return acc + numeric;
    }, 0);

    return {
      totalTrades,
      winRate,
      realizedPnL,
      feesPaid,
    };
  }, [tradeHistory]);

  const formatDateTime = (value) => {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const activeTrades = useMemo(
    () => tradeHistory.filter((trade) => trade.status === "Open"),
    [tradeHistory]
  );

  const completedTrades = useMemo(
    () => tradeHistory.filter((trade) => trade.status === "Completed"),
    [tradeHistory]
  );

  const activeAutoTrades = useMemo(
    () =>
      autoTradingRules
        .filter((rule) => rule.enabled)
        .map((rule) => ({
          id: rule.id,
          pair: `${rule.symbol}/USDT`,
          tradeAmount: `$${rule.tradeAmount}`,
          buyThreshold: `${rule.buyThreshold}%`,
          sellThreshold: `${rule.sellThreshold}%`,
          freezeProtection: rule.freezeOnDrop ? "On" : "Off",
          timeline: `${rule.timelineDays} days`,
        })),
    [autoTradingRules]
  );

  const filteredTransactions = useMemo(() => {
    if (transactionFilter === "all") return transactions;
    return transactions.filter((transaction) => transaction.type === transactionFilter);
  }, [transactions, transactionFilter]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setAutoTradingRules((currentRules) => {
        let updated = false;
        const nextRules = currentRules.map((rule) => {
          if (!rule.enabled || !rule.startAt) {
            return rule;
          }

          const totalMs = rule.timelineDays * 24 * 60 * 60 * 1000;
          const elapsed = Date.now() - new Date(rule.startAt).getTime();
          if (elapsed < totalMs) {
            return rule;
          }

          updated = true;
          const logId = `${rule.id}-${rule.startAt}-completed`;
          const snapshotPrice = getLivePriceForPair(`${rule.symbol}/USDT`) || "-";
          const winPercent = 50 + Math.random() * 150;
          const profitGain = (rule.tradeAmount * winPercent) / 100;
          let didLog = false;
          setTradeHistory((prev) => {
            if (prev.some((item) => item.id === logId)) return prev;
            didLog = true;
            return [
              ...prev,
              {
                id: logId,
                date: new Date().toISOString(),
                pair: `${rule.symbol}/USDT`,
                side: "Auto",
                type: "Auto Trade",
                amount: `$${rule.tradeAmount}`,
                price: snapshotPrice,
                fee: "-",
                status: "Completed",
                pnl: `+$${profitGain.toFixed(2)}`,
              },
            ];
          });

          if (didLog) {
            const currentProfit = (() => {
              const parsed = parseFloat(user?.profit ?? 0);
              return Number.isNaN(parsed) ? 0 : parsed;
            })();
            const nextProfit = currentProfit + profitGain;
            setUser((prev) => (prev ? { ...prev, profit: nextProfit } : prev));
            if (auth.currentUser?.email) {
              updateDoc(doc(db, "Users", auth.currentUser.email), {
                profit: nextProfit,
              }).catch((error) => {
                console.error("Failed to update profit", error);
              });
            }
          }

          return { ...rule, enabled: false, startAt: null };
        });

        return updated ? nextRules : currentRules;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetchPrices = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,binancecoin&vs_currencies=usd"
        );
        const data = await response.json();
        if (!isMounted) return;
        setPriceMap({
          BTC: data?.bitcoin?.usd ?? null,
          ETH: data?.ethereum?.usd ?? null,
          BNB: data?.binancecoin?.usd ?? null,
        });
      } catch (error) {
        console.error("Failed to fetch prices", error);
      }
    };

    fetchPrices();
    const intervalId = setInterval(fetchPrices, 30000);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, []);

  const getLivePriceForPair = (pair) => {
    if (!pair) return null;
    const symbol = pair.split("/")[0];
    const price = priceMap[symbol];
    if (!price) return null;
    return `$${price.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const handleUpdateRule = (ruleId, updates) => {
    setAutoTradingRules((currentRules) =>
      currentRules.map((rule) => {
        if (rule.id !== ruleId) return rule;

        const isCancelling = updates.enabled === false && rule.enabled;
        const nextRule = {
          ...rule,
          ...updates,
          startAt:
            updates.enabled === true && !rule.enabled
              ? updates.startAt || new Date().toISOString()
              : updates.enabled === false
              ? null
              : rule.startAt,
        };

        if (isCancelling) {
          const logId = `${rule.id}-${rule.startAt || Date.now()}-cancelled`;
          const snapshotPrice = getLivePriceForPair(`${rule.symbol}/USDT`) || "-";
          setTradeHistory((prev) =>
            prev.some((item) => item.id === logId)
              ? prev
              : [
                  ...prev,
                  {
                    id: logId,
                    date: new Date().toISOString(),
                    pair: `${rule.symbol}/USDT`,
                    side: "Auto",
                    type: "Auto Trade",
                    amount: `$${rule.tradeAmount}`,
                    price: snapshotPrice,
                    fee: "-",
                    status: "Cancelled",
                    pnl: "-",
                  },
                ]
          );
        }

        return nextRule;
      })
    );
  };

  useEffect(() => {
    let isMounted = true;
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        const docRef = doc(db, "Users", currentUser.email);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUser(docSnap.data());
        } else {
          console.error("No such document!");
        }

        setTransactionsLoading(true);
        try {
          const [{ deposits, total: depositsTotal }, withdrawals] = await Promise.all([
            fetchDeposits(currentUser.email),
            fetchWithdrawals(currentUser.email),
          ]);

          if (isMounted) {
            setDepositTotal(depositsTotal || 0);
          }

          const normalizedDeposits = (deposits || []).map((deposit) => ({
            id: deposit.id,
            type: "Deposit",
            amount: deposit.amount,
            date: deposit.date || deposit.createdAt,
            method: deposit.method || "Deposit",
            status: deposit.imageUrl !== "" ? "Approved" : "Pending",
          }));

          const normalizedWithdrawals = (withdrawals || []).map((withdrawal) => ({
            id: withdrawal.id,
            type: "Withdrawal",
            amount: withdrawal.amount,
            date: withdrawal.createdAt || withdrawal.date,
            method: withdrawal.asset ? `${withdrawal.asset} Wallet` : "Withdrawal",
            status: withdrawal.status || "Pending",
          }));

          const combined = [...normalizedDeposits, ...normalizedWithdrawals]
            .map((item) => ({
              ...item,
              _time: item.date ? new Date(item.date).getTime() : 0,
            }))
            .sort((a, b) => a._time - b._time);

          if (isMounted) {
            setTransactions(combined);
          }
        } finally {
          if (isMounted) {
            setTransactionsLoading(false);
          }
        }
      } else {
        console.error("No user is signed in.");
      }
      setTotalSum(sum);
    });

    return () => {
      isMounted = false;
      unsubscribe();
    }; // Cleanup the listener on component unmount
  }, [sum, profit]);

  return (
    <section className="bg-[#f7f5ff] w-full min-h-screen px-4 sm:px-6 py-4 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="w-full bg-transparent text-white py-2 overflow-hidden">
        {total === 0.0 ? (
          <div className="text-green-300 text-xs sm:text-sm whitespace-nowrap animate-marquee">
            🚀 Welcome to the BlockTrade! We are happy to have you onboard as
            you enjoy a seamless and well secured cloud mining experience.
            Thank you. 🔥
          </div>
        ) : dashMessage?.includes("notice") ? (
          <div className="w-full text-yellow-500 text-xs sm:text-sm bg-yellow-100 border border-yellow-400 p-2 rounded whitespace-nowrap animate-marquee">
            ⚠️ {dashMessage}
          </div>
        ) : (
          <div className="text-green-400 text-xs sm:text-sm whitespace-nowrap animate-marquee">
            {dashMessage}
          </div>
        )}
      </div>

      <header className="mb-6 bg-white rounded-2xl p-5 sm:p-6 border border-gray-100 shadow-md dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#3b47ff]">
              Crypto Trading Platform
            </h1>
            <p className="text-gray-500 text-sm sm:text-base dark:text-slate-400">
              Welcome back, {user?.firstName ? `${user.firstName} ${user?.lastName || ""}`.trim() : (user?.name || user?.fullName || user?.displayName || "")}
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 dark:border-slate-700 dark:bg-slate-900">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-xs font-semibold text-white">
              {(user?.firstName?.[0] || user?.name?.[0] || user?.email?.[0] || "U").toUpperCase()}
            </div>
            <div className="hidden sm:block">
              <p className="text-xs font-semibold text-gray-700 dark:text-slate-200">
                {user?.firstName ? `${user.firstName} ${user?.lastName || ""}`.trim() : (user?.name || user?.fullName || user?.displayName || "")}
              </p>
              <p className="text-[10px] text-gray-400 dark:text-slate-500">{user?.email || ""}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="grid gap-4 sm:gap-6 lg:grid-cols-4 text-gray-600 dark:text-slate-300 mb-6">
        <div className="rounded-2xl border border-blue-100 bg-blue-50/80 p-4 sm:p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs sm:text-sm font-semibold text-blue-600">Total Balance</p>
              <h3 className="mt-2 text-lg sm:text-2xl font-semibold text-blue-700">
                ${total.toFixed(2)}
              </h3>
              <p className="text-xs text-blue-500">Available for trading</p>
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
              $
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-purple-100 bg-purple-50/80 p-4 sm:p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs sm:text-sm font-semibold text-purple-600">Portfolio Value</p>
              <h3 className="mt-2 text-lg sm:text-2xl font-semibold text-purple-700">
                ${depositTotal.toFixed(2)}
              </h3>
              <p className="text-xs text-purple-500">Total deposits</p>
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
              ▮▮
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-cyan-100 bg-cyan-50/80 p-4 sm:p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs sm:text-sm font-semibold text-cyan-600">Total Assets</p>
              <h3 className="mt-2 text-lg sm:text-2xl font-semibold text-cyan-700">
                ${totalSum.toFixed(2)}
              </h3>
              <p className="text-xs text-cyan-500">Balance + Portfolio</p>
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-100 text-cyan-600">
              $
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-emerald-100 bg-emerald-50/80 p-4 sm:p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs sm:text-sm font-semibold text-emerald-600">Total P&L</p>
              <h3 className="mt-2 text-lg sm:text-2xl font-semibold text-emerald-700">
                {profit >= 0 ? "+" : "-"}${Math.abs(profit).toFixed(2)}
              </h3>
              <p className="text-xs text-emerald-500">All time</p>
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
              ↗
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="grid w-full grid-cols-2 gap-2 rounded-2xl bg-white px-2 py-2 shadow-sm border border-gray-100 sm:flex sm:flex-wrap sm:items-center dark:border-slate-800 dark:bg-slate-900">
          <button
            type="button"
            onClick={() => setActiveTab("market")}
            className={`w-full rounded-full px-4 py-2 text-sm font-semibold transition-all sm:flex-1 ${
              activeTab === "market"
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow"
                : "text-gray-600 hover:bg-gray-50 dark:text-slate-300 dark:hover:bg-slate-800"
            }`}
          >
            Market
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("trading")}
            className={`w-full rounded-full px-4 py-2 text-sm font-semibold transition-all sm:flex-1 ${
              activeTab === "trading"
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow"
                : "text-gray-600 hover:bg-gray-50 dark:text-slate-300 dark:hover:bg-slate-800"
            }`}
          >
            Auto-Trading
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("history")}
            className={`w-full rounded-full px-4 py-2 text-sm font-semibold transition-all sm:flex-1 ${
              activeTab === "history"
                ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow"
                : "text-gray-600 hover:bg-gray-50 dark:text-slate-300 dark:hover:bg-slate-800"
            }`}
          >
            Trades
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("transactions")}
            className={`w-full rounded-full px-4 py-2 text-sm font-semibold transition-all sm:flex-1 ${
              activeTab === "transactions"
                ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow"
                : "text-gray-600 hover:bg-gray-50 dark:text-slate-300 dark:hover:bg-slate-800"
            }`}
          >
            Transactions
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {activeTab === "market" && (
          <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
            <div className="rounded-2xl bg-white p-4 sm:p-6 shadow-sm border border-gray-100 dark:border-slate-800 dark:bg-slate-900">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-sm sm:text-base font-semibold text-gray-800 dark:text-slate-100">BTC Price Chart</h3>
                <span className="text-xs font-semibold text-emerald-600">+12.40%</span>
              </div>
              <div className="rounded-xl border border-gray-100 p-3 dark:border-slate-800">
                <WidgetTicker />
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                <MiniSymbolChart
                  symbol="BITSTAMP:BTCUSD"
                  title="BTCUSD (1M)"
                  colorTheme="light"
                />
                <MiniSymbolChart
                  symbol="BITSTAMP:ETHUSD"
                  title="ETHUSD (1M)"
                  colorTheme="light"
                />
                <MiniSymbolChart
                  symbol="BITSTAMP:XRPUSD"
                  title="XRPUSD (1M)"
                  colorTheme="light"
                />
              </div>
            </div>
            <div className="rounded-2xl bg-white p-4 sm:p-6 shadow-sm border border-gray-100 dark:border-slate-800 dark:bg-slate-900">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-sm sm:text-base font-semibold text-gray-800 dark:text-slate-100">Market Overview</h3>
              </div>
              <MarketView />
            </div>
          </div>
        )}

        {activeTab === "trading" && (
          <div className="space-y-4">
            <AutoTradingConfig
              rules={autoTradingRules}
              onUpdateRule={handleUpdateRule}
              availableBalance={total}
            />
          </div>
        )}

        {activeTab === "history" && (
          <div className="space-y-6">
            <div className="rounded-2xl border border-indigo-100 bg-indigo-50/60 p-4 sm:p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
                <p className="font-semibold text-indigo-900 dark:text-slate-100">Auto Trades (Active Rules)</p>
                <span className="text-xs text-indigo-600 dark:text-slate-400">Parameters from your setup</span>
              </div>
              {activeAutoTrades.length === 0 ? (
                <p className="mt-3 text-sm text-indigo-700 dark:text-slate-300">
                  No active auto-trade rules. Enable a rule to see it here.
                </p>
              ) : (
                <>
                  <div className="mt-4 space-y-3 sm:hidden">
                    {activeAutoTrades.map((trade) => (
                      <div
                        key={trade.id}
                        className="rounded-xl border border-indigo-100 bg-white/80 p-3 text-indigo-900 shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
                      >
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-semibold">{trade.pair}</p>
                          <span className="text-xs text-indigo-600 dark:text-slate-400">
                            {trade.timeline}
                          </span>
                        </div>
                        <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <p className="text-[10px] uppercase text-indigo-400">Trade Amount</p>
                            <p className="font-semibold">{trade.tradeAmount}</p>
                          </div>
                          <div>
                            <p className="text-[10px] uppercase text-indigo-400">Freeze</p>
                            <p className="font-semibold">{trade.freezeProtection}</p>
                          </div>
                          <div>
                            <p className="text-[10px] uppercase text-indigo-400">Buy Threshold</p>
                            <p className="font-semibold">{trade.buyThreshold}</p>
                          </div>
                          <div>
                            <p className="text-[10px] uppercase text-indigo-400">Sell Threshold</p>
                            <p className="font-semibold">{trade.sellThreshold}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 hidden overflow-x-auto sm:block">
                    <table className="w-full min-w-[640px] text-left text-xs sm:text-sm">
                      <thead>
                        <tr className="text-[#7b86b5] border-b border-indigo-100 dark:border-slate-800 dark:text-slate-500">
                          <th className="py-2 text-xs font-normal">Pair</th>
                          <th className="py-2 text-xs font-normal">Trade Amount</th>
                          <th className="py-2 text-xs font-normal">Buy Threshold</th>
                          <th className="py-2 text-xs font-normal">Sell Threshold</th>
                          <th className="py-2 text-xs font-normal">Freeze Protection</th>
                          <th className="py-2 text-xs font-normal">Timeline</th>
                        </tr>
                      </thead>
                      <tbody>
                        {activeAutoTrades.map((trade) => (
                          <tr key={trade.id} className="border-b border-indigo-100 text-sm text-indigo-900 dark:border-slate-800 dark:text-slate-200">
                            <td className="py-3 font-semibold">{trade.pair}</td>
                            <td className="py-3">{trade.tradeAmount}</td>
                            <td className="py-3">{trade.buyThreshold}</td>
                            <td className="py-3">{trade.sellThreshold}</td>
                            <td className="py-3">{trade.freezeProtection}</td>
                            <td className="py-3">{trade.timeline}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-blue-100 bg-blue-50/80 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <p className="text-xs font-semibold text-blue-600">Total Trades</p>
                <p className="mt-2 text-lg font-semibold text-blue-700">
                  {tradeStats.totalTrades}
                </p>
              </div>
              <div className="rounded-2xl border border-emerald-100 bg-emerald-50/80 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <p className="text-xs font-semibold text-emerald-600">Win Rate</p>
                <p className="mt-2 text-lg font-semibold text-emerald-700">
                  {tradeStats.winRate}%
                </p>
              </div>
              <div className="rounded-2xl border border-purple-100 bg-purple-50/80 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <p className="text-xs font-semibold text-purple-600">Realized P&L</p>
                <p className="mt-2 text-lg font-semibold text-purple-700">
                  {tradeStats.realizedPnL >= 0 ? "+" : "-"}$
                  {Math.abs(tradeStats.realizedPnL).toFixed(2)}
                </p>
              </div>
              <div className="rounded-2xl border border-orange-100 bg-orange-50/80 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <p className="text-xs font-semibold text-orange-600">Fees Paid</p>
                <p className="mt-2 text-lg font-semibold text-orange-700">
                  ${tradeStats.feesPaid.toFixed(2)}
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6 shadow-md dark:border-slate-800 dark:bg-slate-900">
              <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
                <div>
                  <p className="font-semibold text-gray-800 dark:text-slate-100">Trade History</p>
                  <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">
                    Latest executions and order activity
                  </p>
                </div>
              </div>

              <div className="mt-4 space-y-3 sm:hidden">
                {tradeHistory.map((trade) => (
                  <div
                    key={trade.id}
                    className="rounded-xl border border-gray-100 bg-white p-3 text-gray-700 shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-500 dark:text-slate-400">
                        {formatDateTime(trade.date)}
                      </p>
                      <span
                        className={`rounded-full px-2 py-1 text-[10px] font-semibold ${
                          trade.status === "Completed"
                            ? "bg-emerald-100 text-emerald-700"
                            : trade.status === "Cancelled"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {trade.status}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <p className="text-sm font-semibold text-gray-800 dark:text-slate-100">
                        {trade.pair}
                      </p>
                      <p
                        className={`text-sm font-semibold ${
                          trade.pnl.startsWith("+")
                            ? "text-emerald-600"
                            : trade.pnl.startsWith("-")
                            ? "text-red-600"
                            : "text-gray-500"
                        }`}
                      >
                        {trade.pnl}
                      </p>
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <p className="text-[10px] uppercase text-gray-400">Side</p>
                        <span
                          className={`inline-flex rounded-full px-2 py-1 text-[10px] font-semibold ${
                            trade.side === "Buy"
                              ? "bg-emerald-100 text-emerald-700"
                              : trade.side === "Sell"
                              ? "bg-red-100 text-red-700"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {trade.side}
                        </span>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase text-gray-400">Type</p>
                        <p className="font-semibold">{trade.type}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase text-gray-400">Amount</p>
                        <p className="font-semibold">{trade.amount}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase text-gray-400">Price</p>
                        <p className="font-semibold">
                          {trade.price && trade.price !== "-"
                            ? trade.price
                            : getLivePriceForPair(trade.pair) || "-"}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase text-gray-400">Fee</p>
                        <p className="font-semibold">{trade.fee}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 hidden overflow-x-auto rounded-2xl border border-gray-100 dark:border-slate-800 sm:block">
                <table className="w-full min-w-[720px] text-left text-xs sm:text-sm">
                  <thead className="bg-gray-50 dark:bg-slate-950">
                    <tr className="text-[#9ca3af] dark:text-slate-500">
                      <th className="py-3 px-3 font-semibold uppercase tracking-wide">Date</th>
                      <th className="py-3 px-3 font-semibold uppercase tracking-wide">Pair</th>
                      <th className="py-3 px-3 font-semibold uppercase tracking-wide">Side</th>
                      <th className="py-3 px-3 font-semibold uppercase tracking-wide">Type</th>
                      <th className="py-3 px-3 font-semibold uppercase tracking-wide">Amount</th>
                      <th className="py-3 px-3 font-semibold uppercase tracking-wide">Price</th>
                      <th className="py-3 px-3 font-semibold uppercase tracking-wide">Fee</th>
                      <th className="py-3 px-3 font-semibold uppercase tracking-wide">Status</th>
                      <th className="py-3 px-3 font-semibold uppercase tracking-wide">P&L</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tradeHistory.map((trade, index) => (
                      <tr
                        key={trade.id}
                        className={`border-b border-gray-100 text-gray-700 transition hover:bg-gray-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800 ${
                          index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                        } dark:bg-slate-900`}
                      >
                        <td className="py-3 px-3 whitespace-nowrap">{formatDateTime(trade.date)}</td>
                        <td className="py-3 px-3 font-semibold text-gray-800 dark:text-slate-100">
                          {trade.pair}
                        </td>
                        <td className="py-3 px-3">
                          <span
                            className={`rounded-full px-2 py-1 text-xs font-semibold ${
                              trade.side === "Buy"
                                ? "bg-emerald-100 text-emerald-700"
                                : trade.side === "Sell"
                                ? "bg-red-100 text-red-700"
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {trade.side}
                          </span>
                        </td>
                        <td className="py-3 px-3">{trade.type}</td>
                        <td className="py-3 px-3">{trade.amount}</td>
                        <td className="py-3 px-3">
                          {trade.price && trade.price !== "-"
                            ? trade.price
                            : getLivePriceForPair(trade.pair) || "-"}
                        </td>
                        <td className="py-3 px-3">{trade.fee}</td>
                        <td className="py-3 px-3">
                          <span
                            className={`rounded-full px-2 py-1 text-xs font-semibold ${
                              trade.status === "Completed"
                                ? "bg-emerald-100 text-emerald-700"
                                : trade.status === "Cancelled"
                                ? "bg-red-100 text-red-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {trade.status}
                          </span>
                        </td>
                        <td
                          className={`py-3 px-3 font-semibold ${
                            trade.pnl.startsWith("+")
                              ? "text-emerald-600"
                              : trade.pnl.startsWith("-")
                              ? "text-red-600"
                              : "text-gray-500"
                          }`}
                        >
                          {trade.pnl}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-4 sm:p-6 shadow-sm">
              <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
                <p className="font-semibold text-blue-900">Active Trades</p>
                <span className="text-xs text-blue-600">Auto-trading live</span>
              </div>
              {activeTrades.length === 0 ? (
                <p className="mt-3 text-sm text-blue-700">No active trades yet.</p>
              ) : (
                <>
                  <div className="mt-4 space-y-3 sm:hidden">
                    {activeTrades.map((trade) => (
                      <div
                        key={trade.id}
                        className="rounded-xl border border-blue-100 bg-white/80 p-3 text-blue-900 shadow-sm"
                      >
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-blue-600">{formatDateTime(trade.date)}</p>
                          <span className="rounded-full bg-yellow-100 px-2 py-1 text-[10px] font-semibold text-yellow-700">
                            {trade.status}
                          </span>
                        </div>
                        <div className="mt-2 flex items-center justify-between">
                          <p className="text-sm font-semibold">{trade.pair}</p>
                          <p className="text-xs font-semibold text-blue-600">{trade.side}</p>
                        </div>
                        <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <p className="text-[10px] uppercase text-blue-400">Type</p>
                            <p className="font-semibold">{trade.type}</p>
                          </div>
                          <div>
                            <p className="text-[10px] uppercase text-blue-400">Amount</p>
                            <p className="font-semibold">{trade.amount}</p>
                          </div>
                          <div>
                            <p className="text-[10px] uppercase text-blue-400">Price</p>
                            <p className="font-semibold">{trade.price}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 hidden overflow-x-auto sm:block">
                    <table className="w-full min-w-[640px] text-left text-xs sm:text-sm">
                      <thead>
                        <tr className="text-[#7b91b3] border-b border-blue-100">
                          <th className="py-2 text-xs font-normal">Date</th>
                          <th className="py-2 text-xs font-normal">Pair</th>
                          <th className="py-2 text-xs font-normal">Side</th>
                          <th className="py-2 text-xs font-normal">Type</th>
                          <th className="py-2 text-xs font-normal">Amount</th>
                          <th className="py-2 text-xs font-normal">Price</th>
                          <th className="py-2 text-xs font-normal">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {activeTrades.map((trade) => (
                          <tr key={trade.id} className="border-b border-blue-100 text-sm text-blue-900">
                            <td className="py-3 whitespace-nowrap">{formatDateTime(trade.date)}</td>
                            <td className="py-3 font-semibold">{trade.pair}</td>
                            <td className="py-3">{trade.side}</td>
                            <td className="py-3">{trade.type}</td>
                            <td className="py-3">{trade.amount}</td>
                            <td className="py-3">{trade.price}</td>
                            <td className="py-3">
                              <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-semibold text-yellow-700">
                                {trade.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </div>

            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4 sm:p-6 shadow-sm">
              <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
                <p className="font-semibold text-emerald-900">Completed Trades</p>
                <span className="text-xs text-emerald-600">Closed positions</span>
              </div>
              {completedTrades.length === 0 ? (
                <p className="mt-3 text-sm text-emerald-700">No completed trades yet.</p>
              ) : (
                <>
                  <div className="mt-4 space-y-3 sm:hidden">
                    {completedTrades.map((trade) => (
                      <div
                        key={trade.id}
                        className="rounded-xl border border-emerald-100 bg-white/80 p-3 text-emerald-900 shadow-sm"
                      >
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-emerald-600">{formatDateTime(trade.date)}</p>
                          <p
                            className={`text-sm font-semibold ${
                              trade.pnl.startsWith("+") ? "text-emerald-600" : "text-red-600"
                            }`}
                          >
                            {trade.pnl}
                          </p>
                        </div>
                        <div className="mt-2 flex items-center justify-between">
                          <p className="text-sm font-semibold">{trade.pair}</p>
                          <p className="text-xs font-semibold text-emerald-600">{trade.side}</p>
                        </div>
                        <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <p className="text-[10px] uppercase text-emerald-400">Type</p>
                            <p className="font-semibold">{trade.type}</p>
                          </div>
                          <div>
                            <p className="text-[10px] uppercase text-emerald-400">Amount</p>
                            <p className="font-semibold">{trade.amount}</p>
                          </div>
                          <div>
                            <p className="text-[10px] uppercase text-emerald-400">Price</p>
                            <p className="font-semibold">{trade.price}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 hidden overflow-x-auto sm:block">
                    <table className="w-full min-w-[640px] text-left text-xs sm:text-sm">
                      <thead>
                        <tr className="text-[#7fa79c] border-b border-emerald-100">
                          <th className="py-2 text-xs font-normal">Date</th>
                          <th className="py-2 text-xs font-normal">Pair</th>
                          <th className="py-2 text-xs font-normal">Side</th>
                          <th className="py-2 text-xs font-normal">Type</th>
                          <th className="py-2 text-xs font-normal">Amount</th>
                          <th className="py-2 text-xs font-normal">Price</th>
                          <th className="py-2 text-xs font-normal">P&L</th>
                        </tr>
                      </thead>
                      <tbody>
                        {completedTrades.map((trade) => (
                          <tr key={trade.id} className="border-b border-emerald-100 text-sm text-emerald-900">
                            <td className="py-3 whitespace-nowrap">{formatDateTime(trade.date)}</td>
                            <td className="py-3 font-semibold">{trade.pair}</td>
                            <td className="py-3">{trade.side}</td>
                            <td className="py-3">{trade.type}</td>
                            <td className="py-3">{trade.amount}</td>
                            <td className="py-3">{trade.price}</td>
                            <td className={`py-3 font-semibold ${
                              trade.pnl.startsWith("+") ? "text-emerald-600" : "text-red-600"
                            }`}>
                              {trade.pnl}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {activeTab === "transactions" && (
          <div className="bg-white rounded-2xl shadow-md p-6 text-sm text-gray-600">
            <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <p className="font-semibold text-gray-800">Transactions</p>
                <p className="mt-1">Deposits and withdrawals are shown below.</p>
              </div>
              <div className="flex w-full flex-wrap items-center gap-3 sm:w-auto">
                <label className="text-xs sm:text-sm text-gray-600">
                  Filter
                  <select
                    value={transactionFilter}
                    onChange={(event) => setTransactionFilter(event.target.value)}
                    className="ml-2 rounded-md border border-gray-200 bg-white px-2 py-1 text-xs sm:text-sm"
                  >
                    <option value="all">All</option>
                    <option value="Deposit">Deposits</option>
                    <option value="Withdrawal">Withdrawals</option>
                  </select>
                </label>
              </div>
              <Link
                to="/account/transactions"
                className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-white text-sm font-semibold hover:bg-blue-700 transition"
              >
                Open full list
              </Link>
            </div>

            <div className="mt-4 space-y-3 sm:hidden">
              {transactionsLoading ? (
                <div className="rounded-xl border border-gray-100 bg-white p-4 text-center text-sm text-gray-500">
                  Loading transactions...
                </div>
              ) : filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="rounded-xl border border-gray-100 bg-white p-3 text-gray-700 shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-[10px] font-semibold ${
                          transaction.type === "Deposit"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {transaction.type}
                      </span>
                      <span className="text-xs text-gray-500">
                        {transaction.date
                          ? new Date(transaction.date).toISOString().split("T")[0]
                          : "-"}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <p className="text-sm font-semibold">{transaction.amount}</p>
                      <p className="text-xs font-semibold text-gray-600">{transaction.status}</p>
                    </div>
                    <div className="mt-2 text-xs">
                      <p className="text-[10px] uppercase text-gray-400">Method</p>
                      <p className="font-semibold">{transaction.method}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-xl border border-gray-100 bg-white p-4 text-center text-sm text-gray-500">
                  No transactions available.
                </div>
              )}
            </div>

            <div className="mt-4 hidden overflow-x-auto sm:block">
              <table className="w-full min-w-[640px] text-left">
                <thead>
                  <tr className="text-[#9ca3af] border-b-[1px] border-[#e4e6ef]">
                    <th className="py-2 text-xs sm:text-sm font-normal">Type</th>
                    <th className="py-2 text-xs sm:text-sm font-normal">Amount</th>
                    <th className="py-2 text-xs sm:text-sm font-normal">Date</th>
                    <th className="py-2 text-xs sm:text-sm font-normal">Method</th>
                    <th className="py-2 text-xs sm:text-sm font-normal">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transactionsLoading ? (
                    <tr>
                      <td className="py-4 text-center text-sm" colSpan="5">
                        Loading transactions...
                      </td>
                    </tr>
                  ) : filteredTransactions.length > 0 ? (
                    filteredTransactions.map((transaction) => (
                      <tr key={transaction.id} className="border-b">
                        <td className="py-2 text-xs sm:text-sm">
                          <span
                            className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                              transaction.type === "Deposit"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {transaction.type}
                          </span>
                        </td>
                        <td className="py-2 text-xs sm:text-sm">{transaction.amount}</td>
                        <td className="py-2 text-xs sm:text-sm whitespace-nowrap">
                          {transaction.date
                            ? new Date(transaction.date).toISOString().split("T")[0]
                            : "-"}
                        </td>
                        <td className="py-2 text-xs sm:text-sm">{transaction.method}</td>
                        <td className="py-2 text-xs sm:text-sm">{transaction.status}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className="py-4 text-center text-sm" colSpan="5">
                        No transactions available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

    </section>
  );
};

export default Dashboard;
