/**
 * Query parameters for the get items endpoint
 */
export interface GetItemsRequest {
  /**
   * Page number for pagination
   * @default 1
   */
  page?: number;

  /**
   * Number of items per page (max 100)
   * @default 50
   */
  limit?: number;

  /**
   * Fetch a specific item by ID
   */
  id?: string;

  /**
   * Filter by item type (e.g., Weapon, Armor, Quick Use)
   */
  item_type?: string;

  /**
   * Filter by rarity (e.g., Common, Uncommon, Rare, Epic, Legendary)
   */
  rarity?: string;

  /**
   * Search items by name (max 100 characters)
   */
  search?: string;

  /**
   * Filter by loadout slot
   */
  loadout_slot?: string;

  /**
   * Filter by workbench requirement
   */
  workbench?: string;

  /**
   * Filter by subcategory
   */
  subcategory?: string;

  /**
   * Filter by shield type
   */
  shield_type?: string;

  /**
   * Include crafting components and relationships
   * @default false
   */
  includeComponents?: boolean;

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

  /**
   * Return minimal item data only
   * @default false
   */
  minimal?: boolean;
}
