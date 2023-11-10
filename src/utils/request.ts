import axios, { AxiosRequestConfig, AxiosInstance } from "axios";
import { ElMessage } from "element-plus";
import { removeToken } from "./index";
import { API_URL } from "@/constant";

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    Accept: "application/json; charset=utf-8",
  },
});

setupInterceptors(axiosInstance);

export default axiosInstance;

function setupInterceptors(axiosInstance: AxiosInstance) {
  axiosInstance.interceptors.request.use(
    (config) => {
      if (!config?.headers) {
        throw new Error(
          "Expected 'config' and 'config.headers' not to be undefined"
        );
      }
      if (!config?.url?.includes("/login")) {
        // 从 localstorage 里面获取 token
        config.headers.Authorization = `Bearer `;
      }
      return config;
    },
    (error) => {
      // 对请求错误做些什么
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      return response.data;
    },
    (error) => {
      const status = error.status || error.response?.status || 0;
      if (status === 401 || status === 403) {
        ElMessage.error("Please login");
        setTimeout(() => {
          removeToken();
          window.location.replace("/login");
        }, 1000);
        return;
      }
      let errData = error.response?.data || {
        message: error.message,
        errors: {},
      };
      errData = { ...errData, status };
      return Promise.reject(errData);
    }
  );
}
