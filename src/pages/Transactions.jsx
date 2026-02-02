import { useEffect, useMemo, useState } from "react";
import Footer from "./Footer";
import { auth } from "../firebase-config.js";
import { fetchDeposits, fetchWithdrawals } from "../services/transactions";

const Transactions = () => {
  const [deposits, setDeposits] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
      if (!authUser?.email) {
        setDeposits([]);
        setWithdrawals([]);
        return;
      }
      setIsLoading(true);
      try {
        const [{ deposits: userDeposits }, userWithdrawals] = await Promise.all([
          fetchDeposits(authUser.email),
          fetchWithdrawals(authUser.email),
        ]);
        setDeposits(userDeposits);
        setWithdrawals(userWithdrawals);
      } finally {
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const transactions = useMemo(() => {
    const depositRows = deposits.map((deposit) => ({
      id: deposit.id,
      type: "Deposit",
      amount: deposit.amount,
      date: deposit.date,
      method: deposit.method,
      status: deposit.imageUrl !== "" ? "Approved" : "Pending",
    }));

    const withdrawalRows = withdrawals.map((withdrawal) => ({
      id: withdrawal.id,
      type: "Withdrawal",
      amount: withdrawal.amount,
      date: withdrawal.createdAt
        ? new Date(withdrawal.createdAt).toISOString().split("T")[0]
        : "",
      method: withdrawal.asset,
      status: withdrawal.status || "Pending",
    }));

    return [...depositRows, ...withdrawalRows].sort((a, b) => {
      const aTime = a.date ? new Date(a.date).getTime() : 0;
      const bTime = b.date ? new Date(b.date).getTime() : 0;
      return bTime - aTime;
    });
  }, [deposits, withdrawals]);

  const filteredTransactions = useMemo(() => {
    if (activeTab === "deposits") {
      return transactions.filter((item) => item.type === "Deposit");
    }
    if (activeTab === "withdrawals") {
      return transactions.filter((item) => item.type === "Withdrawal");
    }
    return transactions;
  }, [activeTab, transactions]);
  
  
  return (
    <section className="bg-[#f4f7fe] min-h-screen flex flex-col px-4 sm:px-6 py-4 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="flex-1">
        <div className="bg-[#fff] my-6 rounded-2xl shadow-outline-white shadow-md border dark:border-slate-800 dark:bg-slate-900">
          <div className="w-full text-base sm:text-lg leading-6 sm:leading-7 px-4 sm:px-6 py-3 font-semibold">
            <h4>Transactions</h4>
          </div>
          <div className="px-4 sm:px-6">
            <div className="mb-4 flex flex-wrap gap-2">
              <button
                type="button"
                className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                  activeTab === "all"
                    ? "bg-[#3454f5] text-white"
                    : "bg-gray-100 text-gray-700 dark:bg-slate-800 dark:text-slate-200"
                }`}
                onClick={() => setActiveTab("all")}
              >
                All
              </button>
              <button
                type="button"
                className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                  activeTab === "deposits"
                    ? "bg-[#3454f5] text-white"
                    : "bg-gray-100 text-gray-700 dark:bg-slate-800 dark:text-slate-200"
                }`}
                onClick={() => setActiveTab("deposits")}
              >
                Deposits
              </button>
              <button
                type="button"
                className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                  activeTab === "withdrawals"
                    ? "bg-[#3454f5] text-white"
                    : "bg-gray-100 text-gray-700 dark:bg-slate-800 dark:text-slate-200"
                }`}
                onClick={() => setActiveTab("withdrawals")}
              >
                Withdrawals
              </button>
            </div>
            <div className="flex flex-wrap justify-between mb-4 sm:mb-6 gap-3">
              <div className="flex items-center">
                <label>
                  Show
                  <select className="mx-[5px] dark:bg-slate-900 dark:text-slate-100 dark:border-slate-700">
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                  </select>
                  <span>entries</span>
                </label>
              </div>
              <div className="flex items-center">
                <label>
                  Search:
                  <input type="search" name="" id="" className="ml-[5px] dark:bg-slate-900 dark:text-slate-100 dark:border-slate-700" />
                </label>
              </div>
            </div>
            <div className="overflow-x-auto rounded-2xl border border-gray-100 dark:border-slate-800">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="bg-gray-50 text-[#9ca3af] dark:bg-slate-950 dark:text-slate-500">
                    <th className="py-3 px-3 font-semibold uppercase tracking-wide">
                      Transaction ID
                    </th>
                    <th className="py-3 px-3 font-semibold uppercase tracking-wide">
                      Amount
                    </th>
                    <th className="py-3 px-3 font-semibold uppercase tracking-wide">
                      Date
                    </th>
                    <th className="py-3 px-3 font-semibold uppercase tracking-wide">
                      Type
                    </th>
                    <th className="py-3 px-3 font-semibold uppercase tracking-wide">
                      Method
                    </th>
                    <th className="py-3 px-3 font-semibold uppercase tracking-wide">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.length > 0 ? (
                    filteredTransactions.map((transaction, index) => (
                      <tr
                        key={`${transaction.type}-${transaction.id}`}
                        className={`border-b transition duration-300 ease-in-out hover:bg-gray-50 dark:border-slate-800 dark:hover:bg-slate-800 ${
                          index % 2 === 0 ? "bg-white" : "bg-gray-50/60"
                        } dark:bg-slate-900`}
                      >
                        <td className="py-3 px-3">
                          {transaction.id}
                        </td>
                        <td className="py-3 px-3 font-semibold text-slate-800 dark:text-slate-100">
                          {transaction.amount}
                        </td>
                        <td className="py-3 px-3 whitespace-nowrap">
                          {transaction.date}
                        </td>
                        <td className="py-3 px-3">
                          {transaction.type}
                        </td>
                        <td className="py-3 px-3">
                          {transaction.method}
                        </td>
                        <td className="py-3 px-3">
                          <span
                            className={`rounded-full px-2 py-1 text-xs font-semibold ${
                              transaction.status === "Approved" ||
                              transaction.status === "Completed"
                                ? "bg-emerald-100 text-emerald-700"
                                : transaction.status === "Cancelled"
                                ? "bg-red-100 text-red-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {transaction.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className="text-center px-6 py-6 text-sm" colSpan="6">
                        {isLoading
                          ? "Loading transactions..."
                          : "No data available in table"}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default Transactions;
