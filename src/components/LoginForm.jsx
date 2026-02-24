import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Login.css";

const LoginForm = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "https://spectovbackend.onrender.com/api/auth";
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("token", res.data);
      localStorage.setItem("email", data.email);

      window.location = "/page";
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
    <div className="arvr-login">
      {/* LEFT PANEL – Navigation (original content preserved) */}
      <div className="arvr-login__left">
        <div className="arvr-left-content">
          <h1 className="arvr-welcome-heading">Welcome Back</h1>

          <h2 className="arvr-secondary-heading">New Here ?</h2>
          <Link to="/signup">
            <button className="arvr-nav-button">Sign Up</button>
          </Link>

          <h2 className="arvr-secondary-heading">Login as Admin ?</h2>
          <a href="https://super-admin-tau.vercel.app/">
            <button className="arvr-nav-button">Admin Login</button>
          </a>

          <h2 className="arvr-secondary-heading">Forget Password ?</h2>
          <Link to="/forget-password">
            <button className="arvr-nav-button">Reset Password</button>
          </Link>
        </div>
        <div className="arvr-left-overlay"></div>
      </div>

      {/* RIGHT PANEL – Login Form */}
      <div className="arvr-login__right">
        <form onSubmit={handleSubmit} className="arvr-form">
          <h2 className="arvr-form-title">Login to Your Account</h2>

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
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;