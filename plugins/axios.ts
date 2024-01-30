import {
  getAccessToken,
  logout,
  setAccessToken,
  refreshToken,
} from "@/auth/jwtService";
import router from "@/router";
import axios from "axios";

import { refreshEndpoint } from "@/auth/jwt.config";

import { toast } from "vue3-toastify";
import i18n from "./i18n";

const axiosIns = axios.create({
  baseURL: import.meta.env.VITE_BACKEND,
  timeout: 20000,

  headers: { Accept: "application/json" },
});

// variables and functions
let isAlreadyFetchingAccessToken = false;
let subscribers: Function[] = [];

const onAccessTokenFetched = (accessToken) => {
  subscribers = subscribers.filter((callback: Function) =>
    callback(accessToken)
  );
};

const addSubscriber = (callback: Function) => {
  subscribers.push(callback);
};

//send token
axiosIns.interceptors.request.use(
  (config) => {
    let token = getAccessToken();
    if (token && config.headers && !config.headers.no_add_token) {
      config.headers.Authorization = "Bearer " + token;
    }
    if (config.headers && config.headers.no_add_token) {
      delete config.headers.no_add_token;
    }
    if (config.headers) {
      config.headers.language = i18n.global.locale.value;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//404 or 401 pages use this response
axiosIns.interceptors.response.use(
  (response) => {
    if (response.data && response.data.message) {
      setTimeout(() => {
        toast.success(response.data.message);
      }, 200);
    }
    return response;
  },
  async (error) => {
    const { config: originalRequest } = error;
    if (
      error.response &&
      error.response.status === 401 &&
      router.currentRoute.value.meta.layout !== "LoginLayout"
    ) {
      // sendErrorLog(error);
      const retryOriginalRequest = new Promise((resolve) => {
        addSubscriber((access) => {
          let token = getAccessToken();
          if (access) {
            originalRequest.headers.Authorization = `Bearer ${token}`;
          }
          resolve(axiosIns(originalRequest));
        });
      });
      if (!isAlreadyFetchingAccessToken) {
        isAlreadyFetchingAccessToken = true;
        try {
          const { data } = await refreshToken();
          isAlreadyFetchingAccessToken = false;
          setAccessToken(data.access);
          onAccessTokenFetched(data.access);
        } catch (error: any) {
          console.error(error);
        }
      } else if (
        isAlreadyFetchingAccessToken &&
        error.config.url === refreshEndpoint
      ) {
        logout();
      }
      return retryOriginalRequest;
    } else {
      if (
        error.response &&
        typeof error.response.data === "object" &&
        error.response.data !== null
      ) {
        const data = error.response.data;
        toast.error(data.message);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosIns;
