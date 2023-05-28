import axios, { AxiosRequestConfig } from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_SERVER,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
} as AxiosRequestConfig);

instance.defaults.withCredentials = true;

export const onRegistration = async (registrationData: any) => {
  return await instance.post("/api/register", registrationData);
};

export const onLogin = async (loginData: any) => {
  return await instance.post("/api/login", loginData);
};

export const onLogout = async () => {
  return await instance.get("/api/logout");
};
