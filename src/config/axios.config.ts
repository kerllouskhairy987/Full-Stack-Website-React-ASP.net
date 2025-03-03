import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://some-domain.com/api/',
    timeout: 1000
});

export default axiosInstance;