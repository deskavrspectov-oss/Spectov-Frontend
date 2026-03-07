// careers/0 or careers/1 ----->career detail page 

import React, { useState, useEffect } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import axios from 'axios';
// Removed external CSS import - using Tailwind for styling

// Image imports (kept as original)
import ctestimg from "../assets/logo.svg";
import qr from "../assets/newQR.jpeg";
import ai from "../assets/aibanner.png";
import appdev from "../assets/app_devBanner.png";
import ar from "../assets/arbanner.png";
import xrai from "../assets/AIXAR.png";
import combodsaweb from "../assets/combo_dsa_web.png";
import dsa from "../assets/dsabanner.png";
import fullstack from "../assets/fullstackbanner.png";
import special from "../assets/specialbanner.png";
import join512 from "../assets/join512.png";

import specialqr from "../assets/newQR.jpeg";
import fullstackqr from "../assets/newQR.jpeg";
import dsaqr from "../assets/newQR.jpeg";
import combodsawebqr from "../assets/newQR.jpeg";
import xraiqr from "../assets/newQR.jpeg";
import arqr from "../assets/newQR.jpeg";
import appdevqr from "../assets/newQR.jpeg";
import aiqr from "../assets/newQR.jpeg";

import ultimateQr from "../assets/newQR.jpeg";

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

