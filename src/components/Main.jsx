import CareerCard from "../components/CareerCard";
import { Navbar } from "../components/";
import ctestimg from "../assets/careerCardTestImage.png";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Timeline from "../components/Timeline";
import Demo from "../components/Demo";
import Career_hero from "../components/Career_hero";
import ai from "../assets/aibanner.png";
import appdev from "../assets/app_devBanner.png";
import ar from "../assets/arbanner.png";
import xrai from "../assets/AIXAR.png";
import combodsaweb from "../assets/combo_dsa_web.png";
import dsa from "../assets/dsabanner.png";
import fullstack from "../assets/fullstackbanner.png";
import special from "../assets/specialbanner.png";
import sankalp from "../assets/sankalp.png";
import DVideo from "../assets/Bridging Silence, Building Connections.mp4"
import DVideoMobile from "../assets/SpectovM.mp4"; 

import ultimateQr from "../assets/newQR.jpeg"


import ml from "../assets/ml.png";
import genai from "../assets/genai.png";
import webdev from "../assets/webdev.png";
import devops from "../assets/devops.png";
import cloudcomputing from "../assets/cloudcomputing.png";
import competitiveprogramming from "../assets/competitiveprogramming.png";
import dataanalytics from "../assets/dataanalytics.png";
import deeplearning from "../assets/deeplearning.png";
import app_dev from "../assets/app_dev.png";

let careers = [
  {
    id: 1,
    title: "SpectoV Special",
    price: 6500,
    subtitle: "Premium combo: DSA, Web Dev, AI, App Dev, AR/VR",
    content: "Comprehensive program covering multiple domains including data structures, web development, artificial intelligence, app development, and AR/VR technologies.",
    img: special,
    qr:ultimateQr
  },
  {
    id: 2,
    title: "Gen AI",
    price: 2500,
    subtitle: "Master Generative AI and LLMs",
    content: "Explore the world of Generative AI, including GPT, DALL-E, and other models. Learn to build applications using cutting-edge AI technologies.",
    img: genai,
    qr:ultimateQr
  },
  {
    id: 3,
    title: "Data Analytics",
    price: 2500,
    subtitle: "Transform data into insights",
    content: "Learn data analysis techniques using Python, SQL, and visualization tools. Understand how to extract actionable insights from complex datasets.",
    img: dataanalytics,
    qr:ultimateQr
  },
  {
    id: 4,
    title: "Deep Learning",
    price: 2500,
    subtitle: "Neural networks and advanced AI",
    content: "Dive deep into neural networks, CNNs, RNNs, and transformers. Implement deep learning models using TensorFlow and PyTorch.",
    img: deeplearning,
    qr:ultimateQr
  },
  {
    id: 5,
    title: "Competitive Programming",
    price: 2500,
    subtitle: "Master DSA and problem-solving",
    content: "Prepare for coding interviews and competitions. Learn advanced algorithms, data structures, and problem-solving strategies in C++/Java.",
    img: competitiveprogramming,
    qr:ultimateQr
  },
  {
    id: 6,
    title: "App Development",
    price: 2500,
    subtitle: "Build cross-platform mobile apps",
    content: "Learn to develop mobile applications using Flutter and React Native. Understand UI/UX principles and backend integration.",
    img: app_dev,
    qr:ultimateQr
  },
  {
    id: 7,
    title: "Web Development",
    price: 2500,
    subtitle: "Full-stack web development with MERN",
    content: "Become a full-stack web developer. Master HTML, CSS, JavaScript, React, Node.js, and MongoDB. Build real-world projects.",
    img: webdev,
    qr:ultimateQr
  },
  {
    id: 8,
    title: "Machine Learning",
    price: 2500,
    subtitle: "Foundations of AI and predictive modeling",
    content: "Learn machine learning algorithms, supervised and unsupervised learning, model evaluation, and deployment. Gain hands-on experience with Python and scikit-learn.",
    img: ml,
    qr:ultimateQr
  },
  {
    id: 9,
    title: "Devops",
    price: 2500,
    subtitle: "Streamline development and operations",
    content: "Learn DevOps principles, CI/CD pipelines, containerization with Docker, orchestration with Kubernetes, and cloud services.",
    img: devops,
    qr:ultimateQr
  },
  {
    id: 10,
    title: "Cloud Computing",
    price: 2500,
    subtitle: "Design and deploy cloud solutions",
    content: "Understand cloud architecture, services from AWS, Azure, and GCP. Learn to build scalable, reliable, and secure cloud applications.",
    img: cloudcomputing,
    qr:ultimateQr
  },
];

