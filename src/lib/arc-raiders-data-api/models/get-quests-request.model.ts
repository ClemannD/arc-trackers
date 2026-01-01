/**
 * Query parameters for the get quests endpoint
 */
export interface GetQuestsRequest {
  /**
   * Fetch a specific quest by ID
   */
  id?: string;

  /**
   * Page number for pagination
   * @default 1
   */
  page?: number;

  /**
   * Number of quests per page (max 100)
   * @default 40
   */
  limit?: number;

  /**
   * Search quests by name (max 100 characters)
   */
  search?: string;

  /**
   * Field to sort by
   * @default "name"
   */
  sortBy?: string;

  /**
   * Sort order (asc or desc)
   * @default "asc"
   */
  sortOrder?: 'asc' | 'desc';
}
