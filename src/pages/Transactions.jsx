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
        <div className="bg-[#fff] my-6 rounded-lg shadow-outline-white shadow-md border dark:border-slate-800 dark:bg-slate-900">
          <div className="w-full text-base sm:text-lg leading-6 sm:leading-7 px-4 sm:px-6 py-2 sm:py-3 font-semibold">
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
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[#9ca3af] border-b-[1px] border-[#e4e6ef] dark:border-slate-800 dark:text-slate-500">
                    <th className="py-2 sm:py-3 text-xs sm:text-sm font-normal">
                      Transaction ID
                    </th>
                    <th className="py-2 sm:py-3 text-xs sm:text-sm font-normal">
                      Amount
                    </th>
                    <th className="py-2 sm:py-3 text-xs sm:text-sm font-normal">
                      Date
                    </th>
                    <th className="py-2 sm:py-3 text-xs sm:text-sm font-normal">
                      Type
                    </th>
                    <th className="py-2 sm:py-3 text-xs sm:text-sm font-normal">
                      Method
                    </th>
                    <th className="py-2 sm:py-3 text-xs sm:text-sm font-normal">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.length > 0 ? (
                    filteredTransactions.map((transaction) => (
                      <tr
                        key={`${transaction.type}-${transaction.id}`}
                        className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100 dark:bg-slate-900 dark:border-slate-800 dark:hover:bg-slate-800"
                      >
                        <td className="py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm">
                          {transaction.id}
                        </td>
                        <td className="py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm">
                          {transaction.amount}
                        </td>
                        <td className="py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm whitespace-nowrap">
                          {transaction.date}
                        </td>
                        <td className="py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm">
                          {transaction.type}
                        </td>
                        <td className="py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm">
                          {transaction.method}
                        </td>
                        <td className="py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm">
                          {transaction.status}
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
