'use client';

import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { getQuests } from '../actions/get-quests.action';
import type { Quest } from '../models/quest.model';
import { CACHE_TIME, gameDataKeys } from '../query-keys';

/**
 * Fetch all quests with 24-hour cache.
 * Uses a high limit to get all quests in a single request.
 */
export function useAllQuests() {
  return useQuery({
    queryKey: gameDataKeys.quests.list(),
    queryFn: () => getQuests({ limit: 10000 }),
    staleTime: CACHE_TIME.staleTime,
    gcTime: CACHE_TIME.gcTime,
    select: (response) => response.data,
  });
}

/**
 * Filter options for quests
 */
export interface QuestFilters {
  search?: string;
  markerCategory?: string;
  hasRewards?: boolean;
  minXp?: number;
  maxXp?: number;
  sortBy?: 'name' | 'xp' | 'created_at' | 'updated_at';
  sortOrder?: 'asc' | 'desc';
}

/**
 * Filter and sort quests client-side.
 * Derives from useAllQuests cache.
 */
export function useFilteredQuests(filters: QuestFilters = {}) {
  const { data: quests, ...queryResult } = useAllQuests();

  const filteredQuests = useMemo(() => {
    if (!quests) return [];

    let result = [...quests];

    // Text search (name and objectives)
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (quest) =>
          quest.name.toLowerCase().includes(searchLower) ||
          quest.objectives?.some((obj) =>
            obj.toLowerCase().includes(searchLower),
          ),
      );
    }

    // Filter by marker category
    if (filters.markerCategory) {
      result = result.filter(
        (quest) => quest.marker_category === filters.markerCategory,
      );
    }

    // Filter by has rewards
    if (filters.hasRewards !== undefined) {
      result = result.filter((quest) =>
        filters.hasRewards
          ? quest.rewards && quest.rewards.length > 0
          : !quest.rewards || quest.rewards.length === 0,
      );
    }

    // Filter by XP range
    if (filters.minXp !== undefined) {
      result = result.filter((quest) => quest.xp >= filters.minXp!);
    }
    if (filters.maxXp !== undefined) {
      result = result.filter((quest) => quest.xp <= filters.maxXp!);
    }

    // Sort
    if (filters.sortBy) {
      const sortOrder = filters.sortOrder === 'desc' ? -1 : 1;

      result.sort((a, b) => {
        const aVal = a[filters.sortBy as keyof Quest];
        const bVal = b[filters.sortBy as keyof Quest];

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
  }, [quests, filters]);

  return {
    ...queryResult,
    data: filteredQuests,
    totalCount: quests?.length ?? 0,
  };
}

/**
 * Get a single quest by ID.
 * Selects from the cached quests list to avoid extra requests.
 */
export function useQuest(id: string | undefined) {
  return useQuery({
    queryKey: gameDataKeys.quests.detail(id ?? ''),
    queryFn: () => getQuests({ limit: 10000 }),
    staleTime: CACHE_TIME.staleTime,
    gcTime: CACHE_TIME.gcTime,
    select: (response) => response.data.find((quest) => quest.id === id),
    enabled: !!id,
  });
}

/**
 * Get unique values for filter dropdowns
 */
export function useQuestFilterOptions() {
  const { data: quests } = useAllQuests();

  return useMemo(() => {
    if (!quests) {
      return {
        markerCategories: [],
        xpRange: { min: 0, max: 0 },
      };
    }

    const xpValues = quests.map((q) => q.xp).filter((xp) => xp > 0);

    return {
      markerCategories: [
        ...new Set(quests.map((q) => q.marker_category).filter(Boolean)),
      ].sort() as string[],
      xpRange: {
        min: xpValues.length > 0 ? Math.min(...xpValues) : 0,
        max: xpValues.length > 0 ? Math.max(...xpValues) : 0,
      },
    };
  }, [quests]);
}

