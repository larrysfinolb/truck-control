import { authStorage } from "@/modules/auth/utils/authStorage";
import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = authStorage.getToken();

    if (config.headers && token) {
      config.headers.setAuthorization(`Bearer ${token}`);
    }

    console.log("Request Config:", config);

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
