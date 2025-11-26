import React, { useState } from 'react';
import './ResetForget.css';
import { Link, useNavigate,useLocation, } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { resetPassword} from '../../Api/AuthApi';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { state } = useLocation();
//   console.log(state);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    try {
        const resetToken = state.token;
        const newPassword = formData.password;
        // console.log({resetToken,newPassword});
        const response = await resetPassword({ resetToken, newPassword });
        console.log(response.data);
        toast.success(response.data.message);
        setIsLoading(false);
        setIsSubmitted(true);
        navigate('/signin');
        
    } catch (error) {
        // // console.log(error);
        setIsLoading(false);
        toast.error(error.response);
    }
  };

  const passwordStrength = (password) => {
    if (password.length === 0) return { strength: 0, label: '' };
    if (password.length < 6) return { strength: 1, label: 'Weak' };
    if (password.length < 8) return { strength: 2, label: 'Medium' };
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])/.test(password)) 
      return { strength: 3, label: 'Good' };
    return { strength: 4, label: 'Strong' };
  };

  const strength = passwordStrength(formData.password);

  return (
    <div className="reset-auth-container">
      <div className="reset-auth-card">
        <div className="reset-auth-header">
          <h1>Reset Password</h1>
          <p>Create a new password for your account</p>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="reset-auth-form">
            <div className="reset-form-group">
              <label htmlFor="password">New Password</label>
              <div className="reset-password-input-container">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter new password"
                  required
                />
                <button 
                  type="button" 
                  className="reset-toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
              
              {formData.password && (
                <div className="reset-password-strength">
                  <div className="reset-strength-bars">
                    {[1, 2, 3, 4].map(i => (
                      <div 
                        key={i} 
                        className={`strength-bar ${i <= strength.strength ? `strength-${strength.strength}` : ''}`}
                      ></div>
                    ))}
                  </div>
                  <span className="strength-label">{strength.label}</span>
                </div>
              )}
            </div>

            <div className="reset-form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
              />
              {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <p className="reset-error-text">Passwords don't match</p>
              )}
            </div>

            <div className="reset-password-requirements">
              <p>Password must include:</p>
              <ul>
                <li className={formData.password.length >= 8 ? 'met' : ''}>At least 8 characters</li>
                <li className={/(?=.*[a-z])/.test(formData.password) ? 'met' : ''}>One lowercase letter</li>
                <li className={/(?=.*[A-Z])/.test(formData.password) ? 'met' : ''}>One uppercase letter</li>
                <li className={/(?=.*[0-9])/.test(formData.password) ? 'met' : ''}>One number</li>
                <li className={/(?=.*[^A-Za-z0-9])/.test(formData.password) ? 'met' : ''}>One special character</li>
              </ul>
            </div>

            <button 
              type="submit" 
              className="reset-auth-button"
              disabled={isLoading || formData.password !== formData.confirmPassword}
            >
              {isLoading ? (
                <div className="reset-button-spinner"></div>
              ) : (
                'Reset Password'
              )}
            </button>
          </form>
        ) : (
          <div className="reset-success-message">
            <div className="reset-success-icon">✓</div>
            <h3>Password Reset Successful</h3>
            <p>Your password has been successfully reset.</p>
            <a href="/login" className="reset-auth-button">
              Back to Login
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;