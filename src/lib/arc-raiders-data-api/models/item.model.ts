/**
 * Minimal item reference used in component lists
 */
export interface ItemReference {
  id: string;
  icon: string;
  name: string;
  rarity: string;
  item_type: string;
  description?: string;
}

/**
 * Component entry showing what items are needed to craft this item
 */
export interface ComponentEntry {
  quantity: number;
  component: ItemReference;
}

/**
 * Used in entry showing what items use this item as a component
 */
export interface UsedInEntry {
  item: ItemReference;
  quantity: number;
}

/**
 * ARC enemy reference
 */
export interface ArcReference {
  id: string;
  icon: string;
  name: string;
  description: string;
}

/**
 * Dropped by entry showing which ARC enemies drop this item
 */
export interface DroppedByEntry {
  id: string;
  arc: ArcReference;
  arc_id: string;
  created_at: string;
}

/**
 * Sold by entry showing which traders sell this item
 */
export interface SoldByEntry {
  price: number;
  trader_name: string;
}

/**
 * Mod entry showing compatible modifications for this item
 */
export interface ModEntry {
  mod: ItemReference;
}

/**
 * Stat block containing various item statistics
 */
export interface StatBlock {
  range?: number;
  value?: number;
  damage?: number;
  health?: number;
  radius?: number;
  shield?: number;
  weight?: number;
  agility?: number;
  arcStun?: number;
  healing?: number;
  stamina?: number;
  stealth?: number;
  useTime?: number;
  duration?: number;
  fireRate?: number;
  stability?: number;
  stackSize?: number;
  damageMult?: number;
  raiderStun?: number;
  weightLimit?: number;
  augmentSlots?: number;
  healingSlots?: number;
  magazineSize?: number;
  reducedNoise?: number;
  shieldCharge?: number;
  backpackSlots?: number;
  quickUseSlots?: number;
  damagePerSecond?: number;
  movementPenalty?: number;
  safePocketSlots?: number;
  damageMitigation?: number;
  healingPerSecond?: number;
  reducedEquipTime?: number;
  staminaPerSecond?: number;
  increasedADSSpeed?: number;
  increasedFireRate?: number;
  reducedReloadTime?: number;
  illuminationRadius?: number;
  increasedEquipTime?: number;
  reducedUnequipTime?: number;
  shieldCompatibility?: string | number;
  increasedUnequipTime?: number;
  reducedVerticalRecoil?: number;
  increasedBulletVelocity?: number;
  increasedVerticalRecoil?: number;
  reducedMaxShotDispersion?: number;
  reducedPerShotDispersion?: number;
  reducedDurabilityBurnRate?: number | null;
  reducedRecoilRecoveryTime?: number;
  increasedRecoilRecoveryTime?: number;
  reducedDispersionRecoveryTime?: number;
  // Weapon-specific properties
  ammo?: string;
  firingMode?: string;
  compatibleWeapons?: string;
  projectilesPerShot?: number;
  reducedProjectileDamage?: number;
}

/**
 * Item from the ARC Raiders data API
 */
export interface Item {
  id: string;
  name: string;
  description: string;
  item_type: string;
  loadout_slots: string[];
  icon: string;
  rarity: string;
  value: number;
  workbench: string | null;
  stat_block: StatBlock;
  flavor_text: string | null;
  subcategory: string | null;
  created_at: string;
  updated_at: string;
  shield_type: string | null;
  loot_area: string | null;
  sources: unknown | null;
  ammo_type: string | null;
  locations: unknown[];
  guide_links: unknown[];
  components: ComponentEntry[];
  used_in: UsedInEntry[];
  recycle_components: ComponentEntry[];
  recycle_from: UsedInEntry[];
  mods: ModEntry[];
  dropped_by: DroppedByEntry[];
  sold_by: SoldByEntry[];
}
