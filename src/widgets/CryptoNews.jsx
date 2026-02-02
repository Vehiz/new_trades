import { useEffect, useRef } from 'react';

const CryptoNews = () => {
  const containerRef = useRef(null);

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

    if (containerRef.current) {
      containerRef.current.appendChild(script);
    }

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <section className="relative mx-auto mb-16 w-full max-w-7xl px-4 sm:px-6 md:px-0">
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 px-6 py-10 sm:px-10">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-600">
            Insights
          </p>
          <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900">
            News &amp; Blog Updates
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Curated crypto headlines and market analysis from trusted sources.
          </p>
        </div>

        <div className="relative">
          <div className="absolute -top-10 -left-10 h-32 w-32 rounded-full bg-blue-200/30 blur-2xl" />
          <div className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-indigo-200/30 blur-2xl" />
          <div className="tradingview-widget-container overflow-hidden rounded-2xl border border-white/60 bg-white shadow-xl shadow-blue-500/10" ref={containerRef}>
            <div className="tradingview-widget-container__widget"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CryptoNews; 