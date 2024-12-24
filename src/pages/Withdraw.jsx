import { useState, useMemo, useEffect, Suspense } from "react";
import BTC from "../assets/BTC.svg";
import ETH from "../assets/ETH.svg";
import USDT from "../assets/USDT.svg";
import Footer from "./Footer";
import PreLoader from "../components/PreLoader";
import { toast } from "react-toastify";
import { auth, db } from "../firebase-config";
import { getDoc, doc, collection, addDoc, getDocs } from "firebase/firestore";

const Withdraw = () => {
  const [selectedAsset, setSelectedAsset] = useState("BTC");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const [withdrawals, setWithdrawals] = useState([]);
  const [selectedWithdrawal, setSelectedWithdrawal] = useState(null);
  const [amount, setAmount] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [action, setAction] = useState("Pending");

  useEffect(() => {
    // Fetch withdrawals from Firestore when the component mounts
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    const fetchWithdrawals = async () => {
      if (user.email) {
        setLoading(true);
        const withdrawalCollection = collection(
          db,
          "Users",
          user.email,
          "Withdrawals"
        );
        const withdrawalSnapshot = await getDocs(withdrawalCollection);
        const withdrawalList = withdrawalSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setWithdrawals(withdrawalList);
      }
    };
    fetchWithdrawals();
  }, [user.email]);

  const handleAssetChange = (event) => {
    setSelectedAsset(event.target.value);
  };

  const handleViewStatus = (withdrawal) => {
    setSelectedWithdrawal(withdrawal);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!walletAddress || !amount) {
      toast.error("Please fill in all fields.");
      return;
    }

    const newWithdrawal = {
      asset: selectedAsset,
      amount: `${amount} ${selectedAsset}`,
      status: "Pending",
      action:
        "Your withdrawals is being processed, this may take 2-3 working days",
      walletAddress,
      user: user.email,
    };

    try {
      const docRef = await addDoc(
        collection(db, "Users", user.email, "Withdrawals"),
        newWithdrawal
      );
      setWithdrawals([...withdrawals, { id: docRef.id, ...newWithdrawal }]);
      setWalletAddress("");
      setAmount("");
      toast.success("Withdrawal request submitted successfully!");
    } catch (error) {
      console.error("Error adding withdrawal: ", error);
      toast.error("Error submitting withdrawal request. Please try again.");
    }
  };

  const getAssetDetails = () => {
    switch (selectedAsset) {
      case "BTC":
        return { label: "Bitcoin", icon: BTC, name: "bitcoin_wallet" };
      case "ETH":
        return { label: "Ethereum", icon: ETH, name: "ethereum_wallet" };
      case "USDT":
        return { label: "USDT(Tether)", icon: USDT, name: "usdt_wallet" };
      default:
        return { label: "Bitcoin", icon: BTC, name: "bitcoin_wallet" };
    }
  };

  const totalSum = sessionStorage.getItem("totalAmount") || 0;
  const assetDetails = getAssetDetails();
  const total = useMemo(() => {
    // Ensure both totalSum and user.profit are numbers
    const totalSumNumber = parseFloat(totalSum);
    const userProfitNumber = parseFloat(user.profit);

    // Check if the conversion was successful (isNaN returns true if the value is NaN)
    const validTotalSum = isNaN(totalSumNumber) ? 0 : totalSumNumber;
    const validUserProfit = isNaN(userProfitNumber) ? 0 : userProfitNumber;

    return validTotalSum + validUserProfit;
  }, [totalSum, user.profit]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        const docRef = doc(db, "Users", authUser.email);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUser(docSnap.data());
        }
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Suspense fallback={<PreLoader/>}>
        <div className="flex flex-col min-h-screen">
          <main className="flex-grow bg-[#f4f7fe]">
            <section className="flex flex-wrap justify-center">
              <div className="w-full lg:w-1/2 px-4 text-base font-normal mb-2">
                <div className="mt-6 bg-white rounded-lg shadow-md">
                  <div className="block p-8">
                    <div>
                      <span>
                        <canvas
                          width="77"
                          height="43"
                          className="inline-block w-[77px] h-[43px] float-right mr-2.5"
                        ></canvas>
                      </span>
                    </div>
                    <h3 className="text-2xl mb-[20px] font-semibold">
                      ${total.toFixed(2)}
                    </h3>
                    <div className="text-gray-700 text-opacity-50">
                      Total Sum
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full mt-7 lg:w-1/2 px-4 text-base font-normal mb-2">
                <div className="bg-white rounded-lg shadow-md mb-8">
                  <div className="px-8 text-2xl py-4">
                    <h4>
                      <strong>{assetDetails.label} Withdrawal</strong>
                    </h4>
                  </div>
                  <div className="p-8">
                    <div className="flex flex-wrap justify-between mb-5">
                      <label className="font-bold text-lg">Select Asset:</label>
                      <select
                        value={selectedAsset}
                        onChange={handleAssetChange}
                        className="border rounded px-4 py-2"
                      >
                        <option value="BTC">Bitcoin (BTC)</option>
                        <option value="ETH">Ethereum (ETH)</option>
                        <option value="USDT">USDT (Tether)</option>
                      </select>
                    </div>
                    <form
                      className="flex flex-col gap-6"
                      onSubmit={handleSubmit}
                    >
                      <div className="flex flex-col gap-2 flex-wrap justify-between">
                        <label className="flex gap-2">
                          <img
                            src={assetDetails.icon}
                            alt={selectedAsset.toLowerCase()}
                          />
                          <div className="flex items-center">
                            <strong>{selectedAsset}</strong>
                          </div>
                        </label>
                        <div className="w-full lg:w-5/6 mt-2.5 lg:mt-0">
                          <input
                            className="border w-full rounded px-4 py-2"
                            name={assetDetails.name}
                            type="text"
                            placeholder="Wallet Address"
                            value={walletAddress}
                            onChange={(e) => setWalletAddress(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="flex flex-wrap justify-between font-bold">
                        <label>Amount (Fiat)</label>
                        <div className="w-full lg:w-5/6 mt-2.5 lg:mt-0">
                          <input
                            className="w-full border rounded px-4 py-2"
                            name="amount"
                            type="number"
                            placeholder="Amount limit: $0.00"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="hidden flex-wrap justify-between font-bold">
                        <label>Action</label>
                        <div className="w-full lg:w-5/6 mt-2.5 lg:mt-0">
                          <input
                            className="w-full border rounded px-4 py-2"
                            name="action"
                            type="text"
                            placeholder="pending"
                            value={action}
                            onChange={(e) => setAction(e.target.value)}
                          />
                        </div>
                      </div>
                      <button className="bg-[#3454f5] hover:bg-blue-700 text-base text-white px-6 py-2 rounded mt-5">
                        {loading ? "..." : "Submit"}
                      </button>
                    </form>
                  </div>
                </div>
              </div>

              {/* Withdrawals Table */}
              <div className="w-full px-4 mb-8">
                <div className="bg-white rounded-lg shadow-md">
                  <div className="px-8 py-4">
                    <h4 className="text-2xl font-bold">Withdrawals</h4>
                  </div>
                  <div className="p-8">
                    <div className="overflow-x-auto">
                      <table className="min-w-full bg-white">
                        <thead className="text-gray-400">
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
                              <tr key={withdrawal.id}>
                                <td className="py-2 px-4 border-b text-center">
                                  {withdrawal.asset}
                                </td>
                                <td className="py-2 px-4 border-b text-center">
                                  {withdrawal.amount}
                                </td>
                                <td className="py-2 px-4 border-b text-center">
                                  {new Date().toISOString().split("T")[0]}
                                </td>
                                <td className="py-2 px-4 border-b text-center">
                                  {withdrawal.status}
                                </td>
                                <td className="py-2 px-4 border-b text-center">
                                  <button
                                    className="bg-blue-500 text-white px-4 py-2 rounded"
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
                              <td
                                className="py-2 px-4 border-b text-center"
                                colSpan="5"
                              >
                                <div className="text-center text-gray-500">
                                  No data available
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

              {/* Withdrawal Status Modal */}
              {selectedWithdrawal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
                  <div className="bg-white p-8 rounded-lg shadow-md">
                    <h4 className="text-2xl font-bold mb-4">
                      Withdrawal Status
                    </h4>
                    <p className="italic text-[24px]">
                      <strong>Action:</strong> {selectedWithdrawal.action}
                    </p>
                    <p>
                      <strong>Asset:</strong> {selectedWithdrawal.asset}
                    </p>
                    <p>
                      <strong>Amount:</strong> {selectedWithdrawal.amount}
                    </p>
                    <p>
                      <strong>Status:</strong> {selectedWithdrawal.status}
                    </p>
                    <button
                      className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
                      onClick={() => setSelectedWithdrawal(null)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </section>
          </main>
          <Footer />
        </div>
        </Suspense>
  );
};

export default Withdraw;
