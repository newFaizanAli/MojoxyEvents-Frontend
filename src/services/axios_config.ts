import axios from "axios";
import { useAuthStore } from "../store";
import { PROJECT_URL } from "../config";
import { toastError } from "../utilities";

const instance = axios.create({
  baseURL: PROJECT_URL,
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("mjx_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

instance.interceptors.response.use(
  // (response) => response,

  (response) => {
    // ✅ Handle backend "logical" errors
    if (response.data?.success === false) {
      const message = response.data?.message || "Something went wrong";

      // Auto alert (or toast)
      toastError(message);

      // Convert to rejected promise
      return Promise.reject({
        response,
        message,
      });
    }

    return response;
  },

  (error) => {
    if (error.response?.status === 401) {
      const logout = useAuthStore.getState().logout;
      logout();
    }
    return Promise.reject(error);
  },
);

export default instance;
