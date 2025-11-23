export const STATUS = ["pending", "approved", "rejected", "draft"] as const;
export type Status = (typeof STATUS)[number];

export const PRIORITY = ["normal", "urgent"] as const;
export type Priority = (typeof PRIORITY)[number];

export const MODERATION_ACTIONS = [
  "approved",
  "rejected",
  "requestChanges",
] as const;
export type ModerationAction = (typeof MODERATION_ACTIONS)[number];

export type ISODate = string;
export type ID = number;

export interface Seller {
  id: ID;
  name: string;
  rating: string;
  totalAds: number;
  registeredAt: ISODate;
}

export interface ModerationHistory {
  id: ID;
  moderatorId: ID;
  moderatorName: string;
  action: ModerationAction;
  reason?: string | null;
  comment?: string | null;
  timestamp: ISODate;
}

export interface Advertisement {
  id: ID;
  title: string;
  description: string;
  price: number;
  category: string;
  categoryId: number;
  status: Status;
  priority: Priority;
  createdAt: ISODate;
  updatedAt: ISODate;
  images: string[];
  seller: Seller;
  characteristics: Record<string, string>;
  moderationHistory: ModerationHistory[];
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

export interface StatsSummary {
  totalReviewed: number;
  totalReviewedToday: number;
  totalReviewedThisWeek: number;
  totalReviewedThisMonth: number;
  approvedPercentage: number;
  rejectedPercentage: number;
  requestChangesPercentage: number;
  averageReviewTime: number;
}

export interface ActivityData {
  date: string;
  approved: number;
  rejected: number;
  requestChanges: number;
}

export interface DecisionsData {
  approved: number;
  rejected: number;
  requestChanges: number;
}

export interface ModeratorStats {
  totalReviewed: number;
  todayReviewed: number;
  thisWeekReviewed: number;
  thisMonthReviewed: number;
  averageReviewTime: number;
  approvalRate: number;
}

export interface Moderator {
  id: ID;
  name: string;
  email: string;
  role: string;
  statistics: ModeratorStats;
  permissions: string[];
}
