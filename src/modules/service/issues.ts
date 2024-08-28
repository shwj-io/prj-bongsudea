import { axiosReq } from './axios';

export const getIssues = (page: number, pageSize: number) => {
  return axiosReq.GET(`/issues?page=${page}&pageSize=${pageSize}`);
};

export const getMyAroundIssues = (
  longitude: number,
  latitude: number,
  distance: number
) => {
  return axiosReq.GET(
    `/issues?longtitude=${longitude}&latitude=${latitude}&distance=${distance}`
  );
};
