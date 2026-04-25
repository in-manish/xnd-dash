import apiClient from "../client";
import { API_ENDPOINTS } from "../endpoints";

const unwrapConfigs = (data) => (Array.isArray(data) ? data : data?.results || []);

export const getAppConfigs = async (params = {}) => {
  const response = await apiClient.get(API_ENDPOINTS.APP_CONFIG, { params });
  return response.data;
};

export const getAllAppConfigs = async (params = {}) => {
  const firstResponse = await getAppConfigs(params);
  const configs = [...unwrapConfigs(firstResponse)];
  let nextUrl = firstResponse?.next;

  while (nextUrl) {
    const response = await apiClient.get(nextUrl);
    configs.push(...unwrapConfigs(response.data));
    nextUrl = response.data?.next;
  }

  return {
    count: firstResponse?.count ?? configs.length,
    results: configs,
  };
};

export const createAppConfig = async (configData) => {
  const response = await apiClient.post(API_ENDPOINTS.APP_CONFIG, configData);
  return response.data;
};
