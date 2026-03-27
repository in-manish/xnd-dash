/**
 * @typedef {"production" | "staging"} Environment
 */

/**
 * @typedef {Object} TenantConfig
 * @property {string} tenantId
 * @property {string} appName
 * @property {string} [icon]
 * @property {Object} domains
 * @property {string} domains.production
 * @property {string} domains.staging
 */

import tenantsData from './tenants.json';

/** @type {TenantConfig[]} */
export const tenants = tenantsData;

/**
 * Gets the current tenant based on the hostname.
 * @returns {TenantConfig | undefined}
 */
export const getCurrentTenant = () => {
  const hostname = window.location.hostname;
  return tenants.find(
    (t) =>
      t.domains.production === hostname ||
      t.domains.staging === hostname ||
      (hostname === 'localhost' || hostname === '127.0.0.1') || // Local dev matches first one or by tenantId
      hostname.includes(t.tenantId.toLowerCase())
  ) || tenants[0];
};

/**
 * Generates a consistent HSL color based on a string hash.
 * @param {string} str 
 * @returns {string} HSL color string
 */
export const getTenantColor = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const h = Math.abs(hash) % 360;
  // Using high saturation and medium lightness for a "premium" look
  return `hsl(${h}, 65%, 55%)`;
};
