import apiClient from "../client";
import { API_ENDPOINTS } from "../endpoints";

export const getAppConfigs = async (params = {}) => {
  const response = await apiClient.get(API_ENDPOINTS.APP_CONFIGS, { params });
  return response.data;
};

export const getAppConfigById = async (id) => {
  const response = await apiClient.get(`${API_ENDPOINTS.APP_CONFIGS}${id}/`);
  return response.data;
};

export const createAppConfig = async (configData) => {
  const response = await apiClient.post(API_ENDPOINTS.APP_CONFIG, configData);
  return response.data;
};
