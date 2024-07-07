import { axiosReq } from './axios';

export const getAdministrative = (email: string, password: string) => {
  return axiosReq.GET(`/administrative`);
};

export const signUp = (email: string, password: string) => {
  return axiosReq.POST(`/auth/signup`, { email, password });
};

export const logout = () => {
  return axiosReq.GET(`/auth/signup`);
};

export const loginEmail = (email: string, password: string) => {
  return axiosReq.POST(`/auth/logout`, { type: 'email', email, password });
};

export const loginGoogle = () => {
  return axiosReq.GET(`/auth/login/google`);
};

export const loginGithub = () => {
  return axiosReq.GET(`/auth/login/github`);
};