const Main = () => {
  const [user, setUser] = useState([]);
  const [videoSrc, setVideoSrc] = useState(DVideo);
  const email = localStorage.getItem("email");

  useEffect(() => {
    const getCodeDetail = async () => {
      try {
        const { data } = await axios.get(`https://spectovbackend.onrender.com/api/details/${email}`);
        setUser(data);
        localStorage.setItem('courses', data.courses);
      } catch (error) {
        console.log(error);
      }
    };
    getCodeDetail();
  }, [email]);

  useEffect(() => {
    const handleResize = () => {
      if (window.matchMedia('(max-width: 768px)').matches) {
        setVideoSrc(DVideoMobile);
      } else {
        setVideoSrc(DVideo);
      }
    };

    handleResize(); // Check on initial load
    window.addEventListener('resize', handleResize); // Add event listener

    return () => {
      window.removeEventListener('resize', handleResize); // Clean up event listener
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <>
      <div style={{ backgroundColor: 'black' }}>
        <div style={{ display: "flex", justifyContent: "end" }}>
          <div style={{ display: "flex" }}>
            <h1 className="mt-9 text-white">Hi {user.firstName}</h1>&emsp;
            <Link to="/details" className="mt-9">
              <button style={{ backgroundColor: "blue", color: "white", height: "2.5rem", borderRadius: "10px" }}>&emsp;Profile&emsp;</button>
            </Link>&emsp;
            <Link to="/login" className="mt-9">
              <button style={{ backgroundColor: "red", color: "white", height: "2.5rem", borderRadius: "10px" }} onClick={handleLogout}>&emsp;Logout&emsp;</button>
            </Link>&emsp;
          </div>
        </div>
        <div className="container mx-auto p-12" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <img src={sankalp} alt="Sankalp image" className="mt-2 rounded-lg w-full max-w-full object-contain" style={{ borderRadius: '15px' }} />
        </div>
        <div className="container mx-auto p-12" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <video src={videoSrc} controls autoPlay loop muted className="mt-2 rounded-lg w-full max-w-full object-contain h-screen" style={{ borderRadius: '15px' }} />
        </div>
        <h1 id="careers_section" className="ml-5 mt-15 text-4xl font-bold text-white md:ml-24">
          Careers At SpectoV
        </h1>
        <div className="w-100 m-10 ml-5 flex flex-wrap md:ml-20">
          {careers.map((career) => (
            <CareerCard
              key={career.id}
              item={career.id}
              title={career.title}
              img={career.img}
            />
          ))}
        </div>
        <Career_hero />
        <Timeline />

        {/* Floating WhatsApp Button */}
        <a
          href="https://wa.me/917042860263"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-4 left-4 bg-green-500 hover:bg-green-600 text-white rounded-full p-3 shadow-lg z-50 transition-colors"
          aria-label="Chat on WhatsApp"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path d="M19.077 4.928C17.191 3.041 14.683 2 12.006 2c-5.35 0-9.71 4.34-9.71 9.69 0 1.708.446 3.38 1.294 4.848L2 22l5.567-1.479c1.42.775 3.02 1.185 4.638 1.185 5.35 0 9.71-4.34 9.71-9.69 0-2.59-1.01-5.025-2.838-6.888zM12.006 20.14c-1.456 0-2.882-.393-4.12-1.133l-.296-.176-3.415.897.912-3.33-.192-.308a8.195 8.195 0 0 1-1.263-4.38c0-4.51 3.674-8.184 8.184-8.184 2.186 0 4.24.852 5.787 2.398a8.135 8.135 0 0 1 2.398 5.787c0 4.51-3.674 8.184-8.184 8.184zm4.49-6.126c-.245-.123-1.455-.718-1.68-.8-.225-.082-.39-.123-.554.123-.164.246-.64.8-.785.964-.144.164-.29.184-.535.061-.246-.123-1.036-.382-1.973-1.218-.73-.65-1.222-1.452-1.366-1.697-.143-.246-.015-.38.108-.503.11-.11.246-.287.369-.43.123-.144.164-.246.246-.41.082-.164.041-.307-.02-.43-.062-.123-.555-1.336-.76-1.83-.2-.48-.402-.415-.554-.422-.143-.008-.307-.008-.47-.008-.164 0-.43.062-.655.307-.225.246-.86.84-.86 2.05 0 1.21.88 2.378 1.003 2.542.123.164 1.73 2.642 4.19 3.704.586.246 1.044.394 1.4.505.588.184 1.124.158 1.547.096.472-.07 1.455-.594 1.66-1.168.205-.574.205-1.066.143-1.168-.06-.102-.226-.164-.47-.287z" />
          </svg>
        </a>
      </div>
    </>
  );
};

export default Main;