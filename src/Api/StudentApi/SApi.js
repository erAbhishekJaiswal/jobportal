import axios from "axios";
const BasseUrl = import.meta.env.VITE_BASE_URL
import {isUserLoggedIn} from "../../utils/localstorage"


export const getProfile = async (id) => {
    const response = await axios.get(`${BasseUrl}/student/profile/${id}`,{
        headers: { Authorization: `Bearer ${isUserLoggedIn()}` }
    });
    return response.data
};

//Working
export const GetMyTests = async () => {
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/test/attempt/tests`,{ 
        headers: { Authorization: `Bearer ${isUserLoggedIn()}` } 
    });
    return response.data
};

export const GetTestById = async (id) => {
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/test/attempt/${id}`,{
        headers: { Authorization: `Bearer ${isUserLoggedIn()}` }
    });
    return response.data
};

