import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { auth } from "../firebase-config";
import { createDeposit, fetchDeposits } from "../services/transactions";
import { validateDeposit } from "../validation/transactionValidation";
import { useAutoTrade } from "../hooks/useAutoTrade";

const CRYPTO_OPTIONS = [
  { value: "BTC", label: "Bitcoin (BTC)", address: "bc1qrfk2cy9qwf7l69cxcqw62tae8k3wqk4twns5aq" },
  { value: "ETH", label: "Ethereum (ETH)", address: "0x885746a14b370D4FE3AbEb2D94d5936a4ce311fE" },
  { value: "USDT", label: "Tether (USDT)", address: "0x885746a14b370D4FE3AbEb2D94d5936a4ce311fE" },
  { value: "SOL", label: "Solana (SOL)", address: "AdFEtPTfFC5QqE9Lrm1YCNWHTExPMQ6gDRaKKkn9JhLv" },
];

const Deposit = () => {
  const { isFrozen } = useAutoTrade();
  const [amount, setAmount] = useState("");
  const [asset, setAsset] = useState("");
  const [receipt, setReceipt] = useState(null);
  const [loading, setLoading] = useState(false);  const [copied, setCopied] = useState(false);
  const [deposits, setDeposits] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [errors, setErrors] = useState({});

  const selectedAsset = CRYPTO_OPTIONS.find((option) => option.value === asset);

  const handleReceiptChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "application/pdf"];
    if (!validTypes.includes(file.type)) {
      toast.error("Invalid file type. Please upload an image or PDF.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB");
      return;
    }

    setReceipt(file);
    setErrors((prev) => ({ ...prev, image: undefined }));
    toast.success("Receipt attached");
  };

  const removeReceipt = () => {
    setReceipt(null);
    toast.info("Receipt removed");
  };

  const loadDeposits = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const { deposits: userDeposits, total } = await fetchDeposits(user.email);
    setDeposits(userDeposits);
    setTotalAmount(total);
    sessionStorage.setItem("totalAmount", total);
  };

  useEffect(() => {
    loadDeposits();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isFrozen) {
      toast.error("Deposits are temporarily frozen.");
      return;
    }

    const validationErrors = validateDeposit({
      amount,
      method: asset,
      image: receipt,
    });

    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      toast.error("No user is authenticated.");
      return;
    }

    setLoading(true);
    try {
      let imageUrl = "";
      if (receipt) {
        const formData = new FormData();
        formData.append("file", receipt);
        formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

        const uploadResponse = await axios.post(
          `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/auto/upload`,
          formData
        );
        imageUrl = uploadResponse?.data?.secure_url || "";
      }

      await createDeposit({
        email: user.email,
        values: {
          profit: "",
          amount,
          method: selectedAsset?.label || asset,
          date: new Date().toISOString().split("T")[0],
          uid: user.uid,
        },
        imageUrl,
      });

      toast.success("Deposit submitted for review");
      setAmount("");
      setAsset("");
      setReceipt(null);
      setCopied(false);
      await loadDeposits();
    } catch (error) {
      toast.error("Invalid input. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyAddress = () => {
    if (!selectedAsset) return;
    navigator.clipboard.writeText(selectedAsset.address);
    setCopied(true);
    toast.success("Address copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="bg-[#f4f7fe] px-4 sm:px-6 py-6 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 rounded-2xl border bg-white p-5 shadow-md dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#1f2937] dark:text-slate-100">Deposit Crypto</h1>
              <p className="text-sm text-gray-500 dark:text-slate-400">
                Add funds to your trading account by depositing cryptocurrency
              </p>
            </div>
            <div className="rounded-full bg-emerald-100 px-4 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
              Manual Verification
            </div>
          </div>
        </div>

        {isFrozen && (
          <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
            Trading is paused because the market is falling. Deposits are temporarily frozen until the market rises.
          </div>
        )}

        <div className="rounded-2xl border bg-white p-5 shadow-md dark:border-slate-800 dark:bg-slate-900">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="asset" className="text-sm font-medium text-gray-700 dark:text-slate-300">
                Select Cryptocurrency
              </label>
              <select
                id="asset"
                value={asset}
                onChange={(event) => {
                  setAsset(event.target.value);
                  setErrors((prev) => ({ ...prev, method: undefined }));
                }}
                className="h-11 w-full rounded-lg border border-gray-200 px-3 text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                aria-invalid={Boolean(errors.method)}
                aria-describedby={errors.method ? "asset-error" : undefined}
                disabled={loading}
              >
                <option value="">Choose crypto</option>
                {CRYPTO_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.method && (
                <p id="asset-error" className="text-xs text-red-600">
                  {errors.method}
                </p>
              )}
            </div>

            {selectedAsset && (
              <div className="space-y-2 rounded-xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-500/30 dark:bg-emerald-500/10">
                <label className="text-sm font-semibold text-emerald-900 dark:text-emerald-200">Deposit Address</label>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <input
                    value={selectedAsset.address}
                    readOnly
                    className="w-full rounded-lg border border-emerald-200 bg-white px-3 py-2 text-sm font-mono dark:border-emerald-500/30 dark:bg-slate-900 dark:text-slate-100"
                  />
                  <button
                    type="button"
                    onClick={copyAddress}
                    className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
                  >
                    {copied ? "Copied" : "Copy"}
                  </button>
                </div>
                <p className="text-xs text-emerald-700 dark:text-emerald-200">Send {selectedAsset.label} to this address</p>
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="amount" className="text-sm font-medium text-gray-700 dark:text-slate-300">
                Amount (USD equivalent)
              </label>
              <input
                id="amount"
                type="number"
                placeholder="0.00"
                step="0.01"
                min="0"
                value={amount}
                onChange={(event) => {
                  setAmount(event.target.value);
                  setErrors((prev) => ({ ...prev, amount: undefined }));
                }}
                required
                disabled={loading}
                className="h-11 w-full rounded-lg border border-gray-200 px-3 text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                aria-invalid={Boolean(errors.amount)}
                aria-describedby={errors.amount ? "amount-error" : undefined}
              />
              {errors.amount && (
                <p id="amount-error" className="text-xs text-red-600">
                  {errors.amount}
                </p>
              )}
              <p className="text-xs text-gray-500 dark:text-slate-400">Enter the USD value of your deposit</p>
            </div>

            <div className="space-y-2">
              <label htmlFor="receipt" className="text-sm font-medium text-gray-700 dark:text-slate-300">
                Transaction Receipt <span className="text-red-500">*</span>
              </label>
              {!receipt ? (
                <div className="rounded-xl border border-dashed border-blue-300 bg-blue-50 p-4 text-center dark:border-blue-500/40 dark:bg-blue-500/10">
                  <input
                    id="receipt"
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleReceiptChange}
                    disabled={loading}
                    className="hidden"
                  />
                  <button
                    type="button"
                    className="w-full rounded-lg border border-blue-200 bg-white px-4 py-3 text-sm font-semibold text-blue-700 hover:border-blue-400 dark:border-blue-500/30 dark:bg-slate-900 dark:text-blue-200"
                    onClick={() => document.getElementById("receipt")?.click()}
                    disabled={loading}
                  >
                    Click to upload receipt (PNG, JPG, GIF or PDF)
                  </button>
                  <p className="mt-2 text-xs text-gray-500">Max file size: 5MB</p>
                </div>
              ) : (
                <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                  <div>
                    <p className="text-sm font-semibold text-emerald-900">{receipt.name}</p>
                    <p className="text-xs text-emerald-700">{(receipt.size / 1024).toFixed(2)} KB</p>
                  </div>
                  <button
                    type="button"
                    className="rounded-lg border border-emerald-300 px-3 py-1 text-xs font-semibold text-emerald-700 hover:bg-emerald-100"
                    onClick={removeReceipt}
                    disabled={loading}
                  >
                    Remove
                  </button>
                </div>
              )}
              {errors.image && <p className="text-xs text-red-600">{errors.image}</p>}
              <p className="text-xs text-gray-500">
                Upload a screenshot or receipt of your transaction
              </p>
            </div>

            <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-xs text-blue-900">
              <strong>Note:</strong> Please upload a receipt showing your transaction details. This helps us verify your
              deposit and process it faster. Your deposit will be credited after manual verification.
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-gradient-to-r from-emerald-500 to-green-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-200 transition hover:from-emerald-600 hover:to-green-700 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={loading || isFrozen}
            >
              {loading ? "Submitting..." : "Confirm Deposit"}
            </button>
          </form>
        </div>

        <div className="mt-6 rounded-2xl border bg-white p-5 shadow-md dark:border-slate-800 dark:bg-slate-900">
          <div className="w-full text-base sm:text-lg leading-6 sm:leading-7 font-semibold">
            <h4>Deposit Transactions</h4>
          </div>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[#9ca3af] border-b-[1px] border-[#e4e6ef]">
                  <th className="py-2 sm:py-3 text-xs sm:text-sm font-normal">Transaction ID</th>
                  <th className="py-2 sm:py-3 text-xs sm:text-sm font-normal">Amount</th>
                  <th className="py-2 sm:py-3 text-xs sm:text-sm font-normal">Date</th>
                  <th className="py-2 sm:py-3 text-xs sm:text-sm font-normal">Method</th>
                  <th className="py-2 sm:py-3 text-xs sm:text-sm font-normal">Status</th>
                </tr>
              </thead>
              <tbody>
                {deposits.length > 0 ? (
                  deposits.map((deposit) => (
                    <tr key={deposit.id}>
                      <td className="py-2 sm:py-3 text-xs sm:text-sm">{deposit.id}</td>
                      <td className="py-2 sm:py-3 text-xs sm:text-sm">{deposit.amount}</td>
                      <td className="py-2 sm:py-3 text-xs sm:text-sm whitespace-nowrap">{deposit.date}</td>
                      <td className="py-2 sm:py-3 text-xs sm:text-sm">{deposit.method}</td>
                      <td className="py-2 sm:py-3 text-xs sm:text-sm">
                        {deposit.imageUrl !== "" ? "Approved" : "Pending"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="text-center px-6 py-6 text-sm" colSpan="5">
                      No data available in table
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className="mt-4">
              <strong>Total Amount: ${totalAmount.toFixed(2)}</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Deposit;
