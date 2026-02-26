import React from "react";
import { SectionWrapper } from "../hoc";
import { Link } from 'react-router-dom';

const Defxv = () => {
  return (
    <div className="bg-gradient-to-br from-[#1e2632] to-[#192027] rounded-2xl border border-stone-700 p-6 md:p-8 shadow-xl flex flex-col md:flex-row items-center gap-8">
      {/* Left Content */}
      <div className="flex-1 text-center md:text-left">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight">
          DefXV: Bridging Worlds with AR/VR - Translate Sign Language and Experience Mobile Magic!
        </h1>
        <div className="mt-6 md:mt-8">
          <Link to="/products">
            <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl text-white font-semibold text-lg transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              Learn More
            </button>
          </Link>
        </div>
      </div>

      {/* Right Image */}
      <div className="flex-1 flex justify-center">
        <img
          src="/glasses3.png"
          alt="AR/VR glasses"
          className="max-w-full h-auto object-contain rounded-lg"
        />
      </div>
    </div>
  );
};

export default SectionWrapper(Defxv, "defxv");