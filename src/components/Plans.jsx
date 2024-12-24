// import React from 'react'
// import { GrFormCheckmark } from "react-icons/gr";
import { FaCheck } from "react-icons/fa";

const Plans = () => {
  return (
    <section className="py-24 shadow-inner">
      <div className="grid gap-10 md:gap-16">
        <div className="flex flex-col justify-center items-center">
          <div className="w-11/12 md:w-3/4 lg:w-1/2">
            <h2 className="text-center text-black font-bold text-4xl md:text-5xl lg:text-6xl mb-6 md:mb-8 leading-snug">
              The most affordable investment plan for you
            </h2>
            <p className="text-gray-500 text-lg md:text-xl text-center">
              Earn with ease using our investment plan
            </p>
          </div>
        </div>
        <div className="px-6 md:px-12 lg:px-24">
          <div className="grid md:flex gap-6 justify-center items-center">
            <div className="w-full md:w-1/2 lg:w-1/3">
              <div className="px-6 py-8 border mt-6 rounded-lg shadow-lg">
                <div>
                  <div className="text-xl font-bold">
                    <h4>Basic Plan</h4>
                  </div>
                  <div className="flex items-end">
                    <h2 className="text-5xl font-bold leading-tight">
                      $<span>1000</span>
                    </h2>
                    <p className="text-xl text-gray-500">Min</p>
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
                <a
                  href="/signup"
                  className="flex justify-center font-bold rounded border-2 transition duration-300 ease-in-out border-red-500 px-6 py-4 mt-8 hover:bg-blue-500 hover:text-white hover:border-transparent items-center"
                >
                  <button>Choose plan</button>
                </a>
              </div>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/3">
              <div className="px-6 py-8 mt-6 shadow-lg bg-black rounded-lg text-white">
                <div>
                  <div className="text-xl font-bold">
                    <h4>Classic Plan</h4>
                  </div>
                  <div className="flex items-end">
                    <h2 className="text-5xl font-bold leading-tight">
                      $<span>5,000</span>
                    </h2>
                    <p className="text-xl text-gray-500">Min</p>
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
                <a
                  href="/signup"
                  className="flex bg-red-500 justify-center font-bold transition duration-300 ease-in-out rounded border-2 border-red-500 px-6 py-4 mt-8 hover:bg-blue-500 hover:text-white hover:border-transparent items-center"
                >
                  <button>Choose plan</button>
                </a>
              </div>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/3">
              <div className="px-6 py-8 mt-6 rounded-lg shadow-lg">
                <div className="">
                  <div className="text-xl font-bold">
                    <h4>Premium Plan</h4>
                  </div>
                  <div className="flex items-end">
                    <h2 className="text-5xl font-bold leading-tight">
                      $<span>10,000</span>
                    </h2>
                    <p className="text-xl text-gray-500">Min</p>
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
                <a
                  href="/signup"
                  className="flex justify-center font-bold transition duration-300 ease-in-out rounded border-2 border-red-500 px-6 py-4 mt-8 hover:bg-blue-500 hover:text-white hover:border-transparent items-center"
                >
                  <button>Choose plan</button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Plans;
