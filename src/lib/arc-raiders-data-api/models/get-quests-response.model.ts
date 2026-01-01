import type { Quest } from './quest.model';
import type { Pagination } from './get-items-response.model';

/**
 * Response from the get quests endpoint
 */
export interface GetQuestsResponse {
  data: Quest[];
  pagination: Pagination;
}
