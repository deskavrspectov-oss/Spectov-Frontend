// careers/0 or careers/1 ----->career detail page 

import React, { useState } from "react";
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

let careers = [
  {
    id: 0,
    title: "SpectoV Special",
    price: 6500,
    subtitle: "combo of dsa, web dev, AI, App dev our premium program ar vr",
    content: "https://drive.google.com/file/d/1cc3SSmGQX7XOVYEwrTm1WehPs929iQMt/view?usp=sharing",
    img: special,
    link: "https://chat.whatsapp.com/IygldyZVZ4dKDIK150cAoT",
    qr : specialqr,
  },
  {
    id: 1,
    title: "Artificial Intelligence",
    price: 2500,
    subtitle: "Artificial Intelligence and Machine Learning",
    content: "https://docs.google.com/document/d/1r-urup_5fblXSp75H0-oHdir_b6H8U6kJB-mfz3cEXU/edit?usp=sharing",
    img: ai,
    link: "https://chat.whatsapp.com/JdaZUI35eLz413ACtTrj4Q",
    qr : aiqr,
  },
  {
    id: 2,
    title: "Augmented Reality",
    price: 3000,
    subtitle: "Learn Blender, Learn how ar vr is made",
    content: "https://docs.google.com/document/d/1n4QqiHa_nQQ0Oa7gUNhU6Gu9GBIdGIFn/edit?usp=sharing&ouid=111997764254682934776&rtpof=true&sd=true",
    img: ar,
    link: "https://chat.whatsapp.com/B6XVZRVa7bA0pqSvVkGrqT",
    qr : arqr,
  },
  {
    id: 3,
    title: "Logic Building and DSA",
    price: 2500,
    subtitle: "This course in c++",
    content: "https://docs.google.com/document/d/12UoDZsnpOAe4rMwMNOntIS4b2-GQIC84GalgHBPyUfU/edit?usp=sharing",
    img: dsa,
    link: "https://chat.whatsapp.com/EaRCWPW6cJt9LZoxjlGoyb",
    qr : dsaqr,
  },
  {
    id: 4,
    title: "DSA And Full Stack Dev",
    price: 4000,
    subtitle: "This course is combo of dsa and full stack Mern dev",
    content: "https://docs.google.com/document/d/1BnrIXoR0fS4GalP4aKfcA3OUTuY8vBnNmpTkbeDNnsY/edit?usp=sharing",
    img: combodsaweb,
    link: "https://chat.whatsapp.com/ID00z5jQt11GspIYoGwVc6",
    qr : combodsawebqr,
  },
  {
    id: 5,
    title: "Artificial Int & Ar-Vr",
    price: 4000,
    subtitle: "This course is combo of DSA and Artificial Intelligence and Machine Learning",
    content: "https://docs.google.com/document/d/1MCSKAIcaKT2TW-P02O2vAslgKvJ2_m6TpU-BTpByKeg/edit?usp=sharing",
    img: xrai,
    link: "https://chat.whatsapp.com/KbtCHbXcd6L62dmswCatiQ",
    qr : xraiqr,
  },
  {
    id: 6,
    title: "Full Stack Development",
    price: 2500,
    subtitle: "Learn Full Stack Development and Learn With Industry Experience",
    content: "https://docs.google.com/document/d/1zokS-0ZnLo1Rsomwfpy1hxQboo01r857/edit?usp=sharing&ouid=111997764254682934776&rtpof=true&sd=true",
    img: fullstack,
    link: "https://chat.whatsapp.com/KlYx8Q8yUVhExEs43Pcp79",
    qr : fullstackqr,
  },
  {
    id: 7,
    title: "App Development",
    price: 2500,
    subtitle: "Learn Flutter, Learn App Dev with Industry Leader",
    content: "https://drive.google.com/file/d/1b1JdfxBpx39dP2-FnByFjeLmdqdykLJP/view?usp=sharing",
    img: appdev,
    link: "https://chat.whatsapp.com/LLLkY9Wp1qGIC9xmUbmApy",
    qr : appdevqr,
  },
];

export default function CareerDetails() {
  const location = useLocation();
  const data = location.state;
  const user = localStorage.getItem("token");
  const email = localStorage.getItem("email");

  const { item } = useParams();
  const career = careers.find((c) => c.id === parseInt(item));

  if (!career) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center text-white text-xl">
        Career not found
      </div>
    );
  }

  const [access, setAccess] = useState(data);
  const [inputs, setInputs] = useState({ transactionId: '' });
  const [refer, setRefer] = useState({ referId: '' });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(inputs.transactionId==="") {
        setError("Enter Transaction Id");
      } else {
        const referEmail = `${refer.referId}@gmail.com`;
        if(refer.referId!=="") {
          await axios.put(`https://spectovbackend.onrender.com/api/refer/${referEmail}`);
        }
        if(email===referEmail) {
          await axios.put(`https://spectovbackend.onrender.com/api/refer/error`);
        }
        if(refer.referId!=="") {
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
                <a
                  href={career.content}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-xl text-white font-semibold transition duration-300 shadow-lg"
                >
                  View Course
                </a>

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
                ) : (
                  <button
                    className="px-6 py-3 bg-gray-600 cursor-not-allowed rounded-xl text-white font-semibold opacity-75"
                    onClick={() => alert("Approval pending by owner.")}
                  >
                    Pending Approval
                  </button>
                )}
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
    </div>
  );
}