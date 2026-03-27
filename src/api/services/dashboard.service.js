import apiClient from "../client";
import { API_ENDPOINTS } from "../endpoints";

export const getDashboardData = () => {
  return apiClient.get(API_ENDPOINTS.DASHBOARD);
};
