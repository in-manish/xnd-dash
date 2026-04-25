import apiClient from "../client";
import { API_ENDPOINTS } from "../endpoints";

const DEFAULT_DIGEST_PARAMS = {
  page: 1,
  size: 10,
  sort_by: "first_published_at",
  sort_order: "desc",
  web_sources: "",
  authors: "",
  search: "",
  digest_types: "",
  status: "",
  categories_or: "",
  labels: "",
  editor_score_quality: "",
  editor_score_relevance_term: "",
  tags: "",
  region_ids: "",
};

export const getDigests = async (params = {}) => {
  const response = await apiClient.get(API_ENDPOINTS.DIGESTS, {
    params: {
      ...DEFAULT_DIGEST_PARAMS,
      ...params,
    },
  });

  return response.data;
};

export const getDigestStatuses = async () => {
  const response = await apiClient.get(API_ENDPOINTS.DIGEST_STATUSES, {
    params: { page: 1, size: 100 },
  });
  return response.data;
};
