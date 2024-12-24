import { BsBarChartLineFill } from "react-icons/bs";
import { BsSend } from "react-icons/bs";
// import {BsLockFill} from 'react-icons/bs'
import { AiOutlineLock } from "react-icons/ai";
import { LuAirVent } from "react-icons/lu";
import { MdWaves } from "react-icons/md";
import { GiSkills } from "react-icons/gi";

const Hero1 = () => {
  return (
    <section className="w-screen py-16 flex justify-center items-center overflow-hidden">
      <div className=" w-full flex flex-col justify-center items-center px-4 md:px-6 lg:px-8">
        <div className="w-[66%] text-center leading-tight mx-6 font-semibold text-[60px] md:text-5xl lg:text-6xl mb-12">
          <h2>What Bitcoin Mining Process Costs?</h2>
        </div>
        <div className="grid gap-[2px] md:grid grid-cols-3 place-items-center justify-center">
          <div className="w-full sm:w-1/2 md:w-full px-4">
            <div className="shadow-inner p-8 mt-6 bg-white rounded-lg">
              <div className=" flex bg-[#EF2468] w-[70px] h-[70px] text-[white] text-[36px] text-center mb-[20px] justify-center items-center rounded-[50%]">
                <BsBarChartLineFill />
              </div>
              <h3 className="text-2xl mb-[15px] font-semibold">
                Electricity Cost
              </h3>
              <p className="text-[#617686] leading-7 text-[20px]">
                If you want to mine BTC on your own, then be ready to pay
                sky-high electricity bills regularly.
              </p>
            </div>
          </div>
          <div className="sm:w-1/2 md:w-full px-4">
            <div className="shadow-inner p-8 mt-6 bg-white rounded-lg">
              <div className=" flex bg-[#32C072] w-[70px] h-[70px] text-[white] text-[36px] text-center mb-[20px] justify-center items-center rounded-[50%]">
                <BsSend />
              </div>
              <h3 className="text-2xl mb-[15px] font-semibold">
                Premises
              </h3>
              <p className="text-[#617686] leading-7 text-[20px]">
                You need spacious non-residential premises because BTC mining is
                very noisy and uneasy.
              </p>
            </div>
          </div>
          <div className="sm:w-1/2 md:w-full px-4">
            <div className="shadow-inner p-8 mt-6 bg-white rounded-lg">
              <div className=" flex bg-[#FFD44B] w-[70px] h-[70px] text-[white] text-[36px] text-center mb-[20px] justify-center items-center rounded-[50%] ">
              <LuAirVent />
              </div>
              <h3 className="text-2xl mb-[15px] font-semibold">
                Cooling and Ventilation
              </h3>
              <p className="text-[#617686] leading-7 text-[20px]">
                These 2 components are mandatory to ensure the required
                cleanness and air humidity level.
              </p>
            </div>
          </div>
          <div className="sm:w-1/2 md:w-full px-4">
            <div className="shadow-inner p-8 mt-6 bg-white rounded-lg">
              <div className=" flex bg-[#EF2468] w-[70px] h-[70px] text-[white] text-[36px] text-center mb-[20px] justify-center items-center rounded-[50%] ">
                <AiOutlineLock />
              </div>
              <h3 className="text-2xl mb-[15px] font-semibold">
              Secure &amp; Encrypted Investment
              </h3>
              <p className="text-[#617686] leading-7 text-[20px]">
                The most secure and fast investment can be made through cryptocurrency
              </p>
            </div>
          </div>
          <div className="sm:w-1/2 md:w-full px-4">
            <div className="shadow-inner p-8 mt-6 bg-white rounded-lg">
              <div className=" flex bg-[#FFD44B] w-[70px] h-[70px] text-[white] text-[36px] text-center mb-[20px] justify-center items-center rounded-[50%] ">
              <MdWaves />
              </div>
              <h3 className="text-2xl mb-[15px] font-semibold">
                non-stop monitoring 24/7/365
              </h3>
              <p className="text-[#617686] leading-7 text-[20px]">
                You need to constantly control the mining process in order not
                to lose your money and hardware.
              </p>
            </div>
          </div>
          <div className="sm:w-1/2 md:w-full px-4">
            <div className="shadow-inner p-8 mt-6 bg-white rounded-lg">
              <div className=" flex bg-[#32C072] w-[70px] h-[70px] text-[white] text-[36px] text-center mb-[20px] justify-center items-center rounded-[50%] ">
              <GiSkills />
              </div>
              <h3 className="text-2xl mb-[15px] font-semibold">
                Technical Skills
              </h3>
              <p className="text-[#617686] leading-7 text-[20px]">
                You need an in-depth knowledge to set up your crypto mining
                hardware and upgrade it regularly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero1;
