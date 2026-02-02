import { useEffect, useRef } from "react";

const MiniSymbolChart = ({ symbol, title, colorTheme = "light", height = 220 }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbol,
      width: "100%",
      height,
      locale: "en",
      dateRange: "1M",
      colorTheme,
      isTransparent: false,
      autosize: true,
      largeChartUrl: "",
    });

    containerRef.current.appendChild(script);

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [symbol, colorTheme, height]);

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-2 flex items-center justify-between text-xs font-semibold text-gray-500 dark:text-slate-400">
        <span>{title}</span>
      </div>
      <div className="tradingview-widget-container" ref={containerRef}>
        <div className="tradingview-widget-container__widget" />
      </div>
    </div>
  );
};

export default MiniSymbolChart;
