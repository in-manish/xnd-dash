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
 * Curated primary hues (H, S%, L%) — moderate saturation, mid luminance for
 * white `primary-foreground` and a calm SaaS look (avoids random neon hues).
 * @type {ReadonlyArray<readonly [number, number, number]>}
 */
const TENANT_PRIMARY_PALETTE = [
  [250, 56, 47],
  [238, 54, 46],
  [265, 52, 49],
  [222, 53, 45],
  [200, 55, 42],
  [188, 50, 40],
  [172, 48, 39],
  [215, 48, 44],
  [320, 48, 46],
  [345, 50, 45],
  [210, 50, 44],
  [228, 51, 43],
  [275, 49, 47],
  [158, 46, 41],
  [32, 52, 44],
  [330, 47, 46],
];

const stableTenantHash = (tenantId) =>
  tenantId.split('').reduce((acc, char) => char.charCodeAt(0) + ((acc << 5) - acc), 0);

/**
 * @param {string} tenantId
 * @returns {{ h: number; s: number; l: number }}
 */
const getProfessionalPrimary = (tenantId) => {
  const idx = Math.abs(stableTenantHash(tenantId)) % TENANT_PRIMARY_PALETTE.length;
  const [h, s, l] = TENANT_PRIMARY_PALETTE[idx];
  return { h, s, l };
};

/**
 * Lighter companion for gradients and highlights (still restrained).
 * @param {number} h
 * @param {number} s
 * @param {number} l
 */
const deriveAccentTokens = (h, s, l) => {
  const ah = Math.round((h + 20) % 360);
  const as = Math.min(54, Math.max(40, s - 6));
  const al = Math.min(58, Math.max(50, l + 12));
  return `${ah} ${as}% ${al}%`;
};

/**
 * Space-separated HSL tokens for `hsl(var(--primary))`.
 * @param {string} tenantId
 * @returns {string}
 */
export const getTenantPrimaryTokens = (tenantId) => {
  const { h, s, l } = getProfessionalPrimary(tenantId);
  return `${h} ${s}% ${l}%`;
};

/**
 * Sets :root `--primary`, `data-tenant`, and document title from tenant config.
 * @param {TenantConfig} tenant
 */
export const applyTenantTheme = (tenant) => {
  if (!tenant?.tenantId) return;
  const root = document.documentElement;
  const { h, s, l } = getProfessionalPrimary(tenant.tenantId);
  root.style.setProperty('--primary', `${h} ${s}% ${l}%`);
  root.style.setProperty('--accent', deriveAccentTokens(h, s, l));
  root.setAttribute('data-tenant', tenant.tenantId);
  if (typeof tenant.appName === 'string') {
    document.title = tenant.appName;
  }
};

/**
 * Gets the current tenant based on the hostname.
 * @returns {TenantConfig | undefined}
 */
export const getCurrentTenant = () => {
  const hostname = window.location.hostname;
  const isLocal = hostname === 'localhost' || hostname === '127.0.0.1';

  if (isLocal) {
    const byId = tenants.find((t) => hostname.toLowerCase().includes(t.tenantId.toLowerCase()));
    return byId ?? tenants[0];
  }

  return (
    tenants.find(
      (t) =>
        t.domains.production === hostname ||
        t.domains.staging === hostname ||
        hostname.toLowerCase().includes(t.tenantId.toLowerCase())
    ) || tenants[0]
  );
};

/**
 * Generates a consistent HSL color based on a string hash.
 * @param {string} str 
 * @returns {string} HSL color string
 */
export const getTenantColor = (str) => {
  const { h, s, l } = getProfessionalPrimary(str);
  return `hsl(${h}, ${s}%, ${l}%)`;
};
