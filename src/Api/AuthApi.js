import axios from "axios";
const BasseUrl = import.meta.env.VITE_BASE_URL

export const requestOtp = async (data) => {
    const response = await axios.post(`${BasseUrl}/auth/request-otp`, data);
    return response.data
};

export const registerUser = async (data) => {
     const response = await axios.post(`${BasseUrl}/auth/register`, data);
     return response
};

export const loginUser = async (data) => {
    console.log(data);
    
    const response = await axios.post(`${BasseUrl}/auth/login`, data);
    return response.data
};

export const ForgetPasswordRequestOtp = async (data) => {
    const response = await axios.post(`${BasseUrl}/auth/password/request-otp`, data);
    return response
};

export const verifyForgetOtp = async (data) => {
    const response = await axios.post(`${BasseUrl}/auth/password/verify-otp`, data);
    return response
};

export const resetPassword = async (data) => {
    const response = await axios.post(`${BasseUrl}/auth/resetpassword`, data);
    return response
};

