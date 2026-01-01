'use client';

import type { Item } from '@/lib/arc-raiders-data-api/models/item.model';
import { getRarityClasses } from '@/lib/arc-raiders-data-api/helpers/rarity-classes.helper';
import Image from 'next/image';
import { Package } from 'lucide-react';
import { useQueryState } from 'nuqs';

export default function ItemRow({ item }: { item: Item }) {
  const rarityClasses = getRarityClasses(item.rarity);
  const [, setItemId] = useQueryState('itemId');

  return (
    <div
      onClick={() => setItemId(item.id)}
      className="hover:bg-accent flex cursor-pointer items-center gap-3 border-b transition-colors"
    >
      <div
        className={`${rarityClasses.background} ${rarityClasses.border} flex h-16 w-16 items-center justify-center overflow-hidden border-r-2`}
      >
        {item.icon ? (
          <Image
            src={item.icon}
            alt={item.name}
            width={48}
            height={48}
            className="object-contain"
          />
        ) : (
          <Package className="text-muted-foreground h-4 w-4" />
        )}
      </div>
      <span>{item.name}</span>
    </div>
  );
}
