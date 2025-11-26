import React, { useState } from "react";
import "./ResetForget.css";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { ForgetPasswordRequestOtp } from "../../Api/AuthApi";
const ForgetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    try {
      // const response = await axios.post(
      //   `http://localhost:5000/api/v1/auth/password/request-otp`,
      //   { email }
      // );
      const response = await ForgetPasswordRequestOtp({ email });
      // // console.log(response.data);
      setTimeout(() => {
        setIsLoading(false);
        setIsSubmitted(true);
        setEmail("");
        toast.success(response.data.message);
        navigate("/otp-forget-verification" , { state: {email} });
      }, 1000);
    } catch (error) {
      // // console.log(error);
      setIsLoading(false);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="reset-auth-container">
      <div className="reset-auth-card">
        <div className="reset-auth-header">
          <h1>Forgot Password</h1>
          <p>Enter your email to reset your password</p>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="reset-auth-form">
            <div className="reset-form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>

            <button
              type="submit"
              className="reset-auth-button"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="reset-button-spinner"></div>
              ) : (
                "Send Reset Link"
              )}
            </button>
          </form>
        ) : (
          <div className="reset-success-message">
            <div className="reset-success-icon">✓</div>
            <h3>Check Your Email</h3>
            <p>We've sent a password reset link to {email}</p>
            <button
              className="reset-auth-button secondary"
              onClick={() => setIsSubmitted(false)}
            >
              Resend Email
            </button>
          </div>
        )}

        <div className="reset-auth-footer">
          <p>
            Remember your password? <a href="/signin">Back to Sign In</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
