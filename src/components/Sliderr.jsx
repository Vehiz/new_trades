
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AiFillStar } from "react-icons/ai";
import CarouselImg1 from "../assets/cauroselImg1.jpeg"
import CarouselImg2 from "../assets/cauroselImg2.jpeg"
import CarouselImg3 from "../assets/cauroselImg3.jpeg"

const Sliderr = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <div className="py-20 shadow-inner px-6 md:px-12 lg:px-24">
      <div className="flex justify-center items-center py-12 md:py-16">
        <h2 className="text-center text-[#1E1E1E] mb-6 text-3xl md:text-4xl lg:text-5xl leading-tight font-semibold">
          What our clients say
        </h2>
      </div>
      <Slider {...settings}>
        <div className="w-full p-6 md:p-10 shadow-inner">
          <div className="flex gap-4 mb-6">
            <img
              src={CarouselImg3}
              alt=""
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h2 className="font-bold text-lg">Sarah T.</h2>
              <p className="text-gray-500">Administrative Assistant</p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-gray-600">&quot;I&apos;ve been investing in cryptocurrencies for a couple of years now, and it has significantly improved my financial situation. The key is to stay informed and be prepared for market fluctuations. Overall, it&apos;s been a positive and rewarding experience.&quot;</p>
          </div>
          <div className="flex text-[#FFD44B] text-2xl gap-1 mt-6">
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
          </div>
        </div>
        <div className="w-full p-6 md:p-10 shadow-inner">
          <div className="flex gap-4 mb-6">
            <img
              src={CarouselImg2}
              alt=""
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h2 className="font-bold text-lg">John T.</h2>
              <p className="text-gray-500">Data Analyst</p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-gray-600">&quot;Investing in cryptocurrencies has been a game-changer for my portfolio. I&apos;ve seen significant returns in a short period, especially with Bitcoin and Ethereum. The volatility can be nerve-wracking, but the potential rewards have made it worth it for me.&quot;</p>
          </div>
          <div className="flex text-[#FFD44B] text-2xl gap-1 mt-6">
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
          </div>
        </div>
        <div className="w-full p-6 md:p-10 shadow-inner">
          <div className="flex gap-4 mb-6">
            <img
              src={CarouselImg1}
              alt=""
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h2 className="font-bold text-lg">Dimitris P.</h2>
              <p className="text-gray-500">Service Delivery Manager</p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-gray-600"> &quot;started investing in cryptocurrencies a year ago, and it&apos;s been a thrilling journey. The growth of my investments has been impressive, and the technology behind it is fascinating. I appreciate the decentralization aspect and believe in its long-term potential.&quot;</p>
          </div>
          <div className="flex text-[#FFD44B] text-2xl gap-1 mt-6">
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
          </div>
        </div>
        <div className="w-full p-6 md:p-10 shadow-inner">
          <div className="flex gap-4 mb-6">
            <img
              src=""
              alt=""
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h2 className="font-bold text-lg">Alvaro C.</h2>
              <p className="text-gray-500">Operations Manager</p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-gray-600">&quot;Cryptocurrency investment has allowed me to diversify my portfolio beyond traditional stocks and bonds. The returns have been substantial, particularly during market upswings. I&quot;ve also enjoyed learning about blockchain technology and its potential applications.&quot;</p>
          </div>
          <div className="flex text-[#FFD44B] text-2xl gap-1 mt-6">
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
          </div>
        </div>
        <div className="w-full p-6 md:p-10 shadow-inner">
          <div className="flex gap-4 mb-6">
            <img
              src=""
              alt=""
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h2 className="font-bold text-lg">Bradley J.</h2>
              <p className="text-gray-500">Software Engineer</p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-gray-600">&quot;As a tech enthusiast, investing in cryptocurrencies felt like a natural step. The returns have been excellent, and it&quot;s been exciting to be part of such an innovative space. I recommend it to anyone willing to do their research and understand the risks involved.&quot;</p>
          </div>
          <div className="flex text-[#FFD44B] text-2xl gap-1 mt-6">
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default Sliderr;
