import  { useEffect } from 'react';

const TradingViewWidget = () => {
  useEffect(() => {
    // Load the TradingView widget
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
    script.async = true;

    // Widget configuration
    const widgetConfig = {
      symbols: [
        {
          description: '',
          proName: 'COINBASE:BTCUSD',
        },
        {
          description: '',
          proName: 'INDEX:BTCUSD',
        },
        {
          description: '',
          proName: 'BINANCE:ETHUSD',
        },
        {
          description: '',
          proName: 'BITSTAMP:XRPUSD',
        },
        {
          description: '',
          proName: 'BINANCE:BTCUSDT',
        },
        {
          description: '',
          proName: 'COINBASE:DOGEUSD',
        },
        {
          description: '',
          proName: 'BITSTAMP:XRPUSD',
        },
        {
          description: '',
          proName: 'COINBASE:SOLUSD',
        },
      ],
      showSymbolLogo: true,
      colorTheme: 'light',
      isTransparent: false,
      displayMode: 'adaptive',
      locale: 'en',
    };

    script.text = `{
      "symbols": ${JSON.stringify(widgetConfig.symbols)},
      "showSymbolLogo": ${widgetConfig.showSymbolLogo},
      "colorTheme": "${widgetConfig.colorTheme}",
      "isTransparent": ${widgetConfig.isTransparent},
      "displayMode": "${widgetConfig.displayMode}",
      "locale": "${widgetConfig.locale}"
    }`;

    // Append the script to the document
    document.getElementsByClassName('tradingview-widget-container__widget')[0].appendChild(script);

    // Clean up when component unmounts
    return () => {
      document.getElementsByClassName('tradingview-widget-container__widget')[0].removeChild(script);
    };
  }, []);

  return (
    <div className='fixed top-0 w-full z-40 bg-white shadow-md'>
    <div className="tradingview-widget-container">
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright">
        <a href="https://www.tradingview.com/" rel="noopener noreferrer" target="_blank">
        </a>
      </div>
    </div>
    </div>
  );
};

export default TradingViewWidget;
