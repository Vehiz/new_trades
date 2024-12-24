// import React from "react";
import mobilePhoto from "../assets/mobile-hero1.png";
import jiggy_home from "../assets/jiggy_home.jpeg";

const Hero = () => {
  return (
    <section
      className="relative w-full flex flex-col items-center justify-center"
      style={{
        backgroundImage: `url(${jiggy_home})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full flex mx-[7%] justify-between text-white">
        <div className="w-full mx-[45px] md:ml-16">
          <h1 className="text-[70px] md:text-[100px] mt-[50px] mb-[20px] font-bold leading-[110%]">
            Secure Trading and Bitcoin Cloud Mining Services
          </h1>
          <p className="md:text-[30px] mb-[15px]">
            The easiest, safest and fastest web app for cryptocurrency trading,
            mining and investments globally
          </p>
        </div>
        <div className="w-full flex items-center justify-center py-[25px]">
          <img src={mobilePhoto} alt=""></img>
        </div>
      </div>
    </section>
  );
};

export default Hero;
