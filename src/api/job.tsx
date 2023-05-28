import axios, { AxiosRequestConfig } from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_SERVER,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
} as AxiosRequestConfig);

instance.defaults.withCredentials = true;

export const createJob = async (jobData: any) => {
  return await instance.post("/api/job/create", jobData);
};

export const updateJob = async (jobData: any, id: string | undefined) => {
  return await instance.patch(`/api/job/update/${id}`, jobData);
};

export const deleteJob = async (id: string | undefined) => {
  return await instance.delete(`/api/job/${id}`);
};
