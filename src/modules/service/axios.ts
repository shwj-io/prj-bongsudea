import axios, {
  AxiosRequestHeaders,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

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
    const local = localStorage.getItem('user-storage');
    const { accessToken } = JSON.parse(local).state;

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

// TODO 제대로 동작하는지 확인 필요
// axiosInstance.interceptors.response.use(
//   async (response: AxiosResponse) => {
//     return response;
//   },
//   async error => {
//     if (error.response?.status === 401) {
//       const accessToken = await receivesToken();

//       error.config.headers = {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${accessToken}`,
//       };
//       console.log('리스폰스>>>>>>>>>>>', accessToken);

//       const response = await axios.request(error.config);
//       return response;
//     }
//     console.log(' axios 리스폰스>>>>>>>>>>>');

//     return Promise.reject(error);
//   }
// );

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
