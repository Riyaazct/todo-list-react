import axios from "axios";

import TokenService from "./token.service";

const isDevelopment = process.env.NODE_ENV === "development";

const instance = axios.create({
  baseURL: isDevelopment
    ? "http://localhost:3100/api"
    : "https://long-ruby-dhole-hat.cyclic.app/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// adding a request interceptor to the axios instance
instance.interceptors.request.use(
  (config) => {
    const token = TokenService.getLocalAccessToken();

    if (token) {
      config.headers["x-access-token"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Request interceptor to handle responses and errors
instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    console.log({ originalConfig });

    if (originalConfig.url !== "/auth/signin" && err.response) {
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          const rs = await instance.post("/auth/refreshtoken", {
            refreshToken: TokenService.getLocalRefreshToken(),
          });

          const { accessToken } = rs.data;

          TokenService.updateLocalAccessToken(accessToken);

          return instance(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }

    return Promise.reject(err);
  }
);

export default instance;
