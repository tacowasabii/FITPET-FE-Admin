import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/navigation";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

const tokenInstance = axios.create({
  baseURL,
  headers: {
    Accept: "*/*",
    "Content-Type": "application/json",
  },
});

function handleTokenExpiration() {
  const router = useRouter();
  const toast = useToast();

  toast({
    title: "로그인이 만료되었습니다.",
    status: "error",
    isClosable: true,
  });

  router.push("/");
}

tokenInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      if (config.headers) {
        config.headers.set("Authorization", `Bearer ${accessToken}`);
      }
    } else {
      handleTokenExpiration();
    }

    return config;
  },
  (error) => Promise.reject(error),
);

export default tokenInstance;
