import type { ItemReference } from './item.model';

/**
 * Guide link for a quest
 */
export interface GuideLink {
  url: string;
  label: string;
}

/**
 * Location coordinate for a quest
 */
export interface QuestLocation {
  x?: number;
  y?: number;
  id?: string;
  map: string;
}

/**
 * Quest item entry (used for required_items, rewards, and granted_items)
 */
export interface QuestItemEntry {
  id: string;
  item: ItemReference;
  item_id: string;
  quantity: number | string;
}

/**
 * Quest from the ARC Raiders data API
 */
export interface Quest {
  id: string;
  name: string;
  objectives: string[];
  xp: number;
  granted_items: QuestItemEntry[];
  created_at: string;
  updated_at: string;
  locations: QuestLocation[];
  marker_category: string | null;
  image: string | null;
  guide_links: GuideLink[];
  required_items: QuestItemEntry[];
  rewards: QuestItemEntry[];
}
