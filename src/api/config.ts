import axios, { AxiosError, AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import PubSub from 'pubsub-js';

export const PREFIX_API = process.env.REACT_APP_PREFIX_API;
export const ENDPOINT_LOCAL = process.env.REACT_APP_ENDPOINT;

const axiosInstance = axios.create();
axiosInstance.defaults.baseURL = `${ENDPOINT_LOCAL}/${PREFIX_API}`;
axiosInstance.defaults.withCredentials = true;
axiosInstance.defaults.timeout = 20000;
axiosInstance.defaults.headers["Content-Type"] = "application/json";

axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  config.headers = config.headers || {};
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response && error.response.status === 401) {
      PubSub.publish("FORCE_LOGIN")
    }
    return Promise.reject(error);
  }
);

export const useAxios = () => {
  // const navigate = useNavigate();
  useEffect(() => {
    const token = PubSub.subscribe("FORCE_LOGIN", () => {
      // navigate("/dang-nhap")
      window.location.href = "/dang-nhap"
      Cookies.remove("token");
    });
    return () => {
      PubSub.unsubscribe(token);
    };
  }, []);

};

export const ApiConfig = async (
  url: string,
  data?: {
    payload?: any;
    params?: any;
  },
  _method = "POST",
  apiPrefix = PREFIX_API
) => {
  const method = _method.toLowerCase() as AxiosRequestConfig["method"];
  const config: AxiosRequestConfig = {
    url,
    method,
    data: data?.payload,
    params: data?.params,
  };
  if (apiPrefix !== PREFIX_API)
    config.baseURL = `${ENDPOINT_LOCAL}/${apiPrefix}`;
  return axiosInstance.request(config);
};

export const ApiUploadFile = async (url: string, file: string | Blob | any, fieldName = "file", setProgress?: React.Dispatch<React.SetStateAction<number>>, onProgress?: ((event: any) => void) | undefined) => {
  const formData = new FormData();
  if (typeof file === 'object' && file?.length) {
    for (let i = 0; i < file?.length; i++) {
      formData.append("file", file[i])
    };
  } else {
    formData.append("file", file, fieldName)
  }
  return axiosInstance.post(url, formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    },
    // onUploadProgress: (event: any) => {
    //     const percent = Math.floor((event.loaded / event.total) * 100);
    //     if (setProgress && onProgress) {
    //         setProgress(percent);
    //         // if (percent === 100) {
    //         //     setTimeout(() => setProgress(0), 1000);
    //         // }
    //         onProgress({ percent: (event.loaded / event.total) * 100 });
    //     }
    // }, 
  })
}
