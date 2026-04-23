import apiClient from "../client";
import { API_ENDPOINTS } from "../endpoints";

/**
 * Standardized login flow using the centralized API client.
 * @param {Object} credentials - The login credentials (email, password).
 * @returns {Promise} The API response data.
 */
export const login = async (credentials) => {
  // baseURL comes from apiClient + request interceptor (tenant + environment),
  // which must be set before login (see Login.jsx).
  const response = await apiClient.post(API_ENDPOINTS.LOGIN, credentials);
  return response.data;
};
