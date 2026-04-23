import apiClient from "../client";
import { API_ENDPOINTS } from "../endpoints";

/**
 * Standardized login flow using the centralized API client.
 * @param {Object} credentials - The login credentials (email, password).
 * @returns {Promise} The API response data.
 */
export const login = async (credentials) => {
  // Login must always hit the production signin endpoint.
  const response = await apiClient.post(API_ENDPOINTS.LOGIN, credentials, {
    baseURL: "https://prod.opiniondigest.in",
  });

  return response.data;
};
