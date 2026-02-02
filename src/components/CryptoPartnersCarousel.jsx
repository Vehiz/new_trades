import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import binanceLogo from "../assets/Binance_logo.svg_.png";
import coinbaseLogo from "../assets/co1496ca97-coinbase-logo.png";
import krakenLogo from "../assets/Kraken-Logo.png";
import bitstampLogo from "../assets/bitstamp-logo.png";
import bybitLogo from "../assets/Bybit-logo.png";
import okxLogo from "../assets/okx-logo.png";
import kucoinLogo from "../assets/KUCOIN.svg.png";
import geminiLogo from "../assets/Gemini-Emblem.png";

const partners = [
  {
    name: "Binance",
    tagline: "Liquidity partner",
    logo: (
      <img
        src={binanceLogo}
        alt="Binance"
        className="h-8 w-auto object-contain"
        loading="lazy"
      />
    ),
  },
  {
    name: "Coinbase",
    tagline: "Market access",
    logo: (
      <img
        src={coinbaseLogo}
        alt="Coinbase"
        className="h-12 w-auto object-contain"
        loading="lazy"
      />
    ),
  },
  {
    name: "Kraken",
    tagline: "Institutional desk",
    logo: (
      <img
        src={krakenLogo}
        alt="Kraken"
        className="h-8 w-auto object-contain"
        loading="lazy"
      />
    ),
  },
  {
    name: "Bitstamp",
    tagline: "Secure exchange",
    logo: (
      <img
        src={bitstampLogo}
        alt="Bitstamp"
        className="h-12 w-auto object-contain"
        loading="lazy"
      />
    ),
  },
  {
    name: "Bybit",
    tagline: "Derivatives",
    logo: (
      <img
        src={bybitLogo}
        alt="Bybit"
        className="h-10 w-auto object-contain"
        loading="lazy"
      />
    ),
  },
  {
    name: "OKX",
    tagline: "Global markets",
    logo: (
      <img
        src={okxLogo}
        alt="OKX"
        className="h-8 w-auto object-contain"
        loading="lazy"
      />
    ),
  },
  {
    name: "KuCoin",
    tagline: "Altcoin hub",
    logo: (
      <img
        src={kucoinLogo}
        alt="KuCoin"
        className="h-8 w-auto object-contain"
        loading="lazy"
      />
    ),
  },
  {
    name: "Gemini",
    tagline: "Regulated venue",
    logo: (
      <img
        src={geminiLogo}
        alt="Gemini"
        className="h-8 w-auto object-contain"
        loading="lazy"
      />
    ),
  },
];

const CryptoPartnersCarousel = () => {
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="bg-white/95">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-0 py-10 sm:py-12">
        <div className="mb-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-500">
            Trusted partners
          </p>
          <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-gray-900">
            Crypto partners powering BlockTrade
          </h2>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white px-4 py-6 shadow-sm">
          <Slider {...settings}>
            {partners.map((partner) => (
              <div key={partner.name} className="px-3">
                <div className="flex h-full items-center gap-4 rounded-2xl border border-gray-100 bg-gray-50 px-4 py-5">
                  {partner.logo}
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {partner.name}
                    </p>
                    <p className="text-xs text-gray-500">{partner.tagline}</p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default CryptoPartnersCarousel;
