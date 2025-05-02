import axios from "axios";

const axiosInstance = axios.create({
    // baseURL: 'https://some-domain.com/api/',
    baseURL: 'http://dvldweb.runasp.net/api/',
    timeout: 20000
});

export default axiosInstance;

// user/login