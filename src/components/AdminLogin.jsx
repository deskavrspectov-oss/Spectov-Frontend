import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css"; // Reuse the same CSS file

const AdminLogin = () => {
  const email = import.meta.env.VITE_REACT_APP_EMAIL;
  const pass = import.meta.env.VITE_REACT_APP_PASS;
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleLogin = () => {
    const Iemail = document.getElementById("email").value;
    const Ipass = document.getElementById("pass").value;

    if (Iemail === "" || Ipass === "") {
      setError("Enter Email and Password to login");
    } else if (email === Iemail && pass === Ipass) {
      localStorage.setItem("AdminEmail", email);
      navigate("/admin/all-request");
      window.location.reload();
    } else {
      setError("Invalid Credentials");
    }
  };

  return (
    <div className="arvr-login"> {/* Reusing the same container class */}
      {/* LEFT PANEL – Navigation (original links preserved) */}
      <div className="arvr-login__left">
        <div className="arvr-left-content">
          <h1 className="arvr-welcome-heading">Admin Portal</h1>

          <h2 className="arvr-secondary-heading">New Here ?</h2>
          <Link to="/signup">
            <button className="arvr-nav-button">Sign Up</button>
          </Link>

          <h2 className="arvr-secondary-heading">Already Registered?</h2>
          <Link to="/login">
            <button className="arvr-nav-button">Sign In</button>
          </Link>

          <h2 className="arvr-secondary-heading">Forget Password ?</h2>
          <Link to="/forget-password">
            <button className="arvr-nav-button">Reset Password</button>
          </Link>
        </div>
        <div className="arvr-left-overlay"></div>
      </div>

      {/* RIGHT PANEL – Admin Login Form */}
      <div className="arvr-login__right">
        <div className="arvr-form"> {/* Reusing form styling */}
          <h2 className="arvr-form-title">Login as Admin</h2>

          <input
            type="email"
            placeholder="Admin email"
            name="email"
            required
            className="arvr-input"
            id="email"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            required
            id="pass"
            className="arvr-input"
          />

          {error && <div className="arvr-error">{error}</div>}

          <button
            type="button"
            className="arvr-button arvr-button--primary"
            onClick={handleLogin}
          >
            Sign In as Admin
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;