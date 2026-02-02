// import React from 'react'
// import { GrFormCheckmark } from "react-icons/gr";
import { FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";

const Plans = () => {
  return (
    <section className="py-12 sm:py-20 shadow-inner">
      <div className="grid gap-10 md:gap-16">
        <div className="flex flex-col justify-center items-center">
          <div className="w-full max-w-2xl px-4">
            <h2 className="text-center text-black font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4 sm:mb-6 leading-snug">
              The most affordable investment plan for you
            </h2>
            <p className="text-gray-500 text-sm sm:text-base md:text-lg text-center">
              Earn with ease using our investment plan
            </p>
          </div>
        </div>
        <div className="px-4 sm:px-6 md:px-12 lg:px-24">
          <div className="grid md:flex gap-6 justify-center items-center">
            <div className="w-full md:w-1/2 lg:w-1/3">
              <div className="px-5 sm:px-6 py-6 sm:py-8 border mt-4 sm:mt-6 rounded-lg shadow-lg">
                <div>
                  <div className="text-xl font-bold">
                    <h4>Basic Plan</h4>
                  </div>
                  <div className="flex items-end">
                    <h2 className="text-3xl sm:text-4xl font-bold leading-tight">
                      $<span>1000</span>
                    </h2>
                    <p className="text-sm sm:text-base text-gray-500">Min</p>
                  </div>
                </div>
                <div className="mt-6 border-t-2 border-gray-600">
                  <div className="flex flex-col gap-4 mt-4">
                    <div className="flex gap-2">
                      <FaCheck className="text-blue-700" />
                      Limited Access Library
                    </div>
                    <div className="flex gap-2">
                      <FaCheck className="text-blue-700" />
                      Individual User Capabilities
                    </div>
                    <div className="flex gap-2">
                      <FaCheck className="text-blue-700" />
                      No Updates Facility
                    </div>
                    <div className="flex gap-2">
                      <FaCheck className="text-blue-700" />
                      Standard support
                    </div>
                  </div>
                </div>
                <Link
                  to="/signup"
                  className="flex justify-center font-bold rounded border-2 transition duration-300 ease-in-out border-red-500 px-5 py-3 mt-6 hover:bg-blue-500 hover:text-white hover:border-transparent items-center"
                >
                  Choose plan
                </Link>
              </div>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/3">
              <div className="px-5 sm:px-6 py-6 sm:py-8 mt-4 sm:mt-6 shadow-lg bg-black rounded-lg text-white">
                <div>
                  <div className="text-xl font-bold">
                    <h4>Classic Plan</h4>
                  </div>
                  <div className="flex items-end">
                    <h2 className="text-3xl sm:text-4xl font-bold leading-tight">
                      $<span>5,000</span>
                    </h2>
                    <p className="text-sm sm:text-base text-gray-500">Min</p>
                  </div>
                </div>
                <div className="mt-6 border-t-2 border-gray-600">
                  <div className="flex flex-col gap-4 mt-4">
                    <div className="flex gap-2">
                      <FaCheck />
                      Limited Access Library
                    </div>
                    <div className="flex gap-2">
                      <FaCheck />
                      Individual User Capabilities
                    </div>
                    <div className="flex gap-2">
                      <FaCheck />
                      No Updates Facility
                    </div>
                    <div className="flex gap-2">
                      <FaCheck />
                      Standard support
                    </div>
                  </div>
                </div>
                <Link
                  to="/signup"
                  className="flex bg-red-500 justify-center font-bold transition duration-300 ease-in-out rounded border-2 border-red-500 px-5 py-3 mt-6 hover:bg-blue-500 hover:text-white hover:border-transparent items-center"
                >
                  Choose plan
                </Link>
              </div>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/3">
              <div className="px-5 sm:px-6 py-6 sm:py-8 mt-4 sm:mt-6 rounded-lg shadow-lg">
                <div className="">
                  <div className="text-xl font-bold">
                    <h4>Premium Plan</h4>
                  </div>
                  <div className="flex items-end">
                    <h2 className="text-3xl sm:text-4xl font-bold leading-tight">
                      $<span>10,000</span>
                    </h2>
                    <p className="text-sm sm:text-base text-gray-500">Min</p>
                  </div>
                </div>
                <div className="mt-6 border-t-2 border-gray-600">
                  <div className="flex flex-col gap-4 mt-4">
                    <div className="flex gap-2">
                      <FaCheck className="text-blue-700" />
                      Limited Access Library
                    </div>
                    <div className="flex gap-2">
                      <FaCheck className="text-blue-700" />
                      Individual User Capabilities
                    </div>
                    <div className="flex gap-2">
                      <FaCheck className="text-blue-700" />
                      No Updates Facility
                    </div>
                    <div className="flex gap-2">
                      <FaCheck className="text-blue-700" />
                      Standard support
                    </div>
                  </div>
                </div>
                <Link
                  to="/signup"
                  className="flex justify-center font-bold transition duration-300 ease-in-out rounded border-2 border-red-500 px-5 py-3 mt-6 hover:bg-blue-500 hover:text-white hover:border-transparent items-center"
                >
                  Choose plan
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Plans;
