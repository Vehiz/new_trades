import { useEffect } from 'react';

const CryptoNews = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-timeline.js';
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = `
      {
        "feedMode": "all_streams",
        "colorTheme": "light",
        "isTransparent": false,
        "displayMode": "regular",
        "width": "100%",
        "height": "650",
        "locale": "en"
      }`;

    const container = document.getElementById('cryptoNews');
    container.appendChild(script);

    return () => {
      if (container) {
        container.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="container mx-auto my-8 mb-20">
      <h2 className="text-5xl font-bold text-center mb-8">News and Blogs</h2>
      <div className="tradingview-widget-container" id="cryptoNews">
        <div className="tradingview-widget-container__widget"></div>
      </div>
    </div>
  );
};

export default CryptoNews; 