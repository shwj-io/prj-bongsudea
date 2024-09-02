import { axiosReq } from './axios';

export const getAdministrative = (city?: string) => {
  return axiosReq.GET(`/administrative?city=${city}`);
};

export const signUp = (email: string, password: string) => {
  return axiosReq.POST(`/auth/signup`, { email, password });
};

export const logout = () => {
  return axiosReq.GET(`/auth/logout`);
};

export const loginEmail = (email: string, password: string) => {
  return axiosReq.POST(`/auth/login/email`, { email, password });
};

export const loginGoogle = () => {
  return axiosReq.GET(`/auth/login/google`);
};

export const loginGithub = () => {
  return axiosReq.GET(`/auth/login/github`);
};

export const resetPassword = (email: string) => {
  return axiosReq.POST(`/auth/reset`, { email });
};

export const updatePassword = (password: string) => {
  return axiosReq.POST(`/auth/update`, { password });
};
