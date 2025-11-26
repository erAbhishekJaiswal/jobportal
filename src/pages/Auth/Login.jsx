import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaFacebookF,
  FaGoogle,
  FaTwitter,
} from "react-icons/fa";
// import { loginUser } from "../../Api/AuthApi";
import { toast } from "react-hot-toast";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";
const BasseUrl = import.meta.env.VITE_BASE_URL

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const togglePassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [id]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
        setLoading(true);
    const resdata = await axios.post(`${BasseUrl}/auth/login`, formData) // loginUser(formData);
    // alert("Login successful!");
    // console.log(res);
    const res = resdata.data;
    toast.success("Login successful!");
    if (res.role==="admin") {
      setLoading(false);
      // localStorage.setItem("role", res.role);
      navigate("/admin/dashboard");
    }else if (res.role==="student") {
      setLoading(false);
      // localStorage.setItem("role", res.role);
      navigate("/student/dashboard");
    }
    sessionStorage.setItem("token", res.token);
    sessionStorage.setItem("role", res.role);
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="back-to-home">
        <a href="https://elearning.kumarinfotech.net/" className="back-to-home-btn"> <FaArrowLeft /> Back to Home</a>
        </div>
    <div className="login-container">
      
      <div className="login-header">
        
        <h1>Welcome Back</h1>
        <p>Sign in to your account</p>
      </div>
      {loading && <p>Loading...</p>}

      {!loading && <form className="login-form" onSubmit={handleSubmit}>
        {/* Email Field */}
        <div className="login-page-form-group">
          <label className="login-page-form-label" htmlFor="email">
            Email Address
          </label>
          <FaEnvelope className="login-page-input-icon" />
          <input
            type="email"
            id="email"
            className="login-page-input-field"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Password Field */}
        <div className="login-page-form-group">
          <label className="login-page-form-label" htmlFor="password">
            Password
          </label>
          <FaLock className="login-page-input-icon" />
          <input
            type={passwordVisible ? "text" : "password"}
            id="password"
            className="login-page-input-field"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {passwordVisible ? (
            <FaEyeSlash className="login-page-password-toggle" onClick={togglePassword} />
          ) : (
            <FaEye className="login-page-password-toggle" onClick={togglePassword} />
          )}
        </div>

        {/* Remember Me + Forgot Password */}
        <div className="login-page-remember-forgot">
          <div className="login-page-remember-me">
            <input
              type="checkbox"
              id="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
            />
            <label htmlFor="rememberMe">Remember me</label>
          </div>
          <Link to="/forgot-password" className="login-page-forgot-password">
            Forgot Password?
          </Link>
        </div>

        {/* Submit Button */}
        <button type="submit" className="login-page-login-button">
          Sign In
        </button>

        {/* Divider */}
        <div className="login-page-divider">
          <span>Or continue with</span>
        </div>

        {/* Social Buttons */}
        <div className="login-page-social-login">
          <button type="button" className="login-page-social-btn facebook-btn">
            <FaFacebookF />
          </button>
          <button type="button" className="login-page-social-btn google-btn">
            <FaGoogle />
          </button>
          <button type="button" className="login-page-social-btn twitter-btn">
            <FaTwitter />
          </button>
        </div>

        {/* Register Link */}
        <div className="login-page-register-link">
          Don’t have an account? <Link className="login-page-register-link-a" to="/signup">Create Account</Link>
        </div>
      </form>}
    </div>
    </div>
  );
};

export default Login;
