import type { Item } from './item.model';

/**
 * Pagination information for paginated responses
 */
export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

/**
 * Response from the get items endpoint
 */
export interface GetItemsResponse {
  data: Item[];
  maxValue: number;
  pagination: Pagination;
}
