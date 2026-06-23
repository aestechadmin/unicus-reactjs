import axios from "axios";
import toastService from "../utils/toastService";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:1339/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ================= ERROR HANDLER =================
const handleError = (error) => {
  if (error.response) {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error?.message ||
      "Server Error";
    toastService.error(message);
  } else if (error.request) {
    toastService.error("No response from server");
  } else {
    toastService.error("Something went wrong");
  }

  return Promise.reject(error);
};

// ================= GET =================
export const get = async (url, params = {}, requiresAuth = false) => {
  try {
    const res = await api.get(url, {
      params,
      requiresAuth, // pass flag to interceptor
    });
    return res.data;
  } catch (error) {
    return handleError(error);
  }
};

// ================= POST =================
export const post = async (url, data = {}, requiresAuth = false) => {
  try {
    const res = await api.post(url, data, {
      requiresAuth,
    });
    return res.data;
  } catch (error) {
    return handleError(error);
  }
};

// ================= PUT =================
export const put = async (url, data = {}, requiresAuth = false) => {
  try {
    const res = await api.put(url, data, {
      requiresAuth,
    });
    return res.data;
  } catch (error) {
    return handleError(error);
  }
};

// ================= DELETE =================
export const remove = async (url, requiresAuth = false) => {
  try {
    const res = await api.delete(url, {
      requiresAuth,
    });
    return res.data;
  } catch (error) {
    return handleError(error);
  }
};

export default api;