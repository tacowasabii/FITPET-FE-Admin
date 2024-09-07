import { AxiosResponse } from "axios";
import axiosInstance from "./axiosInstance";

export interface LoginData {
  id: string;
  password: string;
}

export interface LoginResponse {
  result: string;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
  };
  statusCode: number;
}

const login = async (
  loginData: LoginData,
): Promise<AxiosResponse<LoginResponse>> => {
  const response = await axiosInstance({
    url: "/sign-in",
    method: "post",
    data: loginData,
  });
  return response;
};

// const getTokens = async (refreshToken: string) => {
//   const response = await tokenInstance({
//     url: '/auth/tokens',
//     method: 'post',
//     headers: {
//       Authorization: `Bearer ${refreshToken}`,
//     },
//   });
//   return response;
// };

export default { login };
