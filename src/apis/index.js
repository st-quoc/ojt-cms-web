import axiosClient from '../config/axios';
import { API_ROOT } from '../constants';

export const handleLogoutAPI = () => {};

export const refreshTokenAPI = async refreshToken => {
  return await axiosClient.put(`${API_ROOT}/v1/users/refresh_token`, {
    refreshToken,
  });
};
