'use client';

import type { QuestItemEntry } from '@/lib/arc-raiders-data-api/models/quest.model';
import { getRarityClasses } from '@/lib/arc-raiders-data-api/helpers/rarity-classes.helper';
import Link from 'next/link';
import Image from 'next/image';
import { Package } from 'lucide-react';

function formatQuantity(quantity: number | string) {
  if (typeof quantity === 'number') return quantity.toString();
  return quantity;
}

export default function QuestItemEntries({
  title,
  entries,
}: {
  title: string;
  entries: QuestItemEntry[] | undefined | null;
}) {
  if (!entries || entries.length === 0) return null;

  return (
    <div>
      <h2 className="mb-2 text-lg font-semibold">{title}</h2>
      <div className="space-y-2">
        {entries.map((entry) => {
          const rarityClasses = getRarityClasses(entry.item.rarity);
          return (
            <Link
              key={entry.id}
              href={`/items?itemId=${encodeURIComponent(entry.item_id)}`}
              className="hover:bg-accent flex items-center gap-3 rounded-md border p-3 transition-colors"
            >
              <div
                className={`${rarityClasses.background} ${rarityClasses.border} flex h-12 w-12 items-center justify-center overflow-hidden rounded-md border-2`}
              >
                {entry.item.icon ? (
                  <Image
                    src={entry.item.icon}
                    alt={entry.item.name}
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                ) : (
                  <Package className="text-muted-foreground h-4 w-4" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate font-medium">{entry.item.name}</div>
                <div className="text-muted-foreground flex items-center gap-2 text-xs">
                  <span>{entry.item.item_type}</span>
                  <span className="text-muted-foreground/60">•</span>
                  <span>{entry.item.rarity}</span>
                </div>
              </div>
              <div className="text-muted-foreground text-sm">
                x{formatQuantity(entry.quantity)}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}


