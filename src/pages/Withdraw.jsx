import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../firebase-config";
import { createWithdrawal, fetchWithdrawals, getUserProfile } from "../services/transactions";
import { validateWithdrawal } from "../validation/transactionValidation";
import { useAutoTrade } from "../hooks/useAutoTrade";

const CRYPTO_OPTIONS = [
  { value: "BTC", label: "Bitcoin (BTC)" },
  { value: "ETH", label: "Ethereum (ETH)" },
  { value: "USDT", label: "Tether (USDT)" },
  { value: "SOL", label: "Solana (SOL)" },
];

const Withdraw = () => {
  const { isFrozen } = useAutoTrade();
  const [amount, setAmount] = useState("");
  const [asset, setAsset] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({});
  const [withdrawals, setWithdrawals] = useState([]);
  const [selectedWithdrawal, setSelectedWithdrawal] = useState(null);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const totalSum = sessionStorage.getItem("totalAmount") || 0;
  const total = useMemo(() => {
    const totalSumNumber = parseFloat(totalSum);
    const userProfitNumber = parseFloat(user.profit);
    const validTotalSum = isNaN(totalSumNumber) ? 0 : totalSumNumber;
    const validUserProfit = isNaN(userProfitNumber) ? 0 : userProfitNumber;
    return validTotalSum + validUserProfit;
  }, [totalSum, user.profit]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
      if (!authUser?.email) {
        return;
      }
      const profile = await getUserProfile(authUser.email);
      if (profile) {
        setUser(profile);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const loadWithdrawals = async () => {
      if (!user?.email) return;
      setIsLoading(true);
      try {
        const withdrawalList = await fetchWithdrawals(user.email);
        setWithdrawals(withdrawalList);
      } finally {
        setIsLoading(false);
      }
    };

    loadWithdrawals();
  }, [user?.email]);

  const handleViewStatus = (withdrawal) => {
    setSelectedWithdrawal(withdrawal);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!asset || !amount || !address) {
      toast.error("Please fill all fields");
      return;
    }

    const validationErrors = validateWithdrawal({
      amount,
      walletAddress: address,
      availableBalance: total,
    });
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    if (!user?.email) {
      toast.error("No authenticated user found.");
      return;
    }

    const newWithdrawal = {
      asset,
      amount: `${amount} ${asset}`,
      status: "Pending",
      action:
        "Your withdrawals is being processed, this may take 2-3 working days",
      walletAddress: address,
      user: user.email,
      createdAt: new Date().toISOString(),
    };

    try {
      setLoading(true);
      const savedWithdrawal = await createWithdrawal({
        email: user.email,
        data: newWithdrawal,
      });
      setWithdrawals((prev) => [...prev, savedWithdrawal]);
      setAddress("");
      setAmount("");
      setAsset("");
      toast.success("Withdrawal request submitted successfully!");
    } catch (error) {
      console.error("Error adding withdrawal: ", error);
      toast.error("Error submitting withdrawal request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-[#f4f7fe] px-4 sm:px-6 py-6 min-h-screen text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="max-w-3xl mx-auto">
        <button
          type="button"
          className="mb-6 inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
          onClick={() => navigate("/dashboard")}
        >
          Back to Dashboard
        </button>

        <div className="rounded-2xl border-2 shadow-2xl bg-white dark:border-slate-800 dark:bg-slate-900">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-t-2xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-white/20 p-3 rounded-lg">
                <span className="text-white text-lg font-bold">$</span>
              </div>
              <h1 className="text-3xl font-bold">Withdraw Crypto</h1>
            </div>
            <p className="text-orange-50">
              Withdraw funds from your trading account to your wallet
            </p>
          </div>

          <div className="p-6">
            {isFrozen && (
              <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
                Trading is paused because the market is falling. Withdrawals are temporarily frozen until the market rises.
              </div>
            )}

            <div className="mb-6 rounded-xl border border-orange-300 bg-gradient-to-r from-orange-50 to-red-50 p-4 text-sm text-orange-900 dark:border-orange-500/40 dark:from-orange-500/10 dark:to-red-500/10 dark:text-orange-200">
              Make sure the wallet address is correct. Transactions cannot be reversed.
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="asset" className="text-sm font-semibold text-gray-700 dark:text-slate-300">
                  Select Cryptocurrency
                </label>
                <select
                  id="asset"
                  value={asset}
                  onChange={(event) => setAsset(event.target.value)}
                  className="h-11 w-full rounded-lg border-2 border-gray-200 px-3 text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                >
                  <option value="">Select an asset</option>
                  {CRYPTO_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.asset && (
                  <p className="text-xs text-red-600">{errors.asset}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="address" className="text-sm font-semibold text-gray-700 dark:text-slate-300">
                  Wallet Address
                </label>
                <input
                  id="address"
                  type="text"
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                  className="h-11 w-full rounded-lg border-2 border-gray-200 px-3 text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                  placeholder="Enter wallet address"
                />
                {errors.walletAddress && (
                  <p className="text-xs text-red-600">{errors.walletAddress}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="amount" className="text-sm font-semibold text-gray-700 dark:text-slate-300">
                  Amount
                </label>
                <input
                  id="amount"
                  type="number"
                  min="0"
                  step="any"
                  value={amount}
                  onChange={(event) => setAmount(event.target.value)}
                  className="h-11 w-full rounded-lg border-2 border-gray-200 px-3 text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                  placeholder="0.00"
                />
                {errors.amount && (
                  <p className="text-xs text-red-600">{errors.amount}</p>
                )}
              </div>

              <button
                type="submit"
                className="h-11 w-full rounded-lg bg-gradient-to-r from-orange-500 to-red-500 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
                disabled={loading || isFrozen}
              >
                {loading ? "Submitting..." : "Submit Withdrawal"}
              </button>
            </form>
          </div>
        </div>

        <div className="mt-10 rounded-2xl border-2 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900">
          <div className="border-b border-gray-100 p-6 dark:border-slate-800">
            <h2 className="text-xl font-bold text-gray-900 dark:text-slate-100">Withdrawals</h2>
            <p className="text-sm text-gray-500 dark:text-slate-400">
              Review your recent withdrawal requests.
            </p>
          </div>
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white dark:bg-slate-900">
                <thead className="text-gray-400 dark:text-slate-500">
                  <tr>
                    <th className="py-2 px-4 border-b">Asset</th>
                    <th className="py-2 px-4 border-b">Amount</th>
                    <th className="py-2 px-4 border-b">Date</th>
                    <th className="py-2 px-4 border-b">Status</th>
                    <th className="py-2 px-4 border-b">Actions</th>
                          </tr>
                        </thead>
                {withdrawals.length > 0 ? (
                  <tbody>
                    {withdrawals.map((withdrawal) => (
                      <tr key={withdrawal.id ?? `${withdrawal.asset}-${withdrawal.createdAt}`}>
                        <td className="py-2 px-4 border-b text-center">
                          {withdrawal.asset}
                        </td>
                        <td className="py-2 px-4 border-b text-center">
                          {withdrawal.amount}
                        </td>
                        <td className="py-2 px-4 border-b text-center">
                          {(withdrawal.createdAt
                            ? new Date(withdrawal.createdAt)
                            : new Date()
                          )
                            .toISOString()
                            .split("T")[0]}
                        </td>
                        <td className="py-2 px-4 border-b text-center">
                          {withdrawal.status}
                        </td>
                        <td className="py-2 px-4 border-b text-center">
                          <button
                            type="button"
                            className="rounded bg-blue-500 px-4 py-2 text-white"
                            onClick={() => handleViewStatus(withdrawal)}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                ) : (
                  <tbody>
                    <tr>
                      <td className="py-2 px-4 border-b text-center" colSpan="5">
                        <div className="text-center text-gray-500">
                          {isLoading ? "Loading withdrawals..." : "No data available"}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                )}
              </table>
            </div>
          </div>
        </div>
      </div>

      {selectedWithdrawal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-600/50 px-4">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-md dark:bg-slate-900 dark:text-slate-100">
            <h4 className="mb-4 text-2xl font-bold">Withdrawal Status</h4>
            <p className="mb-3 text-sm text-gray-600">
              <strong>Action:</strong> {selectedWithdrawal.action}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Asset:</strong> {selectedWithdrawal.asset}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Amount:</strong> {selectedWithdrawal.amount}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Status:</strong> {selectedWithdrawal.status}
            </p>
            <button
              type="button"
              className="mt-4 rounded bg-red-500 px-4 py-2 text-white"
              onClick={() => setSelectedWithdrawal(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Withdraw;
