import axios from "axios";
import { ENV } from "./env";

export const axiosInstance = axios.create({
  baseURL: ENV.NODE_ENV === "development" ? "http://localhost:4040/api/v1" : ENV.API_URL,
  withCredentials: true,
});
