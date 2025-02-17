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
    <div className="relative py-20 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-blue-50/50 to-white"></div>
      
      {/* Decorative Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200/20 rounded-full filter blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-indigo-200/20 rounded-full filter blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="relative container mx-auto px-4">
        <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          What Our Traders Say
        </h2>
        
        <div className="relative max-w-4xl mx-auto">
          <div
            className="flex flex-col items-center transition-all duration-500 ease-in-out"
          >
            <div className="w-24 h-24 mb-6 rounded-full overflow-hidden border-4 border-blue-500/20 shadow-xl">
              <img 
                src={testimonials[currentIndex].image} 
                alt={testimonials[currentIndex].name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <p className="text-xl text-gray-700 text-center mb-6 italic px-4 md:px-8 leading-relaxed">
              "{testimonials[currentIndex].text}"
            </p>
            
            <h3 className="text-2xl font-semibold text-gray-900">
              {testimonials[currentIndex].name}
            </h3>
            
            <p className="text-blue-600 font-medium mb-6">
              {testimonials[currentIndex].role}
            </p>

            <div className="flex text-[#FFD44B] text-2xl gap-1">
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
            </div>
          </div>

          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-blue-600 w-8' 
                    : 'bg-blue-200 hover:bg-blue-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sliderr;
