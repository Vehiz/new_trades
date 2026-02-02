// import React from "react";
import mobilePhoto from "../assets/mobile-hero1.png";
import jiggy_home from "../assets/jiggy_home.jpeg";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        backgroundImage: `url(${jiggy_home})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#0b1226]/90 via-[#0b1226]/80 to-[#0b1226]/95"></div>
      <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl"></div>
      <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl"></div>

      <div className="relative mx-auto w-full max-w-7xl flex flex-col-reverse md:flex-row items-center gap-10 px-4 sm:px-6 md:px-0 py-10 sm:py-14 text-white">
        <div className="w-full md:w-1/2">
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold bg-white/10 border border-white/20 text-white/90 px-3 py-1 rounded-full mb-4">
            <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
            Live Market Insights
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Crypto Trading & Cloud Mining
            <span className="block text-blue-300">Built for Speed and Trust</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-white/80 mt-4 max-w-xl">
            Trade top assets, follow real-time analytics, and grow your portfolio
            with a secure platform designed for global investors.
          </p>

          <div className="mt-5 flex flex-wrap gap-2 text-xs sm:text-sm">
            {[
              "BTC $68.4K",
              "ETH $3.1K",
              "SOL $145",
              "24/7 Markets",
            ].map((item) => (
              <span key={item} className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-white/80">
                {item}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 mt-6">
            <Link
              to="/signup"
              className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm sm:text-base font-semibold"
            >
              Create Account
            </Link>
            <Link
              to="/login"
              className="border border-white/30 hover:border-white/60 text-white px-5 py-2.5 rounded-lg text-sm sm:text-base font-semibold"
            >
              View Dashboard
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 max-w-md">
            <div className="rounded-lg border border-white/10 bg-white/5 p-3">
              <p className="text-xs text-white/60">24H Volume</p>
              <p className="text-lg font-semibold">$1.2B</p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/5 p-3">
              <p className="text-xs text-white/60">Active Traders</p>
              <p className="text-lg font-semibold">85K+</p>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 flex items-center justify-center relative">
          <div className="relative">
            <div className="absolute -top-6 -left-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3 text-xs">
              <p className="text-white/70">BTC/USD</p>
              <p className="text-lg font-bold">$68,420</p>
              <p className="text-emerald-400">+2.4%</p>
            </div>
            <img
              src={mobilePhoto}
              alt="Trading app preview"
              className="w-full max-w-xs sm:max-w-sm md:max-w-md drop-shadow-[0_25px_50px_rgba(0,0,0,0.45)]"
            />
            <div className="absolute -bottom-6 -right-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3 text-xs">
              <p className="text-white/70">Portfolio</p>
              <p className="text-lg font-bold">$12,840</p>
              <p className="text-emerald-400">+6.8%</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
