import axios, { type AxiosRequestConfig } from "axios";
import {
  type Advertisement,
  type Pagination,
  type StatsSummary,
  type ActivityData,
  type DecisionsData,
  type Moderator,
} from "../types";

const baseURL = import.meta.env.VITE_API_URL || "/api/v1";

export const api = axios.create({
  baseURL,
  timeout: 10000,
});

async function get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  const res = await api.get<T>(url, config);
  return res.data;
}

async function post<T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig
): Promise<T> {
  const res = await api.post<T>(url, data, config);
  return res.data;
}

export interface GetAdsResponse {
  ads: Advertisement[];
  pagination: Pagination;
}

export const getAds = (
  params: Record<string, unknown>,
  signal?: AbortSignal
): Promise<GetAdsResponse> => get<GetAdsResponse>("/ads", { params, signal });

export const getAdById = (
  id: number | string,
  signal?: AbortSignal
): Promise<Advertisement> => get<Advertisement>(`/ads/${id}`, { signal });

export const approveAd = (
  id: number | string
): Promise<{ message: string; ad: Advertisement }> =>
  post(`/ads/${id}/approve`);

export const rejectAd = (
  id: number | string,
  payload: { reason: string; comment?: string }
): Promise<{ message: string; ad: Advertisement }> =>
  post(`/ads/${id}/reject`, payload);

export const requestChanges = (
  id: number | string,
  payload: { reason: string; comment?: string }
): Promise<{ message: string; ad: Advertisement }> =>
  post(`/ads/${id}/request-changes`, payload);

export const getStatsSummary = (
  params?: Record<string, unknown>
): Promise<StatsSummary> => get<StatsSummary>("/stats/summary", { params });

export const getActivityChart = (
  params?: Record<string, unknown>
): Promise<ActivityData[]> =>
  get<ActivityData[]>("/stats/chart/activity", { params });

export const getDecisionsChart = (
  params?: Record<string, unknown>
): Promise<DecisionsData> =>
  get<DecisionsData>("/stats/chart/decisions", { params });

export const getCategoriesChart = (
  params?: Record<string, unknown>
): Promise<Record<string, number>> =>
  get<Record<string, number>>("/stats/chart/categories", { params });

export const getModerator = (): Promise<Moderator> =>
  get<Moderator>("/moderators/me");