export default function CareerDetails() {
  const location = useLocation();
  const data = location.state; // This may be 'true', 'false', 'pending', or undefined
  const user = localStorage.getItem("token");
  const email = localStorage.getItem("email");

  const { item } = useParams();
  const career = careers.find((c) => c.id === parseInt(item));

  // State for access: 'true', 'false', or 'pending'
  const [access, setAccess] = useState(null);
  const [inputs, setInputs] = useState({ transactionId: '' });
  const [refer, setRefer] = useState({ referId: '' });
  const [error, setError] = useState("");

  // Determine access based on localStorage and navigation state
  useEffect(() => {
    if (!career) return;

    // If user is not logged in, access is false (needs to login/enroll)
    if (!user) {
      setAccess('false');
      return;
    }

    // Check localStorage for enrolled courses
    const coursesStr = localStorage.getItem('courses');
    let enrolledCourses = [];
    try {
      enrolledCourses = JSON.parse(coursesStr) || [];
    } catch {
      // If it's a comma-separated string
      enrolledCourses = coursesStr ? coursesStr.split(',').map(id => parseInt(id.trim())) : [];
    }

    const hasAccess = enrolledCourses.includes(career.id);

    if (hasAccess) {
      setAccess('true');
    } else {
      // If no access, check if we have a pending state from navigation
      if (data === 'pending') {
        setAccess('pending');
      } else {
        // Default to false (show enroll flow)
        setAccess('false');
      }
    }
  }, [career, user, data]);

  if (!career) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center text-white text-xl">
        Career not found
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (inputs.transactionId === "") {
        setError("Enter Transaction Id");
      } else {
        const referEmail = `${refer.referId}@gmail.com`;
        if (refer.referId !== "") {
          await axios.put(`https://spectovbackend.onrender.com/api/refer/${referEmail}`);
        }
        if (email === referEmail) {
          await axios.put(`https://spectovbackend.onrender.com/api/refer/error`);
        }
        if (refer.referId !== "") {
          await axios.put(`https://spectovbackend.onrender.com/api/transaction/${email}/${career.id}/${inputs.transactionId}/${career.title}/${refer.referId}`);
        } else {
          await axios.put(`https://spectovbackend.onrender.com/api/transaction/${email}/${career.id}/${inputs.transactionId}/${career.title}/0`);
        }
        await axios.put(`https://spectovbackend.onrender.com/api/enroll/approval/${email}/${career.id}`);
        setAccess('pending');
        alert('Enrollment Successful. Waiting for approval from owner');
      }
    } catch (error) {
      setError("Wrong Referral Id.");
    }
  };

  const handleChange1 = (e) => {
    setInputs(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleChange2 = (e) => {
    setRefer(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit1 = (event) => {
    event.preventDefault();
    document.getElementById("tid").style.display = "flex";
    document.getElementById("rid").style.display = "flex";
    document.getElementById("tbtn").style.display = "flex";
  };

  return (
    <div className="bg-black min-h-screen pt-24 pb-16">
      {/* Go Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <Link
          to={user ? '/page' : '/careers'}
          className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-semibold transition duration-300 shadow-lg"
        >
          ← Go Back
        </Link>
      </div>

      {/* Career Image */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <img 
          src={career.img} 
          alt={career.title} 
          className="w-full rounded-2xl shadow-2xl border border-stone-700"
        />
      </div>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* QR Code Card */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-[#1e2632] to-[#192027] rounded-2xl border border-stone-700 p-6 shadow-xl sticky top-24">
              <h3 className="text-xl font-bold text-white mb-4 text-center">QR Code</h3>
              <div className="flex flex-col items-center">
                <img 
                  src={qr} 
                  alt="Payment QR" 
                  className="w-48 h-48 object-contain mb-4 rounded-lg border-2 border-stone-600"
                />
                <p className="text-3xl font-bold text-white mb-2">₹{career.price}</p>
                <p className="text-[#a0a8b7] text-sm">Scan to Pay</p>
                <p className="text-[#a0a8b7] text-xs mt-2">UPI / Cards / NetBanking</p>
              </div>
            </div>
          </div>

          {/* Course Details Card */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-[#1e2632] to-[#192027] rounded-2xl border border-stone-700 p-6 md:p-8 shadow-xl">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
                {career.title}
              </h1>
              <h2 className="text-xl text-[#a0a8b7] mb-6 leading-relaxed">
                {career.subtitle}
              </h2>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 mb-6">
                {access === 'true' ? (
                  <Link
                    to="/course"
                    state={career}
                    className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-xl text-white font-semibold transition duration-300 shadow-lg"
                  >
                    Open Course
                  </Link>
                ) : access === 'false' ? (
                  <>
                    <button
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-semibold transition duration-300 shadow-lg"
                      onClick={handleSubmit1}
                    >
                      Enroll Now
                    </button>

                    {/* Hidden inputs (revealed by Enroll click) */}
                    <input
                      type="text"
                      id="tid"
                      className="w-full md:w-auto flex-1 bg-[#0f1217] border border-stone-600 rounded-xl px-4 py-3 text-white placeholder-[#6b7280] focus:outline-none focus:border-blue-500 transition"
                      placeholder="Enter Transaction Id"
                      name="transactionId"
                      value={inputs.transactionId}
                      onChange={handleChange1}
                      style={{ display: "none" }}
                    />
                    <input
                      type="text"
                      id="rid"
                      className="w-full md:w-auto flex-1 bg-[#0f1217] border border-stone-600 rounded-xl px-4 py-3 text-white placeholder-[#6b7280] focus:outline-none focus:border-blue-500 transition"
                      placeholder="Have a referral? (optional)"
                      name="referId"
                      value={refer.referId}
                      onChange={handleChange2}
                      style={{ display: "none" }}
                    />
                    <button
                      id="tbtn"
                      className="px-6 py-3 bg-yellow-600 hover:bg-yellow-700 rounded-xl text-white font-semibold transition duration-300 shadow-lg"
                      onClick={handleSubmit}
                      style={{ display: "none" }}
                    >
                      Submit Payment
                    </button>

                    {error && (
                      <div className="w-full p-4 bg-red-900/30 border border-red-500 rounded-xl text-red-400">
                        ⚠️ {error}
                      </div>
                    )}
                  </>
                ) : access === 'pending' ? (
                  <button
                    className="px-6 py-3 bg-gray-600 cursor-not-allowed rounded-xl text-white font-semibold opacity-75"
                    onClick={() => alert("Approval pending by owner.")}
                  >
                    Pending Approval
                  </button>
                ) : null /* Should never happen, but safe fallback */}
              </div>

              <p className="text-[#a0a8b7] text-sm border-t border-stone-700 pt-4 mt-4">
                Any doubt or issue? Contact us at{' '}
                <a href="mailto:spectov.pvt.ltd@gmail.com" className="text-blue-400 hover:underline">
                  spectov.pvt.ltd@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

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
  );
}