// src/lib/api.js
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// ✅ Public API (no credentials, no token)
export const publicApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true",
  },
  withCredentials: false,
});

// ✅ Admin API (credentials allowed; token will be attached dynamically)
export const adminApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true",
  },
  withCredentials: true, // ✅ admin only
});

// token memory (dynamic)
let adminToken = null;

export const setAdminToken = (token) => {
  adminToken = token || null;
};

// attach token ONLY for adminApi
adminApi.interceptors.request.use((config) => {
  if (adminToken) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${adminToken}`;
  } else if (config.headers?.Authorization) {
    delete config.headers.Authorization;
  }
  return config;
});