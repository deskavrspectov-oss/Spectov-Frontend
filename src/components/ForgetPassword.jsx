import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/Login.css"; // Reuse the same CSS file

const ForgetPassword = () => {
  const [inputemail, setInputemail] = useState({ email: '' });
  const [inputpass, setInputpass] = useState({ password: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `https://spectovbackend.onrender.com/api/user/forget-password/${inputpass.password}/${inputemail.email}`
      );
      navigate("/login");
    } catch (error) {
      console.log(error);
      setError("No user exist with this email.");
    }
  };

  const handleChangeEmail = (e) => {
    setInputemail({ email: e.target.value });
  };

  const handleChangePassword = (e) => {
    setInputpass({ password: e.target.value });
  };

  return (
    <div className="arvr-login"> {/* Reusing the container class */}
      {/* LEFT PANEL – Navigation (original links preserved) */}
      <div className="arvr-login__left">
        <div className="arvr-left-content">
          <h1 className="arvr-welcome-heading">Reset Password</h1>

          <h2 className="arvr-secondary-heading">New Here ?</h2>
          <Link to="/signup">
            <button className="arvr-nav-button">Sign Up</button>
          </Link>

          <h2 className="arvr-secondary-heading">Login as Admin ?</h2>
          <Link to="/admin-login">
            <button className="arvr-nav-button">Admin Login</button>
          </Link>

          <h2 className="arvr-secondary-heading">Already Registered ?</h2>
          <Link to="/login">
            <button className="arvr-nav-button">Sign in</button>
          </Link>
        </div>
        <div className="arvr-left-overlay"></div>
      </div>

      {/* RIGHT PANEL – Reset Password Form */}
      <div className="arvr-login__right">
        <form onSubmit={handleSubmit} className="arvr-form">
          <h2 className="arvr-form-title">Reset Password</h2>

          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChangeEmail}
            value={inputemail.email}
            required
            className="arvr-input"
          />
          <input
            type="password"
            placeholder="Enter New Password"
            name="password"
            onChange={handleChangePassword}
            value={inputpass.password}
            required
            className="arvr-input"
          />

          {error && <div className="arvr-error">{error}</div>}

          <button type="submit" className="arvr-button arvr-button--primary">
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;