import React, { useState, useEffect, useRef } from 'react';
import './OtpVerification.css';
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast';
// import axios from 'axios';
import {verifyForgetOtp} from '../../Api/AuthApi';
// import Spinner from './Spinner';

const OtpForgetVerification = () => {
    const onResend = () => {};
    const isLoading = false;

      const { state } = useLocation();
    //  // console.log(state);// get data from Register page
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(300);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const inputRefs = useRef([]);
  

  useEffect(() => {
    // Start the countdown timer
    if (timer > 0 && isResendDisabled) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else if (timer === 0) {
      setIsResendDisabled(false);
    }
  }, [timer, isResendDisabled]);

  const handleChange = (index, value) => {
    // Allow only digits
    if (!/^\d*$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Auto-focus to next input
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
    
    // If all fields are filled, trigger verification
    if (newOtp.every(digit => digit !== '') && index === 5) {
      handleSubmit(newOtp.join(''));
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace to move to previous input
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    
    if (/^\d{6}$/.test(pastedData)) {
      const pastedOtp = pastedData.split('');
      setOtp(pastedOtp);
      
      // Focus on the last input
      inputRefs.current[5].focus();
      
      // Trigger verification
      handleSubmit(pastedData);
    }
  };

  const handleSubmit = async (otpValue) => {

    try {
          if (otpValue.length === 6) {
      // onVerify(otpValue);
      // // console.log({state, otpValue});
      // const formdata = {...state, otpValue};
    //   const res = await registerUser({...state, otpValue});
    const uemail = typeof state.email === 'string' ? state.email : state.email?.email;
    // // console.log(useremail);
    
    // const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/password/verify-otp`, { email: uemail, otp: otpValue});
      // // console.log(res.data);
      const res = await verifyForgetOtp({ email: uemail, otp: otpValue});
      console.log(res);
      const resetToken = res.data.resetToken;
      

      // // console.log(resetToken, useremail);

      if(res.status === 200){
        toast.success('OTP verified successfully');
        navigate('/reset-password' , { state: { token: resetToken } });
      } else {
      toast.error('Invalid OTP');
      navigate('/login');}
    }
    // else {
    //   toast.error('Invalid OTP');
    // }
    } catch (error) {
     console.error(error);
      toast.error('Invalid OTP');
      navigate('/login');
    }
  };

  const handleResend = () => {
    setIsResendDisabled(true);
    setTimer(60);
    setOtp(['', '', '', '', '', '']);
    inputRefs.current[0].focus();
    onResend();
  };

//   const maskEmail = (email) => {
//     const [localPart, domain] = email.split('@');
//     const maskedLocal = localPart.length > 2 
//       ? localPart.substring(0, 2) + '*'.repeat(localPart.length - 2) 
//       : '*'.repeat(localPart.length);
//     return `${maskedLocal}@${domain}`;
//   };

const maskEmail = (email) => {
  if (!email || !email.includes('@')) return '********@***.com';
  const [localPart, domain] = email.split('@');
  const maskedLocal = localPart.length > 2 
    ? localPart.substring(0, 2) + '*'.repeat(localPart.length - 2) 
    : '*'.repeat(localPart.length);
  return `${maskedLocal}@${domain}`;
};

  return (
    <div className="otp-verification-container">
      <div className="otp-card">
        <div className="otp-header">
          <div className="otp-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
              <path d="M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M12 8L12 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <h2>Verify Your Email</h2>
          <p>We've sent a verification code to</p>
          <p className="email-display">{maskEmail(state?.email)}</p>
        </div>

        <div className="otp-input-container">
          <p className="instruction">Enter the 6-digit code</p>
          <div className="otp-inputs">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
                ref={(el) => (inputRefs.current[index] = el)}
                className="otp-input"
                disabled={isLoading}
              />
            ))}
          </div>
        </div>

        <div className="otp-actions">
          <button
            className={`verify-btn ${isLoading ? 'loading' : ''}`}
            onClick={() => handleSubmit(otp.join(''))}
            disabled={otp.some(digit => digit === '') || isLoading}
          >
            {isLoading ? (
              <>
                {/* <Spinner size='xl' /> */}
                <span>Loading...</span>
              </>
            ) : (
              'Verify'
            )}
          </button>
        </div>

        <div className="resend-section">
          <p>Didn't receive the code?</p>
          <button
            className={`resend-btn ${isResendDisabled ? 'disabled' : ''}`}
            onClick={handleResend}
            disabled={isResendDisabled || isLoading}
          >
            {isResendDisabled ? `Resend code in ${timer}s` : 'Resend code'}
          </button>
        </div>

        <div className="otp-footer">
          <p>Check your spam folder if you can't find the email</p>
        </div>
      </div>
    </div>
  );
};

export default OtpForgetVerification;