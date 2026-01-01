const rarityClassMap = {
  Common: {
    background: 'bg-rarity-common',
    border: 'border-rarity-common',
  },
  Uncommon: {
    background: 'bg-rarity-uncommon',
    border: 'border-rarity-uncommon',
  },
  Rare: {
    background: 'bg-rarity-rare',
    border: 'border-rarity-rare',
  },
  Epic: {
    background: 'bg-rarity-epic',
    border: 'border-rarity-epic',
  },
  Legendary: {
    background: 'bg-rarity-legendary',
    border: 'border-rarity-legendary',
  },
} as const;

export type RarityClassMap = typeof rarityClassMap;
export type RarityKey = keyof RarityClassMap;

/**
 * Get CSS classes for a given rarity level
 * @param rarity - The rarity string (e.g., "Common", "Uncommon", etc.)
 * @returns An object with background and border CSS class names
 */
export function getRarityClasses(rarity: string): {
  background: string;
  border: string;
} {
  const rarityKey = rarity as RarityKey;
  return rarityClassMap[rarityKey] || rarityClassMap.Common;
}

