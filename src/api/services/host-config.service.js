import apiClient from "../client";
import { API_ENDPOINTS } from "../endpoints";

/** @typedef {'MAGAZINE' | 'NEWSPAPER' | 'TV'} HostGroup */

/**
 * @typedef {Object} HostListQueryParams
 * @property {string} [search] Free-text; backend treats publication-style vs URL/domain (see API docs).
 * @property {boolean} [is_top]
 * @property {boolean} [is_whitelist]
 * @property {HostGroup} [group]
 * @property {boolean} [is_featured] Dashboard: omit for featured default; `false` lists all.
 * @property {string} [action_status]
 * @property {string} [ordering] Comma-separated; fields: brand_name, modified_at, created_at, sort_by; prefix `-` for desc.
 */

const HOST_GROUPS = new Set(["MAGAZINE", "NEWSPAPER", "TV"]);

/**
 * Serializes host list GET params (omits empty / invalid entries).
 * @param {HostListQueryParams} input
 * @returns {Record<string, string | boolean>}
 */
export const buildHostListParams = (input = {}) => {
  /** @type {Record<string, string | boolean>} */
  const out = {};

  if (input.search != null) {
    const s = String(input.search).trim();
    if (s) out.search = s;
  }

  if (input.ordering != null) {
    const o = String(input.ordering).trim();
    if (o) out.ordering = o;
  }

  if (typeof input.is_top === "boolean") out.is_top = input.is_top;
  if (typeof input.is_whitelist === "boolean") out.is_whitelist = input.is_whitelist;
  if (typeof input.is_featured === "boolean") out.is_featured = input.is_featured;

  if (input.action_status != null) {
    const a = String(input.action_status).trim();
    if (a) out.action_status = a;
  }

  if (input.group != null) {
    const g = String(input.group).toUpperCase();
    if (HOST_GROUPS.has(g)) out.group = g;
  }

  return out;
};

/**
 * GET `/hosts/` with optional search, filters, and ordering (dashboard contract).
 * @param {HostListQueryParams} params
 */
export const getHostConfigs = async (params = {}) => {
  const response = await apiClient.get(API_ENDPOINTS.HOSTS_LIST, {
    params: buildHostListParams(params),
  });
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
