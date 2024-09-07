import authAPI, { LoginData, LoginResponse } from "@app/api/authAPI";
import { useToast } from "@chakra-ui/react";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/navigation";

interface ErrorResponse {
  data: string;
  message: string;
  result: string;
  statusCode: number;
}

function usePostLogin(): UseMutationResult<
  AxiosResponse<LoginResponse>,
  AxiosError,
  LoginData
> {
  const toast = useToast();
  const router = useRouter();

  return useMutation<
    AxiosResponse<LoginResponse>,
    AxiosError<ErrorResponse>,
    LoginData
  >({
    mutationFn: (loginData: LoginData) => authAPI.login(loginData),
    onSuccess: (res: AxiosResponse<LoginResponse>) => {
      if (res.data && res.data.message && res.data.data) {
        localStorage.setItem("accessToken", res.data.data.accessToken);
        localStorage.setItem("refreshToken", res.data.data.refreshToken);
        router.push("/quote-inquiries");
        toast({
          title: res.data.message || "로그인 되었습니다.",
          status: "success",
          isClosable: true,
        });
      } else {
        toast({
          title: "올바르지 않은 응답 형식입니다.",
          status: "error",
          isClosable: true,
        });
      }
    },
    onError: (err: AxiosError<ErrorResponse>) => {
      toast({
        title: err.response?.data?.message || "서버 에러가 발생했습니다.",
        status: "error",
        isClosable: true,
      });
    },
  });
}

export default usePostLogin;
