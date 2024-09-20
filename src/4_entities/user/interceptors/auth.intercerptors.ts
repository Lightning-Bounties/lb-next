import { AxiosError, AxiosInstance } from "axios";
import { userApi } from "../api/user.api";
import {
  ApiError,
  HTTPExceptionDetailSchema,
  HTTPValidationError,
} from "@/5_shared/gen";

const setAuthInterceptor = (axiosInstace: AxiosInstance) => {
  axiosInstace.interceptors.request.use((config) => {
    config.headers.Authorization = userApi.getAuthToken();
    return config;
  });

  //  TODO: move this interceptors to another layer
  axiosInstace.interceptors.response.use(
    (config) => {
      return config;
    },
    (config) => {
      const axiosError = config as AxiosError;
      if (axiosError.code === "422") {
        return {
          statusText: (axiosError?.response?.data as HTTPValidationError)
            ?.detail?.[0].msg,
        } as ApiError;
      } else {
        return {
          statusText: (axiosError?.response?.data as any)?.detail?.message,
        } as ApiError;
      }
    }
  );
};

export { setAuthInterceptor };
