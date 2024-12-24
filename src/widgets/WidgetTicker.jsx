import { useEffect, useRef } from 'react';

const TradingViewWidget = () => {
  const widgetRef = useRef(null);

  useEffect(() => {
    const loadScript = () => {
      if (!widgetRef.current) return;

      const scriptId = 'tradingview-widget-script';

      // Check if script already exists
      if (document.getElementById(scriptId)) {
        console.log("Script already loaded");
        return;
      }

      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-tickers.js';
      script.async = true;
      script.innerHTML = JSON.stringify({
        symbols: [
          { proName: 'BITSTAMP:BTCUSD', title: 'Bitcoin' },
          { proName: 'BITSTAMP:ETHUSD', title: 'Ethereum' },
          { proName: 'BITSTAMP:XRPUSD', title: 'XRP' },
          { proName: 'FOREXCOM:SPXUSD', title: 'S&P 500' },
          { proName: 'FX_IDC:EURUSD', title: 'EUR to USD' },
        ],
        colorTheme: 'light',
        isTransparent: false,
        showSymbolLogo: true,
        locale: 'en',
      });

      script.onload = () => {
        console.log("TradingView script loaded successfully");
      };

      script.onerror = (error) => {
        console.error("Error loading TradingView script:", error);
      };

      widgetRef.current.appendChild(script);
    };

    const timeoutId = setTimeout(loadScript, 100); // Delay the script loading

    // Cleanup function to remove the script if the component is unmounted
    return () => {
      clearTimeout(timeoutId);
      const script = document.getElementById('tradingview-widget-script');
      if (script) {
        script.remove();
      }
    };
  }, []);

  return (
    <div className="tradingview-widget-container">
      <div ref={widgetRef} className="mx-[15px] tradingview-widget-container__widget"></div>
    </div>
  );
};

export default TradingViewWidget;
