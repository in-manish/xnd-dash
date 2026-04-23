import apiClient from "../client";
import { API_ENDPOINTS } from "../endpoints";

export const getHostConfigs = async (params = {}) => {
  const response = await apiClient.get(API_ENDPOINTS.HOSTS_LIST, { params });
  return response.data;
};

export const updateHostConfig = async (payload) => {
  // If payload is FormData, axios handles it automatically including headers
  const response = await apiClient.patch(API_ENDPOINTS.HOST_CONFIG, payload, {
    headers: payload instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : {}
  });
  return response.data;
};

export const createHostConfig = async (payload) => {
  const response = await apiClient.post(API_ENDPOINTS.HOST_CONFIG, payload, {
    headers: payload instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : {}
  });
  return response.data;
};
