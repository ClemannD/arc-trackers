/**
 * Centralized query key factory for React Query cache management
 */
export const gameDataKeys = {
  all: ['game-data'] as const,

  items: {
    all: ['game-data', 'items'] as const,
    list: () => [...gameDataKeys.items.all, 'list'] as const,
    detail: (id: string) => [...gameDataKeys.items.all, 'detail', id] as const,
  },

  quests: {
    all: ['game-data', 'quests'] as const,
    list: () => [...gameDataKeys.quests.all, 'list'] as const,
    detail: (id: string) => [...gameDataKeys.quests.all, 'detail', id] as const,
  },
} as const;

/**
 * Cache time constants (24 hours in milliseconds)
 */
export const CACHE_TIME = {
  staleTime: 24 * 60 * 60 * 1000, // 24 hours - data considered fresh
  gcTime: 24 * 60 * 60 * 1000, // 24 hours - keep in cache
} as const;
