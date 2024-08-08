import { axiosReq } from './axios';

export const getIssues = (page: number, pageSize: number) => {
  return axiosReq.GET(`/issues?page=${page}&pageSize=${pageSize}`);
};
