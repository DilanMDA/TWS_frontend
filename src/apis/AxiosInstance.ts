import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL
});

export const setAuthHeader = (authToken: string | undefined) => {
    if (authToken) {
        axiosInstance.defaults.headers.common.Authorization = `Bearer ${authToken}`;
    }
};

export const removeAuthHeader = () => {
    axiosInstance.defaults.headers.common.Authorization = '';
};

export default axiosInstance;