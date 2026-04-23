import apiClient from "./client";
import useTenantStore from "../store/useTenantStore";

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    // Backend expects 'Token <token>' or similar format. 
    // If token doesn't already have 'Token ' or 'Bearer ', prepend 'Token '.
    const authHeader = (token.startsWith('Token ') || token.startsWith('Bearer ')) 
      ? token 
      : `Token ${token}`;
    config.headers.Authorization = authHeader;
  }

  // Dynamic BaseURL Persistence
  const { tenant, environment } = useTenantStore.getState();
  
  if (environment === 'prod') {
    const host = tenant?.domains?.production;
    config.baseURL = host ? `https://${host}` : 'https://prod.opiniondigest.in';
  } else if (tenant) {
    const domain = tenant.domains.staging;
    if (domain) {
      // For staging, we follow the api.[domain] convention unless specified otherwise
      config.baseURL = `https://api.${domain}`;
    }
  }

  return config;
});
