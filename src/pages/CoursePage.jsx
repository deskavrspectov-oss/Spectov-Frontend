import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
// Removed CSS import; using Tailwind
import { Navbar } from "../components";
import { useLocation, useNavigate } from "react-router-dom";
import bgImg from "../../public/yue-ma-mQEjK67BCTA-unsplash.jpg";
import join512 from "../assets/join512.png";

const Content = ({ content }) => {
  return (
    <div className="flex items-center justify-center h-full">
      <h1 className="text-3xl md:text-4xl font-bold text-white text-center">
        {content}
      </h1>
    </div>
  );
};

export default function Example() {
  const [content, setContent] = useState("Course Content");
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const [videoLink, setVideoLink] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;

  const fetchCourses = async () => {
    try {
      const response = await axios.get(
        "https://admin-spectov-backend.onrender.com/api/all",
      );
      setCourses(response.data);
    } catch (err) {
      setError(err.message);
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const days = 65; // Set how many days you want

  const handleAccordionClick = (title) => {
    setContent(title);
  };

  const handleResourceClick = (id) => {
    window.open(courses[data?.id]?.materialLink[id - 1]);
    setVideoLink(""); // Clear the video link if you want to hide the video when resources are clicked
  };

  const handleVideoClick = (link) => {
    setContent("");
    const l = link; // for drive link
    setVideoLink(l);
  };

  const generateAccordionItems = () => {
    const items = [];
    for (let i = 1; i <= days; i++) {
      const video = courses[data?.id]?.videoLink[i - 1];
      if (video !== "#") {
        items.push(
          <AccordionItem key={i} className="border-b border-stone-700 last:border-b-0">
            <AccordionItemHeading>
              <AccordionItemButton
                onClick={() => handleAccordionClick(`Day ${i}`)}
                className="w-full text-left px-4 py-3 bg-gradient-to-r from-[#1e2632] to-[#192027] hover:from-[#252f3d] hover:to-[#1e2632] text-white font-medium transition duration-200 cursor-pointer"
              >
                Module {i}
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel className="bg-[#0f1217] p-4 flex gap-4 border-t border-stone-700">
              <button
                onClick={() => handleResourceClick(i)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-sm font-semibold transition duration-200"
              >
                Resources
              </button>
              <button
                onClick={() => handleVideoClick(video)}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white text-sm font-semibold transition duration-200"
              >
                Video
              </button>
            </AccordionItemPanel>
          </AccordionItem>
        );
      } else {
        console.log("Data not updated or video link is not available");
      }
    }
    return items;
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://player.vimeo.com/api/player.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-black min-h-screen pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Course Title */}
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-8">
            {data?.title}
          </h1>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Accordion Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-[#1e2632] to-[#192027] rounded-2xl border border-stone-700 p-4 shadow-xl">
                <h2 className="text-xl font-bold text-white mb-4 px-2">Course Modules</h2>
                <Accordion allowZeroExpanded className="space-y-2">
                  {generateAccordionItems()}
                </Accordion>
              </div>
            </div>

            {/* Video/Content Area */}
            <div className="lg:col-span-3">
              <div className="bg-gradient-to-br from-[#1e2632] to-[#192027] rounded-2xl border border-stone-700 p-6 shadow-xl h-full">
                <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-[#0f1217]">
                  {videoLink ? (
                    <iframe
                      className="absolute inset-0 w-full h-full"
                      src={videoLink}
                      title="Video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <Content content={content} />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* WhatsApp Community Section */}
          <div className="mt-12">
            <div className="bg-gradient-to-br from-[#1e2632] to-[#192027] rounded-2xl border border-stone-700 p-8 shadow-xl">
              <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">
                Connect With Us and Your Batchmates
              </h2>
              <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                {/* QR Code */}
                <div className="flex flex-col items-center">
                  <div className="bg-white p-4 rounded-xl shadow-lg">
                    <img
                      src={data?.qr}
                      alt="QR Code"
                      className="w-32 h-32 object-contain"
                    />
                  </div>
                  <p className="text-[#a0a8b7] mt-3">Scan to join</p>
                </div>

                {/* Join Button */}
                <div className="flex flex-col items-center">
                  <a
                    href={data?.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                  >
                    <div className="bg-[#25D366] hover:bg-[#20b859] rounded-2xl p-6 transition duration-300 shadow-xl transform group-hover:scale-105">
                      <img
                        src={join512}
                        alt="Join WhatsApp Group"
                        className="w-32 h-32 object-contain"
                      />
                    </div>
                  </a>
                  <p className="text-[#a0a8b7] mt-3">Join WhatsApp Group</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}