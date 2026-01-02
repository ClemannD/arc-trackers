'use client';

import Image from 'next/image';
import { Package, ArrowRight, ArrowLeft, Recycle } from 'lucide-react';
import type {
  Item,
  ComponentEntry,
  UsedInEntry,
} from '@/lib/arc-raiders-data-api/models/item.model';
import { getRarityClasses } from '@/lib/arc-raiders-data-api/helpers/rarity-classes.helper';
import { useQueryState } from 'nuqs';

function CraftingItemCard({
  id,
  icon,
  name,
  rarity,
  quantity,
  onClick,
}: {
  id: string;
  icon: string;
  name: string;
  rarity: string;
  quantity?: number;
  onClick?: () => void;
}) {
  const rarityClasses = getRarityClasses(rarity);

  return (
    <button
      onClick={onClick}
      className="border-border bg-card hover:bg-accent flex items-center gap-3 rounded-lg border p-3 text-left transition-colors"
    >
      <div
        className={`${rarityClasses.background} ${rarityClasses.border} flex h-12 w-12 flex-shrink-0 items-center justify-center overflow-hidden rounded border-2`}
      >
        {icon ? (
          <Image
            src={icon}
            alt={name}
            width={40}
            height={40}
            className="object-contain"
          />
        ) : (
          <Package className="text-muted-foreground h-6 w-6" />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate font-medium">{name}</div>
        {quantity && (
          <div className="text-muted-foreground text-sm">
            Quantity: {quantity}
          </div>
        )}
      </div>
    </button>
  );
}

export default function CraftingTree({ item }: { item: Item }) {
  const [, setItemId] = useQueryState('itemId');

  const hasComponents = item.components && item.components.length > 0;
  console.log('item', item);
  console.log('hasComponents', hasComponents);
  const hasUsedIn = item.used_in && item.used_in.length > 0;
  const hasRecycleComponents =
    item.recycle_components && item.recycle_components.length > 0;
  const hasRecycleFrom = item.recycle_from && item.recycle_from.length > 0;

  const hasCraftingInfo =
    hasComponents || hasUsedIn || hasRecycleComponents || hasRecycleFrom;

  if (!hasCraftingInfo) {
    return null;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Crafting & Resources</h2>

      {/* Crafted From */}
      {hasComponents && (
        <div className="space-y-3">
          <div className="text-muted-foreground flex items-center gap-2 text-sm font-medium">
            <ArrowRight className="h-4 w-4" />
            <span>Crafted From ({item.components.length})</span>
          </div>
          <div className="ml-6 space-y-2">
            {item.components.map((comp: ComponentEntry, index: number) => (
              <CraftingItemCard
                key={`${comp.component.id}-${index}`}
                id={comp.component.id}
                icon={comp.component.icon}
                name={comp.component.name}
                rarity={comp.component.rarity}
                quantity={comp.quantity}
                onClick={() => setItemId(comp.component.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Used In */}
      {hasUsedIn && (
        <div className="space-y-3">
          <div className="text-muted-foreground flex items-center gap-2 text-sm font-medium">
            <ArrowLeft className="h-4 w-4" />
            <span>Used to Craft ({item.used_in.length})</span>
          </div>
          <div className="ml-6 space-y-2">
            {item.used_in.map((usage: UsedInEntry, index: number) => (
              <CraftingItemCard
                key={`${usage.item.id}-${index}`}
                id={usage.item.id}
                icon={usage.item.icon}
                name={usage.item.name}
                rarity={usage.item.rarity}
                quantity={usage.quantity}
                onClick={() => setItemId(usage.item.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Recycle Components */}
      {hasRecycleComponents && (
        <div className="space-y-3">
          <div className="text-muted-foreground flex items-center gap-2 text-sm font-medium">
            <Recycle className="h-4 w-4" />
            <span>Recycles Into ({item.recycle_components.length})</span>
          </div>
          <div className="ml-6 space-y-2">
            {item.recycle_components.map(
              (comp: ComponentEntry, index: number) => (
                <CraftingItemCard
                  key={`recycle-${comp.component.id}-${index}`}
                  id={comp.component.id}
                  icon={comp.component.icon}
                  name={comp.component.name}
                  rarity={comp.component.rarity}
                  quantity={comp.quantity}
                  onClick={() => setItemId(comp.component.id)}
                />
              ),
            )}
          </div>
        </div>
      )}

      {/* Recycle From */}
      {hasRecycleFrom && (
        <div className="space-y-3">
          <div className="text-muted-foreground flex items-center gap-2 text-sm font-medium">
            <Recycle className="h-4 w-4" />
            <span>Obtained by Recycling ({item.recycle_from.length})</span>
          </div>
          <div className="ml-6 space-y-2">
            {item.recycle_from.map((usage: UsedInEntry, index: number) => (
              <CraftingItemCard
                key={`recycle-from-${usage.item.id}-${index}`}
                id={usage.item.id}
                icon={usage.item.icon}
                name={usage.item.name}
                rarity={usage.item.rarity}
                quantity={usage.quantity}
                onClick={() => setItemId(usage.item.id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
