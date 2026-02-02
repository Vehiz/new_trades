import { lazy, Suspense, useState } from "react";
import Terms from "../components/Terms";
import Privacy from "../components/Privacy";
import Disclaimer from "../components/Disclaimer";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const TradingViewWidget = lazy(() => import("../widgets/Widgets"));


const tabs = [
    { label: 'Terms & Condition', content: <Terms/>},
    { label: 'Privacy Policy', content: <Privacy/> },
    { label: 'Disclaimer', content: <Disclaimer/> },
  ];

const TermsAndCondition = () => {
    const [activeTab, setActiveTab] = useState(0);
  return (
<div>
<Suspense fallback={null}>
  <TradingViewWidget />
</Suspense>
    <Navbar/>
    <div className="mx-auto px-4 sm:px-6 mt-24 md:mt-[135px]">
      <div>
        <h2 className="text-xl sm:text-2xl md:text-[28px] py-4 sm:py-6">{tabs[activeTab].label}</h2>
        <p>
          Please read all legal information carefully. Whether you are a visitor
          of the site or a registered user, your access to and use of the
          Hashing24.com services are conditioned by the information contained
          herein. If you disagree with these terms, do not access or use the
          website.
        </p>
      </div>
      <div className="flex flex-wrap gap-2 border-b border-gray-300 pt-6">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`py-2 px-4 transition duration-200 ${
              activeTab === index
                ? 'border-b-2 border-blue-500 text-blue-500 font-semibold'
                : 'text-gray-500 hover:text-blue-500'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="p-4 sm:p-6 mt-4 rounded-lg bg-white">
        {tabs[activeTab].content}
      </div>
    </div>
      <Footer/>
    </div>
  );
};

export default TermsAndCondition;
