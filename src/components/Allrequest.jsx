import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Styles/allRequest.css";
import { useNavigate } from "react-router-dom";

// Backend URL from env
const API = import.meta.env.VITE_API_URL || "https://spectovbackend.onrender.com";

function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Fetch Users
  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API}/api/all-request`);
      setUsers(res.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to load users");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Approve
  const handleApprove = async (email, index) => {
    try {
      await axios.put(
        `${API}/api/enroll/permission/${email}/${index}`
      );

      alert("Enrollment Successful");
      fetchUsers(); // refresh data without reload
    } catch (err) {
      alert("Approval failed");
      console.error(err);
    }
  };

  // Reject
  const handleReject = async (email, index) => {
    try {
      await axios.put(
        `${API}/api/reject/permission/${email}/${index}`
      );

      alert("Enrollment Rejected");
      fetchUsers();
    } catch (err) {
      alert("Rejection failed");
      console.error(err);
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("AdminEmail");
    navigate("/login");
  };

  if (loading) return <h1>Loading...</h1>;

  if (error) return <p>{error}</p>;

  // Filter pending users
  const filteredUsers = users.filter((u) =>
    u.courses.includes("pending")
  );

  return (
    <div className="parent">
      <div className="container">

        {/* Header */}
        <div id="user-actions">
          <h1 className="header">Pending Requests</h1>

          <button
            onClick={handleLogout}
            id="profile-button"
          >
            Logout
          </button>
        </div>

        {/* No Requests */}
        {filteredUsers.length === 0 ? (
          <p className="no-users">
            No pending requests found.
          </p>
        ) : (

          filteredUsers.map((user) => (
            <div key={user._id} className="user-card">

              <h2 className="user-name">
                {user.firstName} {user.lastName}
              </h2>

              <p className="user-email">
                Email: {user.email}
              </p>

              <h3 className="section-title">
                Pending Courses
              </h3>

              <ul className="course-list">

                {user.courses.map((course, index) => {

                  if (course !== "pending") return null;

                  return (
                    <li key={index} className="course-item">

                      <p>
                        Status: {course}
                      </p>

                      <p>
                        Transaction ID: {user.transaction[index]}
                      </p>

                      <p>
                        Course: {user.coursename[index]}
                      </p>

                      <p>
                        Referred By:{" "}
                        {user.referal[index] === "0"
                          ? "Not Referred"
                          : `${user.referal[index]}@gmail.com`}
                      </p>

                      <button
                        className="approve-button"
                        onClick={() =>
                          handleApprove(user.email, index)
                        }
                      >
                        Approve
                      </button>

                      <button
                        className="reject-button"
                        onClick={() =>
                          handleReject(user.email, index)
                        }
                      >
                        Reject
                      </button>

                    </li>
                  );
                })}

              </ul>

            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default UsersList;
