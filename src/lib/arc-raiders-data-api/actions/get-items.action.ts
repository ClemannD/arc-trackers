import type { GetItemsRequest } from '../models/get-items-request.model';
import type { GetItemsResponse } from '../models/get-items-response.model';

/**
 * Base URL for the game data API proxy
 */
const BASE_URL = '/api/game-data';

/**
 * Builds a query string from request parameters
 */
function buildQueryString(params: GetItemsRequest): string {
  const searchParams = new URLSearchParams();

  if (params.page !== undefined) {
    searchParams.append('page', params.page.toString());
  }
  if (params.limit !== undefined) {
    searchParams.append('limit', params.limit.toString());
  }
  if (params.id) {
    searchParams.append('id', params.id);
  }
  if (params.item_type) {
    searchParams.append('item_type', params.item_type);
  }
  if (params.rarity) {
    searchParams.append('rarity', params.rarity);
  }
  if (params.search) {
    searchParams.append('search', params.search);
  }
  if (params.loadout_slot) {
    searchParams.append('loadout_slot', params.loadout_slot);
  }
  if (params.workbench) {
    searchParams.append('workbench', params.workbench);
  }
  if (params.subcategory) {
    searchParams.append('subcategory', params.subcategory);
  }
  if (params.shield_type) {
    searchParams.append('shield_type', params.shield_type);
  }
  searchParams.append('includeComponents', 'true');
  if (params.sortBy) {
    searchParams.append('sortBy', params.sortBy);
  }
  if (params.sortOrder) {
    searchParams.append('sortOrder', params.sortOrder);
  }
  if (params.minimal !== undefined) {
    searchParams.append('minimal', params.minimal.toString());
  }

  return searchParams.toString();
}

/**
 * Fetches items from the MetaForge ARC Raiders API
 *
 * @param params - Query parameters for filtering and pagination
 * @returns Promise resolving to the items response
 * @throws Error if the API request fails
 *
 * @example
 * ```ts
 * // Fetch all items (first page)
 * const response = await getItems({});
 *
 * // Fetch items with filters
 * const weapons = await getItems({ item_type: 'Weapon', rarity: 'Epic' });
 *
 * // Fetch a specific item by ID
 * const item = await getItems({ id: 'item-123' });
 *
 * // Fetch with pagination
 * const page2 = await getItems({ page: 2, limit: 20 });
 * ```
 */
export async function getItems(
  params: GetItemsRequest = {},
): Promise<GetItemsResponse> {
  const queryString = buildQueryString(params);
  const url = `${BASE_URL}/items${queryString ? `?${queryString}` : ''}`;

  const response = await fetch(url);

  if (!response.ok) {
    const errorText = await response.text().catch(() => 'Unknown error');
    throw new Error(
      `Failed to fetch items: ${response.status} ${response.statusText}. ${errorText}`,
    );
  }

  return response.json() as Promise<GetItemsResponse>;
}
