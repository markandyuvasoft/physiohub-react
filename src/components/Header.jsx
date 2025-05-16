import React from "react";
import heroimage from "../assets/h1.png";
import heroimage2 from "../assets/h2.png";
import svg6 from "../assets/svg8.png";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const token = localStorage.getItem("loginToken");

  const navigate = useNavigate();

  return (
    <div className="w-full bg-[#f3eefa]">
      <div className="flex flex-col-reverse md:flex-row items-center justify-between max-w-7xl mx-auto px-4 py-10">
        <div className="w-full md:w-1/2 text-center md:text-left">
          <p className="text-sm font-bold text-purple-700">
            OVER 200+ RESOURCES
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight mt-2">
            Master Your <span className="text-purple-600">Physiotherapy</span>{" "}
            Skills Now!
          </h1>
          <p className="text-gray-600 mt-4">
            Maximize your physiotherapy skills with our expert-led courses and
            tailored resources.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-center md:justify-start">

            <button onClick={() => navigate(token ? "/studentDashboard" : "/login")}
              className="cursor-pointer hover:bg-purple-600 w-full sm:w-auto px-6 py-3 rounded-xl bg-purple-700 text-white font-semibold"
            >
              Get Started
            </button>

          </div>
        </div>

        <div className="w-full md:w-1/2 relative">
          <img src={svg6} alt="Background SVG" />

          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center gap-5 mb-10 md:mb-0">
            <img
              className="w-1/5 sm:w-1/4 md:w-[30%] md:h-[35%] rounded-xl"
              src={heroimage}
              alt="Hero"
            />
            <img
              className="w-2/5 sm:w-1/3 md:w-2/5 rounded-xl mt-4 md:mt-10"
              src={heroimage2}
              alt="Hero 2"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
