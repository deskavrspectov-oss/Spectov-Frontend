import CareerCard from "../components/CareerCard";
import { Navbar } from "../components/";
import ctestimg from "../assets/careerCardTestImage.png";
import Timeline from "../components/Timeline";
import Demo from "../components/Demo";
import React, { useState, useEffect } from "react";
import Career_hero from "../components/Career_hero";
import CareerNavbar from "../components/CareerNavbar";

import ai from "../assets/aibanner.png";
import appdev from "../assets/app_devBanner.png";
import ar from "../assets/arbanner.png";
import xrai from "../assets/AIXAR.png";
import combodsaweb from "../assets/combo_dsa_web.png";
import dsa from "../assets/dsabanner.png";
import fullstack from "../assets/fullstackbanner.png";
import special from "../assets/specialbanner.png";
import Sankalp from "../components/Sankalp";
import sankalpimg from "../assets/sankalp.png";
import DVideo from "../assets/Bridging Silence, Building Connections.mp4";
import DVideoMobile from "../assets/SpectovM.mp4";

let careers = [
  {
    id: 0,
    title: "SpectoV Special",
    price: 6500,
    subtitle:
      "combo of dsa , web dev ,AI , ,App dev our premium program  ar vr",
    content: "Artificial Intelligence and Machine Learning",
    img: special,
  },
  {
    id: 1,
    title: "Artificial Intelligence ",
    price: 2500,
    subtitle: "Artificial Intelligence and Machine Learning",
    content: "Artificial Intelligence and Machine Learning",
    img: ai,
  },
  {
    id: 2,
    title: "Augmented Reality",
    price: 3000,
    subtitle: "Learn Blender, Learn how ar vr is made ",
    content: "Artificial Intelligence and Machine Learning",
    img: ar,
  },
  {
    id: 3,
    title: "Logic Building and DSA",
    price: 2500,
    subtitle: "This course in c++",
    content: "",
    img: dsa,
  },
  {
    id: 4,
    title: "DSA And Full Stack Dev",
    price: 4000,
    subtitle: "This course is combo of dsa and full stack Mern dev",
    content: "",
    img: combodsaweb,
  },
  {
    id: 5,
    title: " Artificial Int And Ar / Vr",
    price: 4000,
    subtitle:
      "This course is combo of DSA and Artificial Intelligence and Machine Learning",
    content: "Artificial Intelligence and Machine Learning",
    img: xrai,
  },
  {
    id: 6,
    title: "Full Stack Development",
    price: 2500,
    subtitle:
      "Learn Full Stack Development and Learn With Industry Experience ",
    content: "Learn Full Stack Development content",
    img: fullstack,
  },
  {
    id: 7,
    title: "App Development",
    price: 2500,
    subtitle: "Learn Flutter , Learn App Dev with Industry Leader",
    content: "Artificial Intelligence and Machine Learning",
    img: appdev,
  },
];

const CareerPage = () => {
  const [videoSrc, setVideoSrc] = useState(DVideo);

  useEffect(() => {
    const handleResize = () => {
      if (window.matchMedia("(max-width: 768px)").matches) {
        setVideoSrc(DVideoMobile);
      } else {
        setVideoSrc(DVideo);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Filter out the special card (id: 0) from the grid list to avoid duplication
  const otherCareers = careers.filter((career) => career.id !== 0);

  return (
    <div className="bg-black min-h-screen">
      <CareerNavbar />
      <Sankalp />
      {/* Commented video section (kept as original) */}
      {/* <div className="container mx-auto p-12 flex justify-center items-center">
        <img src={sankalpimg} alt="Sankalp image" className="mt-9 rounded-lg w-full max-w-full object-contain" style={{ borderRadius: '15px' }} />
      </div>
      <div className="container mx-auto p-12 flex justify-center items-center">
        <video src={videoSrc} controls autoPlay loop muted className="mt-2 rounded-lg w-full max-w-full object-contain" style={{ borderRadius: '15px' }} />
      </div> */}
      <Career_hero />
      <Timeline />

      {/* Featured Special Card Section */}
      <section className="px-4 md:px-8 lg:px-16 max-w-7xl mx-auto mt-20">
        <h1
          id="careers_section"
          className="text-4xl md:text-5xl font-bold text-white mb-12 text-center md:text-left"
        >
          Careers At SpectoV
        </h1>

        <div className="flex justify-center">
          <div className="w-full max-w-4xl transform transition duration-500 hover:scale-105">
            <div className="bg-gradient-to-br from-[#192027] to-[#1e2632] rounded-3xl border border-stone-700 p-6 md:p-8 shadow-2xl">
              <img
                className="rounded-xl w-full object-cover max-h-[400px]"
                src={special}
                alt="SpectoV Special"
              />
              <h2 className="text-3xl md:text-4xl font-bold text-white mt-8 mb-4">
                SpectoV Special
              </h2>
              {/* You can uncomment and style price/button if needed */}
              {/* <p className="text-stone-300 text-lg mb-6">
                The ultimate bundle of skills and opportunity – learn from industry experts and become part of our core team.
              </p>
              <div className="flex justify-center">
                <a
                  href="https://www.example.com/apply"
                  className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-semibold text-lg transition duration-300"
                >
                  Apply Now
                </a>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* Other Courses Grid */}
      <section className="px-4 md:px-8 lg:px-16 max-w-7xl mx-auto mt-24 pb-20">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center md:text-left">
          Our Other Courses
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {otherCareers.map((career) => (
            <CareerCard
              key={career.id}
              item={career.id}
              title={career.title}
              img={career.img}
              // You can pass additional props like price if CareerCard supports them
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default CareerPage;