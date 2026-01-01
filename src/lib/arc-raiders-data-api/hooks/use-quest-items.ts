'use client';

import { useMemo } from 'react';

import type { Item } from '../models/item.model';
import type { QuestItemEntry } from '../models/quest.model';
import { useAllItems } from './use-items';
import { useAllQuests, useQuest } from './use-quests';

/**
 * Resolved quest item with full item data and quantity
 */
export interface ResolvedQuestItem {
  item: Item;
  quantity: number | string;
}

/**
 * Resolved quest items grouped by category
 */
export interface QuestItemsResult {
  requiredItems: ResolvedQuestItem[];
  rewards: ResolvedQuestItem[];
  grantedItems: ResolvedQuestItem[];
}

/**
 * Resolve item references to full Item objects
 */
function resolveQuestItems(
  entries: QuestItemEntry[] | undefined,
  itemMap: Map<string, Item>,
): ResolvedQuestItem[] {
  if (!entries || entries.length === 0) return [];

  return entries
    .map((entry) => {
      const item = itemMap.get(entry.item_id);
      if (!item) return null;
      return { item, quantity: entry.quantity };
    })
    .filter((resolved): resolved is ResolvedQuestItem => resolved !== null);
}

/**
 * Get all items associated with a quest (required items, rewards, granted items).
 * Resolves item references to full Item objects from the items cache.
 */
export function useQuestItems(questId: string | undefined): {
  data: QuestItemsResult | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
} {
  const {
    data: quest,
    isLoading: questLoading,
    isError: questError,
    error: questErrorObj,
  } = useQuest(questId);

  const {
    data: items,
    isLoading: itemsLoading,
    isError: itemsError,
    error: itemsErrorObj,
  } = useAllItems();

  const resolvedItems = useMemo(() => {
    if (!quest || !items) return undefined;

    // Create a lookup map for fast item resolution
    const itemMap = new Map(items.map((item) => [item.id, item]));

    return {
      requiredItems: resolveQuestItems(quest.required_items, itemMap),
      rewards: resolveQuestItems(quest.rewards, itemMap),
      grantedItems: resolveQuestItems(quest.granted_items, itemMap),
    };
  }, [quest, items]);

  return {
    data: resolvedItems,
    isLoading: questLoading || itemsLoading,
    isError: questError || itemsError,
    error: questErrorObj || itemsErrorObj,
  };
}

/**
 * Find all quests that require a specific item
 */
export function useQuestsRequiringItem(itemId: string | undefined) {
  const { data: quests } = useAllQuests();

  return useMemo(() => {
    if (!quests || !itemId) return [];

    return quests.filter((quest) =>
      quest.required_items?.some((entry) => entry.item_id === itemId),
    );
  }, [quests, itemId]);
}

/**
 * Find all quests that reward a specific item
 */
export function useQuestsRewardingItem(itemId: string | undefined) {
  const { data: quests } = useAllQuests();

  return useMemo(() => {
    if (!quests || !itemId) return [];

    return quests.filter((quest) =>
      quest.rewards?.some((entry) => entry.item_id === itemId),
    );
  }, [quests, itemId]);
}
