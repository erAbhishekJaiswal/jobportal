import axios from "axios";
const BasseUrl = import.meta.env.VITE_BASE_URL


// 
export const getLandingPage = async () => {
    const response = await axios.get(`${BasseUrl}/ads/landingpage`);
    return response.data
}


// ✅ Fetch Jobs from Backend API
export const getJobs = async () => {
    const response = await axios.get(`${BasseUrl}/jobs/`);
    return response.data
};

export const getAds = async () => {
    const response = await axios.get(`${BasseUrl}/ads/landingpage`);
    return response.data
};

// ✅ Fetch Jobs from Backend API
export const getJobById = async (id) => {
    const response = await axios.get(`${BasseUrl}/jobs/${id}`);
    return response.data
};

// ✅ Fetch Jobs from Backend API
export const getAdById = async (id) => {
    const response = await axios.get(`${BasseUrl}/ads/${id}`);
    return response.data
};

