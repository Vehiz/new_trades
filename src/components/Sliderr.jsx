import { useEffect, useState } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AiFillStar } from "react-icons/ai";

const Sliderr = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: "John Smith",
      role: "Crypto Trader",
      text: "This platform has completely transformed my trading experience. The real-time analytics and user-friendly interface make trading easier than ever.",
      image: "https://randomuser.me/api/portraits/men/1.jpg"
    },
    {
      name: "Sarah Johnson",
      role: "Investment Analyst",
      text: "The comprehensive market insights and trading tools available here have significantly improved my decision-making process.",
      image: "https://randomuser.me/api/portraits/women/2.jpg"
    },
    {
      name: "Michael Chen",
      role: "Day Trader",
      text: "Outstanding platform! The technical analysis tools and community insights have helped me achieve consistent returns.",
      image: "https://randomuser.me/api/portraits/men/3.jpg"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section className="relative overflow-hidden py-12 sm:py-20 bg-slate-50">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-blue-50/40 to-slate-50" />
      <div className="absolute inset-0">
        <div className="absolute -top-10 -left-10 h-72 w-72 rounded-full bg-blue-200/20 blur-3xl" />
        <div className="absolute -bottom-10 -right-10 h-72 w-72 rounded-full bg-indigo-200/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-0">
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-600">
            Testimonials
          </p>
          <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900">
            What Our Traders Say
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Real feedback from our global community of crypto traders.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div className="space-y-6">
            <div className="rounded-3xl border border-white/60 bg-white/80 p-6 shadow-xl shadow-blue-500/10 backdrop-blur">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 overflow-hidden rounded-2xl ring-4 ring-blue-500/10">
                  <img
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-lg font-semibold text-slate-900">
                    {testimonials[currentIndex].name}
                  </p>
                  <p className="text-sm text-blue-600">
                    {testimonials[currentIndex].role}
                  </p>
                </div>
              </div>
              <p className="mt-5 text-sm sm:text-base text-slate-600 leading-relaxed">
                “{testimonials[currentIndex].text}”
              </p>
              <div className="mt-4 flex text-[#FFD44B] text-xl gap-1">
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {testimonials.map((item, index) => (
                <button
                  key={item.name}
                  onClick={() => setCurrentIndex(index)}
                  className={`rounded-full border px-4 py-2 text-xs font-semibold transition-all ${
                    index === currentIndex
                      ? "border-blue-600 bg-blue-600 text-white"
                      : "border-blue-100 bg-white text-slate-600 hover:border-blue-300"
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {testimonials.map((item, index) => (
              <div
                key={item.name}
                className={`rounded-2xl border bg-white/80 p-4 shadow-sm backdrop-blur transition-all ${
                  index === currentIndex
                    ? "border-blue-200 shadow-lg shadow-blue-500/10"
                    : "border-slate-100"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 overflow-hidden rounded-xl">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {item.name}
                    </p>
                    <p className="text-xs text-slate-500">{item.role}</p>
                  </div>
                </div>
                <p className="mt-3 text-xs text-slate-600 line-clamp-3">
                  “{item.text}”
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sliderr;
