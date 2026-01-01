'use client';

import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { getItems } from '../actions/get-items.action';
import type { Item } from '../models/item.model';
import { CACHE_TIME, gameDataKeys } from '../query-keys';

/**
 * Fetch all items with 24-hour cache.
 * The API proxy handles pagination internally and returns all items.
 */
export function useAllItems() {
  return useQuery({
    queryKey: gameDataKeys.items.list(),
    queryFn: () => getItems(),
    staleTime: CACHE_TIME.staleTime,
    gcTime: CACHE_TIME.gcTime,
    select: (response) => response.data,
  });
}

/**
 * Filter options for items
 */
export interface ItemFilters {
  search?: string;
  itemType?: string;
  rarity?: string;
  workbench?: string;
  subcategory?: string;
  loadoutSlot?: string;
  shieldType?: string;
  sortBy?: keyof Item | 'name' | 'value' | 'rarity';
  sortOrder?: 'asc' | 'desc';
}

/**
 * Rarity order for sorting (common to legendary)
 */
const RARITY_ORDER: Record<string, number> = {
  Common: 1,
  Uncommon: 2,
  Rare: 3,
  Epic: 4,
  Legendary: 5,
};

/**
 * Filter and sort items client-side.
 * Derives from useAllItems cache.
 */
export function useFilteredItems(filters: ItemFilters = {}) {
  const { data: items, ...queryResult } = useAllItems();

  const filteredItems = useMemo(() => {
    if (!items) return [];

    let result = [...items];

    // Text search (name and description)
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(searchLower) ||
          item.description?.toLowerCase().includes(searchLower),
      );
    }

    // Filter by item type
    if (filters.itemType) {
      result = result.filter((item) => item.item_type === filters.itemType);
    }

    // Filter by rarity
    if (filters.rarity) {
      result = result.filter((item) => item.rarity === filters.rarity);
    }

    // Filter by workbench
    if (filters.workbench) {
      result = result.filter((item) => item.workbench === filters.workbench);
    }

    // Filter by subcategory
    if (filters.subcategory) {
      result = result.filter(
        (item) => item.subcategory === filters.subcategory,
      );
    }

    // Filter by loadout slot
    if (filters.loadoutSlot) {
      result = result.filter((item) =>
        item.loadout_slots?.includes(filters.loadoutSlot!),
      );
    }

    // Filter by shield type
    if (filters.shieldType) {
      result = result.filter((item) => item.shield_type === filters.shieldType);
    }

    // Sort
    if (filters.sortBy) {
      const sortOrder = filters.sortOrder === 'desc' ? -1 : 1;

      result.sort((a, b) => {
        if (filters.sortBy === 'rarity') {
          const aOrder = RARITY_ORDER[a.rarity] ?? 0;
          const bOrder = RARITY_ORDER[b.rarity] ?? 0;
          return (aOrder - bOrder) * sortOrder;
        }

        const aVal = a[filters.sortBy as keyof Item];
        const bVal = b[filters.sortBy as keyof Item];

        if (typeof aVal === 'string' && typeof bVal === 'string') {
          return aVal.localeCompare(bVal) * sortOrder;
        }

        if (typeof aVal === 'number' && typeof bVal === 'number') {
          return (aVal - bVal) * sortOrder;
        }

        return 0;
      });
    }

    return result;
  }, [items, filters]);

  return {
    ...queryResult,
    data: filteredItems,
    totalCount: items?.length ?? 0,
  };
}

/**
 * Get a single item by ID.
 * Selects from the cached items list to avoid extra requests.
 */
export function useItem(id: string | undefined) {
  return useQuery({
    queryKey: gameDataKeys.items.detail(id ?? ''),
    queryFn: () => getItems(),
    staleTime: CACHE_TIME.staleTime,
    gcTime: CACHE_TIME.gcTime,
    select: (response) => response.data.find((item) => item.id === id),
    enabled: !!id,
  });
}

/**
 * Get multiple items by their IDs.
 * Useful for resolving item references in quests.
 */
export function useItemsByIds(ids: string[]) {
  const { data: items, ...queryResult } = useAllItems();

  const selectedItems = useMemo(() => {
    if (!items || ids.length === 0) return [];

    const itemMap = new Map(items.map((item) => [item.id, item]));
    return ids
      .map((id) => itemMap.get(id))
      .filter((item): item is Item => item !== undefined);
  }, [items, ids]);

  return {
    ...queryResult,
    data: selectedItems,
  };
}

/**
 * Get unique values for filter dropdowns
 */
export function useItemFilterOptions() {
  const { data: items } = useAllItems();

  return useMemo(() => {
    if (!items) {
      return {
        itemTypes: [],
        rarities: [],
        workbenches: [],
        subcategories: [],
        loadoutSlots: [],
        shieldTypes: [],
      };
    }

    return {
      itemTypes: [
        ...new Set(items.map((i) => i.item_type).filter(Boolean)),
      ].sort(),
      rarities: [...new Set(items.map((i) => i.rarity).filter(Boolean))].sort(
        (a, b) => (RARITY_ORDER[a] ?? 0) - (RARITY_ORDER[b] ?? 0),
      ),
      workbenches: [
        ...new Set(items.map((i) => i.workbench).filter(Boolean)),
      ].sort() as string[],
      subcategories: [
        ...new Set(items.map((i) => i.subcategory).filter(Boolean)),
      ].sort() as string[],
      loadoutSlots: [
        ...new Set(items.flatMap((i) => i.loadout_slots ?? [])),
      ].sort(),
      shieldTypes: [
        ...new Set(items.map((i) => i.shield_type).filter(Boolean)),
      ].sort() as string[],
    };
  }, [items]);
}
