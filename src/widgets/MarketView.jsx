import { useEffect, useRef } from "react";

const TradingViewWidget = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      colorTheme: "light",
      dateRange: "12M",
      showChart: true,
      locale: "en",
      largeChartUrl: "",
      isTransparent: false,
      showSymbolLogo: true,
      showFloatingTooltip: false,
      height: "700",
      borderRadius: "12px",
      // Other configuration options can be added here
    });

    // Ensure the DOM is ready
    const timeoutId = setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.appendChild(script);
      }
    }, 100); // Adjust the delay as necessary

    return () => {
      clearTimeout(timeoutId);
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, []);

  return (
    <section className="mx-[15px] mb-6 rounded-xl bg-white shadow-lg">
      <div className="tradingview-widget-container" ref={containerRef}>
        <div className="tradingview-widget-container__widget"></div>
      </div>
    </section>
  );
};

export default TradingViewWidget;
