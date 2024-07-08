/* eslint-disable no-useless-catch */
import { useEffect } from "react";
import axios from "axios";
import { api } from "../api";
import { useAuth } from "./useAuth";

const useAxios = () => {
  // const { auth, setAuth } = useAuth();
  const { setAuth } = useAuth();
  const auth = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const requestIntercept = api.interceptors.request.use(
      (config) => {
        const authToken = auth?.jwtToken;
        if (authToken) {
          config.headers.Authorization = `Bearer ${authToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error?.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const refreshToken = auth?.refreshToken;
            const response = await axios.post(
              `${import.meta.env.VITE_SERVER_BASE_URL}/auth/refresh-token`,
              { refreshToken }
            );
            const { token } = response.data;

            console.log(`New Token: ${token}`);
            setAuth({ ...auth, authToken: token });
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axios(originalRequest);
          } catch (error) {
            throw error;
          }
        }

        return Promise.reject(error);
      }
    );
    return () => {
      api.interceptors.request.eject(requestIntercept);
      api.interceptors.response.eject(responseIntercept);
    };
  }, [auth?.authToken]);

  return { api };
};

export default useAxios;
