import { useState, useEffect, Suspense } from "react";
import Footer from "./Footer";
import { collection, getDocs, query } from "firebase/firestore";
import { auth, db } from "../firebase-config.js";
import PreLoader from "../components/PreLoader.jsx";

const Transactions = () => {
  const [deposits, setDeposits] = useState([]);

  useEffect(() => {
    // Simulate a loading delay
    // const timer = setTimeout(() => {
    // }, 2000); // Adjust this delay as needed

    auth.onAuthStateChanged(async (deposit) => {
      const q = query(collection(db, "Users", deposit.email, "Deposits"));
      const querySnapshot = await getDocs(q);
      const userDeposits = [];
      querySnapshot.forEach((doc) => {
        userDeposits.push({ ...doc.data(), id: doc.id });
      });
      setDeposits(userDeposits);
    });
    // return () => clearTimeout(timer);
  }, []);
  
  
  return (
    <Suspense fallback={<PreLoader/>}>
    <section className="bg-[#f4f7fe] min-h-screen flex flex-col">
      <div className="flex-1">
        <div className="bg-[#fff] mx-[15px] lg:mx-[35px] my-[30px] rounded-lg shadow-outline-white shadow-md border">
          <div className="w-full text-[16px] lg:text-[20px] leading-[24px] lg:leading-[30px] px-[15px] lg:px-[30px] py-[10px] lg:py-[15px] font-semibold">
            <h4>Transactions</h4>
          </div>
          <div className="px-[15px] lg:px-[30px]">
            <div className="flex flex-wrap justify-between mb-[15px] lg:mb-[30px]">
              <div className="flex items-center mb-[10px] lg:mb-0">
                <label>
                  Show
                  <select className="mx-[5px]">
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
                  <input type="search" name="" id="" className="ml-[5px]" />
                </label>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[#9ca3af] border-b-[1px] border-[#e4e6ef]">
                    <th className="py-[10px] lg:py-[15px] text-[14px] font-normal">
                      Transaction ID
                    </th>
                    <th className="py-[10px] lg:py-[15px] text-[14px] font-normal">
                      Amount
                    </th>
                    <th className="py-[10px] lg:py-[15px] text-[14px] font-normal">
                      Date
                    </th>
                    <th className="py-[10px] lg:py-[15px] text-[14px] font-normal">
                      Method
                    </th>
                    <th className="py-[10px] lg:py-[15px] text-[14px] font-normal">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {deposits.length > 0 ? (
                    deposits.map((deposit) => (
                      <tr
                        key={deposit.id}
                        className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                      >
                        <td className="py-3 px-4 lg:py-4">{deposit.id}</td>
                        <td className="py-3 px-4 lg:py-4">{deposit.amount}</td>
                        <td className="py-3 px-4 lg:py-4 whitespace-nowrap">
                          {deposit.date}
                        </td>
                        <td className="py-3 px-4 lg:py-4">{deposit.method}</td>
                        <td className="py-3 px-4 lg:py-4">
                          {deposit.imageUrl !== "" ? "Approved" : "Pending"}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className="text-center px-6 py-6" colSpan="5">
                        No data available in table
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
    </Suspense>
  );
};

export default Transactions;
