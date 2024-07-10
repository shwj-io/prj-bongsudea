import { useUserStore } from '@/store/user';
import axios, {
  AxiosRequestHeaders,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import Cookies from 'js-cookie';

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_REACT_APP_SERVER_URI,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (request: InternalAxiosRequestConfig) => {
    request.headers = request.headers || ({} as AxiosRequestHeaders);
    const accessToken = Cookies.get('access_token');

    if (accessToken !== null) {
      request.headers['Authorization'] = `${accessToken}`;
    }

    request = { ...request, withCredentials: true };
    return request;
  },
  error => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response: AxiosResponse) {
    return response;
  },
  async error => {
    if (error.response?.status === 401) {
      useUserStore.getState().removeUser();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const axiosReq = {
  async GET(path: string) {
    const { data } = await axiosInstance(path);
    return data;
  },

  async POST<T>(path: string, body: T) {
    const { data } = await axiosInstance.post(path, body);
    return data;
  },

  async PUT<T>(path: string, body: T) {
    const { data } = await axiosInstance.put(path, body);
    return data;
  },

  async PATCH<T>(path: string, body: T) {
    await axiosInstance.patch(path, body);
  },

  async DELETE(path: string) {
    await axiosInstance.delete(path);
  },
};
