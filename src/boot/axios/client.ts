import { auth } from "@/apis";
import appConfig from "@/constants/appConfig";
import { clearCacheData } from "@/helpers";
import { useTokenStore } from "@/stores";
import initAxios from "axios";

type Meta = {
  id: string;
};
declare module "axios" {
  export interface AxiosRequestConfig {
    meta?: Partial<Meta>;
  }
}

const axios = initAxios.create({
  baseURL: `${appConfig.baseUrl}/api`,
});

axios.interceptors.request.use(
  (request) => {
    request.meta ||= {};
    request.meta.id ??= `${request.method}-${request.url}`;
    const accessToken = useTokenStore.getState().accessToken;
    if (accessToken) {
      request.headers.set("Authorization", `Bearer ${accessToken}`);
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  },
);
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error?.response?.status;
    if (status === 401) {
      const token = await auth.refreshToken();
      if (token) {
        error.config.headers.set(
          "Authorization",
          `Bearer ${token.accessToken}`,
        );
        return axios.request(error.config);
      }
      clearCacheData();
      return Promise.reject(error);
    }
    return Promise.reject(error);
  },
);

export default axios;
