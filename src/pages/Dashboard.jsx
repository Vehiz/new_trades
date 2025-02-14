import { useState, useEffect, Suspense } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import MarketView from "../widgets/MarketView";
import WidgetTicker from "../widgets/WidgetTicker";
import Footer from "./Footer";
import PreLoader from "../components/PreLoader";

const Dashboard = () => {
  const total = parseFloat(sessionStorage.getItem("totalAmount")) || 0;
  const [user, setUser] = useState(null); // Initialize as null
  const [totalSum, setTotalSum] = useState(0);

  const profit = parseFloat(user?.profit) || 0;
  const sum = total + profit; // Calculate the sum
  const dashMessage = user?.dashboardMessage;

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        const docRef = doc(db, "Users", currentUser.email);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUser(docSnap.data());
        } else {
          console.error("No such document!");
        }
      } else {
        console.error("No user is signed in.");
      }
      setTotalSum(sum);
    });

    return () => unsubscribe(); // Cleanup the listener on component unmount
  }, [sum, profit]);

  return (
    <Suspense fallback={<PreLoader />}>
      <section className="bg-[#f4f7fe] w-full">
        <div className="w-full bg-transparent text-white py-2 overflow-hidden">
          {total === 0.0 ? (
            <div className="text-green-300 whitespace-nowrap animate-marquee">
              🚀 Welcome to the Block Mine! We are happy to have you onboard as
              you enjoy a seamless and well secured cloud mining experience.
              Thank you. 🔥
            </div>
          ) : (dashMessage?.includes("notice") ? (
            <div className="w-full text-yellow-500 bg-yellow-100 border border-yellow-400 p-2 rounded whitespace-nowrap animate-marquee">
              ⚠️ {dashMessage}
            </div>
          ) : (
            <div className="text-green-400 whitespace-nowrap animate-marquee">
              {dashMessage}
            </div>
          ))}
        </div>
        <div className="flex flex-wrap flex-grow justify-between text-gray-600 mx-[px]">
          <div className="w-full lg:w-1/3 px-4 text-sm font-normal">
            <div className="mt- bg-white mb-6 rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div className="">
                  <h3 className="lg:text-2xl font-semibold">
                    ${total.toFixed(2)}
                  </h3>
                  <div className="text-gray-700 text-opacity-50">Deposit</div>
                </div>
                {/* Responsive Graph */}
                <div className="flex-shrink-0 w-[77px] min-h-[43px]">
                  <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 77 43"
                    preserveAspectRatio="none"
                  >
                    <rect x="5" y="20" width="10" height="23" fill="#4CAF50" />
                    <rect x="20" y="10" width="10" height="33" fill="#4CAF50" />
                    <rect x="35" y="5" width="10" height="38" fill="#4CAF50" />
                    <rect x="50" y="15" width="10" height="28" fill="#4CAF50" />
                    <rect x="65" y="25" width="10" height="18" fill="#4CAF50" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/3 px-4 text-sm font-normal">
            <div className="lg:mt- bg-white mb-6 rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div className="">
                  <h3 className="lg:text-2xl font-semibold">
                    ${profit.toFixed(2)}
                  </h3>
                  <div className="lg:text-gray-700 text-opacity-50">
                    Account Profit
                  </div>
                </div>
                {/* Responsive Graph */}
                <div className="flex-shrink-0 w-[77px] min-h-[43px]">
                  <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 77 43"
                    preserveAspectRatio="none"
                  >
                    <rect x="5" y="20" width="10" height="23" fill="#2196F3" />
                    <rect x="20" y="10" width="10" height="33" fill="#2196F3" />
                    <rect x="35" y="5" width="10" height="38" fill="#2196F3" />
                    <rect x="50" y="15" width="10" height="28" fill="#2196F3" />
                    <rect x="65" y="25" width="10" height="18" fill="#2196F3" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/3 px-4 text-sm font-normal">
            <div className="lg:mt- bg-white mb-6 rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div className="">
                  <h3 className="lg:text-2xl font-semibold">
                    ${totalSum.toFixed(2)}
                  </h3>
                  <div className="text-gray-700 text-opacity-50">Total Sum</div>
                </div>
                {/* Responsive Graph */}
                <div className="flex-shrink-0 w-[77px] min-h-[43px]">
                  <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 77 43"
                    preserveAspectRatio="none"
                  >
                    <rect x="5" y="20" width="10" height="23" fill="#FF9800" />
                    <rect x="20" y="10" width="10" height="33" fill="#FF9800" />
                    <rect x="35" y="5" width="10" height="38" fill="#FF9800" />
                    <rect x="50" y="15" width="10" height="28" fill="#FF9800" />
                    <rect x="65" y="25" width="10" height="18" fill="#FF9800" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-full">
          <WidgetTicker />
          <MarketView />
        </div>
        <Footer />
      </section>
    </Suspense>
  );
};

export default Dashboard;
