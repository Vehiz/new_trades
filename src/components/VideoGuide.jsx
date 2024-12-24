// import React from "react";
import video from "../assets/faq-video-bg.jpg";
import { BsCaretRightFill } from "react-icons/bs";
import AccordionItems from "./AccordionItems";

const VideoGuide = () => {
  return (
    <section>
  <div className="w-full px-6 md:px-8 lg:px-12 bg-[#02021E] mx-auto shadow-inner">
    <div className="flex flex-col lg:flex-row py-24 justify-center items-center">
      <div className="w-full lg:w-1/2 pr-0 lg:pr-12 pl-0 lg:pl-3 mb-12 lg:mb-0">
        <div className="relative">
          <img
            src={video}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute w-24 h-24 rounded-full bg-[#02021E] text-3xl flex items-center justify-center text-[#F54748] bottom-[40%] left-[45%] transform -translate-x-1/2 -translate-y-1/2">
            <a
              href="https://www.youtube.com/watch?v=jUXQCnUSfCQ"
              className=""
            >
              <BsCaretRightFill />
            </a>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2">
        <div>
          <div className="text-4xl md:text-5xl lg:text-6xl text-white leading-tight pr-0 lg:pr-12 pl-0 lg:pl-3 font-bold mb-6 lg:mb-8">
            <h2>If you want to know anything, ask us</h2>
          </div>
        </div>
        <div>
          <AccordionItems />
        </div>
        <div className="text-[#617686] mt-6 lg:mt-8">
          <h2>
            Have more questions?
            <span className="font-bold text-lg ml-1 text-white">
              Get in touch
            </span>
          </h2>
        </div>
      </div>
    </div>
  </div>
</section>

  );
};

export default VideoGuide;
