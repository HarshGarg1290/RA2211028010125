import axios from "axios";

// Get API URL and auth token from environment variables
const API_URL = process.env.REACT_APP_API_URL ;
const AUTH_TOKEN = process.env.REACT_APP_AUTH_TOKEN;

// Create an axios instance with default configuration
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


apiClient.interceptors.request.use(
  (config) => {
    if (AUTH_TOKEN) {
      config.headers.Authorization = `Bearer ${AUTH_TOKEN}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// API functions using the configured client
export const fetchTopUsers = async () => {
  const response = await apiClient.get("/users");
  return response.data;
};

export const fetchTrendingPosts = async () => {
  const response = await apiClient.get("/posts?type=popular");
  return response.data;
};

export const fetchLatestPosts = async () => {
  const response = await apiClient.get("/posts?type=latest");
  return response.data;
};
