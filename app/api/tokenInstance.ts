import { createStandaloneToast } from "@chakra-ui/react";
import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

const { toast } = createStandaloneToast();

const tokenInstance = axios.create({
  baseURL,
  headers: {
    Accept: "*/*",
    "Content-Type": "application/json",
  },
});

tokenInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      if (config.headers) {
        config.headers.set("Authorization", `Bearer ${accessToken}`);
      }
    }

    return config;
  },
  (error) => Promise.reject(error),
);

tokenInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      window.location.href = "/";
    } else {
      toast({
        title: "에러가 발생했습니다.",
        status: "error",
        isClosable: true,
      });
      return Promise.reject(error);
    }
    return Promise.reject();
  },
);

export default tokenInstance;
