import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

const options = {
  baseURL,
  withCredentials: true,
  timeout: 10000,
};

const axiosInstance = axios.create(options);

axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);

export default axiosInstance;
