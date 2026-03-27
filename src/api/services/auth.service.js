import apiClient from "../client";
import { API_ENDPOINTS } from "../endpoints";
import { tenants } from "../config/tenantConfig";

/**
 * Gets the base URL for a given tenant and environment.
 */
const getBaseUrl = (tenantId, env) => {
  const tenant = tenants.find((t) => t.tenantId === tenantId);
  if (!tenant) return "";

  const domain = tenant.domains[env === "prod" ? "production" : "staging"];
  return `https://${domain}`;
};

/**
 * Standardized login flow using the centralized API client.
 * @param {Object} credentials - The login credentials (email, password).
 * @param {string} tenant - The tenant ID.
 * @param {string} env - The environment (prod/staging).
 * @returns {Promise} The API response data.
 */
export const login = async (credentials, tenant = "dailybrief", env = "prod") => {
  // Update the global apiClient baseURL to match the selected tenant/environment
  const baseUrl = getBaseUrl(tenant, env);
  if (baseUrl) {
    apiClient.defaults.baseURL = baseUrl;
  }

  // standard practice: use the endpoint constant directly
  const response = await apiClient.post(API_ENDPOINTS.LOGIN, credentials);

  return response.data;
};
