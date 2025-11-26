import React, { useState } from "react";
import "./Register.css";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, Links, useNavigate } from "react-router-dom";
import { requestOtp } from "../../Api/AuthApi";
import { toast } from "react-hot-toast";

const Register = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const togglePassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await requestOtp(formData);
      console.log(response);
      // toast.success("Registration successful!");
      navigate("/email-verify", { state: formData });
      // navigate("/signin");
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    }
    setFormData({ fullName: "", email: "", password: "" });
  };

  return (
    <div className="register-page">
    <div className="register-container">
      <div className="register-header">
        <h1>Create Account</h1>
        <p>Join our community today</p>
      </div>

      <form className="register-form" onSubmit={handleSubmit}>
        <div className="register-page-form-group">
          <label className="register-page-form-label" htmlFor="fullName">
            Full Name
          </label>
          <FaUser className="register-page-input-icon" />
          <input
            type="text"
            id="name"
            className="register-page-input-field"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="register-page-form-group">
          <label className="register-page-form-label" htmlFor="email">
            Email Address
          </label>
          <FaEnvelope className="register-page-input-icon" />
          <input
            type="email"
            id="email"
            className="register-page-input-field"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="register-page-form-group">
          <label className="register-page-form-label" htmlFor="password">
            Password
          </label>
          <FaLock className="register-page-input-icon" />
          <input
            type={passwordVisible ? "text" : "password"}
            id="password"
            className="register-page-input-field"
            placeholder="Create a strong password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {passwordVisible ? (
            <FaEyeSlash className="register-page-password-toggle" onClick={togglePassword} />
          ) : (
            <FaEye className="register-page-password-toggle" onClick={togglePassword} />
          )}
        </div>

        <button type="submit" className="register-page-submit-button">
          Create Account
        </button>

        <div className="register-page-login-link">
          Already have an account? <Link to="/signin">Sign In</Link>
        </div>
      </form>
    </div>
  </div>
  );
};

export default Register;