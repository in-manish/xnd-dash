import apiClient from "../client";
import { API_ENDPOINTS } from "../endpoints";

export const getUser = () => {
  return apiClient.get(API_ENDPOINTS.GET_USER);
};
