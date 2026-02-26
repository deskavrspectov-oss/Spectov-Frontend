import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
// Removed old CSS import; using Tailwind for styling

const UserDetails = () => {
  const [user, setUser] = useState({});
  const email = localStorage.getItem("email");

  useEffect(() => {
    const getCodeDetail = async () => {
      try {
        const { data } = await axios.get(`https://spectovbackend.onrender.com/api/details/${email}`);
        setUser(data);
        localStorage.setItem('name', data.firstName);
      } catch (error) {
        console.log(error);
      }
    };

    getCodeDetail();
  }, [email]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("name");
    localStorage.removeItem("courses");

    window.location.reload();
  };

  return (
    <>
      <Navbar />
      <div className="bg-black min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* User Profile Card */}
          <div className="bg-gradient-to-br from-[#1e2632] to-[#192027] rounded-2xl border border-stone-700 p-6 md:p-8 mb-8 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  Hi {user.firstName || 'User'}! 👋
                </h1>
                <p className="text-[#a0a8b7] text-lg">Welcome back to your dashboard</p>
              </div>
              <div className="flex gap-4">
                <Link to="/page">
                  <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-semibold transition duration-300 shadow-lg hover:shadow-xl">
                    Go Back
                  </button>
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-6 py-3 bg-red-600/20 hover:bg-red-600/30 border border-red-500/50 rounded-xl text-red-400 font-semibold transition duration-300"
                >
                  Logout
                </button>
              </div>
            </div>

            {/* User Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              <div className="bg-black/30 rounded-xl p-4 border border-stone-700">
                <p className="text-[#a0a8b7] text-sm">First Name</p>
                <p className="text-white text-lg font-medium">{user.firstName || '—'}</p>
              </div>
              <div className="bg-black/30 rounded-xl p-4 border border-stone-700">
                <p className="text-[#a0a8b7] text-sm">Last Name</p>
                <p className="text-white text-lg font-medium">{user.lastName || '—'}</p>
              </div>
              <div className="bg-black/30 rounded-xl p-4 border border-stone-700">
                <p className="text-[#a0a8b7] text-sm">Email</p>
                <p className="text-white text-lg font-medium break-all">{user.email || '—'}</p>
              </div>
              <div className="bg-black/30 rounded-xl p-4 border border-stone-700">
                <p className="text-[#a0a8b7] text-sm">Referral ID</p>
                <p className="text-white text-lg font-medium">{user.referId || '—'}</p>
              </div>
              <div className="bg-black/30 rounded-xl p-4 border border-stone-700 sm:col-span-2">
                <p className="text-[#a0a8b7] text-sm">People Referred</p>
                <p className="text-white text-lg font-medium">{user.referred || 0} user(s)</p>
              </div>
            </div>
          </div>

          {/* Enrolled Courses Section */}
          {user.courses && user.courses.some(course => course === 'true') && (
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="w-1 h-8 bg-green-500 rounded-full"></span>
                Enrolled Courses
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {user.courses.map((course, index) => (
                  course === 'true' && (
                    <div
                      key={index}
                      className="bg-gradient-to-br from-[#1e2632] to-[#192027] rounded-xl border border-stone-700 p-6 hover:border-green-500/30 transition-all duration-300 shadow-lg"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium">
                          Approved
                        </span>
                      </div>
                      <div className="space-y-3">
                        <p className="text-white">
                          <span className="text-[#a0a8b7]">Course:</span>{' '}
                          <span className="font-medium">{user.coursename?.[index] || 'N/A'}</span>
                        </p>
                        <p className="text-white break-all">
                          <span className="text-[#a0a8b7]">Transaction ID:</span>{' '}
                          <span className="font-mono text-sm">{user.transaction?.[index] || 'N/A'}</span>
                        </p>
                        <p className="text-white">
                          <span className="text-[#a0a8b7]">Referred By:</span>{' '}
                          {user.referal?.[index] === "0"
                            ? "Not Referred"
                            : <span className="text-blue-400">{user.referal?.[index]}@gmail.com</span>
                          }
                        </p>
                      </div>
                    </div>
                  )
                ))}
              </div>
            </div>
          )}

          {/* Pending Courses Section */}
          {user.courses && user.courses.some(course => course === 'pending') && (
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="w-1 h-8 bg-yellow-500 rounded-full"></span>
                Pending Courses
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {user.courses.map((course, index) => (
                  course === 'pending' && (
                    <div
                      key={index}
                      className="bg-gradient-to-br from-[#1e2632] to-[#192027] rounded-xl border border-stone-700 p-6 hover:border-yellow-500/30 transition-all duration-300 shadow-lg"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm font-medium">
                          Pending
                        </span>
                      </div>
                      <div className="space-y-3">
                        <p className="text-white">
                          <span className="text-[#a0a8b7]">Course:</span>{' '}
                          <span className="font-medium">{user.coursename?.[index] || 'N/A'}</span>
                        </p>
                        <p className="text-white break-all">
                          <span className="text-[#a0a8b7]">Transaction ID:</span>{' '}
                          <span className="font-mono text-sm">{user.transaction?.[index] || 'N/A'}</span>
                        </p>
                        <p className="text-white">
                          <span className="text-[#a0a8b7]">Referred By:</span>{' '}
                          {user.referal?.[index] === "0"
                            ? "Not Referred"
                            : <span className="text-blue-400">{user.referal?.[index]}@gmail.com</span>
                          }
                        </p>
                      </div>
                    </div>
                  )
                ))}
              </div>
            </div>
          )}

          {/* If no courses at all, show a placeholder */}
          {(!user.courses || user.courses.length === 0) && (
            <div className="text-center py-16">
              <p className="text-[#a0a8b7] text-lg">No courses enrolled yet.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UserDetails;