import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "https://spectovbackend.onrender.com/api/users";
      const { data: res } = await axios.post(url, data);
      const referId = data.email.substring(0, data.email.indexOf("@"));
      await axios.put(
        `https://spectovbackend.onrender.com/api/refer/${data.email}/${referId}`
      );
      navigate("/login");
      console.log(res.message);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className="arvr-signup">
      {/* LEFT PANEL – Branding & Navigation (original content preserved) */}
      <div className="arvr-signup__left">
        <div className="arvr-left-content">
          <h1 className="arvr-welcome-heading">Welcome</h1>
          <Link to="/login">
            <button className="arvr-nav-button">Sign in</button>
          </Link>

          <h1 className="arvr-secondary-heading">Login as Admin ?</h1>
          <Link to="/admin-login">
            <button className="arvr-nav-button">Admin Login</button>
          </Link>

          <h1 className="arvr-secondary-heading">Forget Password ?</h1>
          <Link to="/forget-password">
            <button className="arvr-nav-button">Reset Password</button>
          </Link>
        </div>
        <div className="arvr-left-overlay"></div>
      </div>

      {/* RIGHT PANEL – Signup Form */}
      <div className="arvr-signup__right">
        <form onSubmit={handleSubmit} className="arvr-form">
          <h2 className="arvr-form-title">Create Account</h2>

          <input
            type="text"
            placeholder="First Name"
            name="firstName"
            onChange={handleChange}
            value={data.firstName}
            required
            className="arvr-input"
          />
          <input
            type="text"
            placeholder="Last Name"
            name="lastName"
            onChange={handleChange}
            value={data.lastName}
            required
            className="arvr-input"
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
            value={data.email}
            required
            className="arvr-input"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            value={data.password}
            required
            className="arvr-input"
          />

          {error && <div className="arvr-error">{error}</div>}

          <button type="submit" className="arvr-button arvr-button--primary">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;