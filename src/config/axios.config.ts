import axios from "axios";

const axiosInstance = axios.create({
    // baseURL: 'https://some-domain.com/api/',
    baseURL: 'https://dummyjson.com/',
    timeout: 1000
});

export default axiosInstance;

// user/login