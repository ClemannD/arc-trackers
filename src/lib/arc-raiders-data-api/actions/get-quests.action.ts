import type { GetQuestsRequest } from '../models/get-quests-request.model';
import type { GetQuestsResponse } from '../models/get-quests-response.model';

/**
 * Base URL for the game data API proxy
 */
const BASE_URL = '/api/game-data';

/**
 * Builds a query string from request parameters
 */
function buildQueryString(params: GetQuestsRequest): string {
  const searchParams = new URLSearchParams();

  if (params.id) {
    searchParams.append('id', params.id);
  }
  if (params.page !== undefined) {
    searchParams.append('page', params.page.toString());
  }
  if (params.limit !== undefined) {
    searchParams.append('limit', params.limit.toString());
  }
  if (params.search) {
    searchParams.append('search', params.search);
  }
  if (params.sortBy) {
    searchParams.append('sortBy', params.sortBy);
  }
  if (params.sortOrder) {
    searchParams.append('sortOrder', params.sortOrder);
  }

  return searchParams.toString();
}

/**
 * Fetches quests from the MetaForge ARC Raiders API
 *
 * @param params - Query parameters for filtering and pagination
 * @returns Promise resolving to the quests response
 * @throws Error if the API request fails
 *
 * @example
 * ```ts
 * // Fetch all quests (first page)
 * const response = await getQuests({});
 *
 * // Fetch quests with search
 * const quests = await getQuests({ search: 'daily' });
 *
 * // Fetch a specific quest by ID
 * const quest = await getQuests({ id: 'quest-123' });
 *
 * // Fetch with pagination
 * const page2 = await getQuests({ page: 2, limit: 20 });
 * ```
 */
export async function getQuests(
  params: GetQuestsRequest = {},
): Promise<GetQuestsResponse> {
  const queryString = buildQueryString(params);
  const url = `${BASE_URL}/quests${queryString ? `?${queryString}` : ''}`;

  const response = await fetch(url);

  if (!response.ok) {
    const errorText = await response.text().catch(() => 'Unknown error');
    throw new Error(
      `Failed to fetch quests: ${response.status} ${response.statusText}. ${errorText}`,
    );
  }

  return response.json() as Promise<GetQuestsResponse>;
}
