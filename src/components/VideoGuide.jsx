// import React from "react";
import video from "../assets/faq-video-bg.jpg";
import { BsCaretRightFill } from "react-icons/bs";
import AccordionItems from "./AccordionItems";

const VideoGuide = () => {
  return (
    <section className="bg-[#02021E] shadow-inner">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-0">
        <div className="flex flex-col lg:flex-row py-16 sm:py-24 justify-center items-center gap-8">
      <div className="w-full lg:w-1/2 pr-0 lg:pr-12 pl-0 lg:pl-3">
        <div className="relative">
          <img
            src={video}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <a
              href="https://www.youtube.com/watch?v=jUXQCnUSfCQ"
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#02021E] text-2xl sm:text-3xl flex items-center justify-center text-[#F54748]"
              aria-label="Play video"
            >
              <BsCaretRightFill />
            </a>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2">
        <div>
          <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white leading-tight pr-0 lg:pr-12 pl-0 lg:pl-3 font-bold mb-4 sm:mb-6 lg:mb-8">
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
