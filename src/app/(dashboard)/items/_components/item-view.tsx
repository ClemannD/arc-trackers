'use client';

import { useQueryState } from 'nuqs';
import { useAllItems } from '@/lib/arc-raiders-data-api/hooks/use-items';
import { getRarityClasses } from '@/lib/arc-raiders-data-api/helpers/rarity-classes.helper';
import Image from 'next/image';
import { Package } from 'lucide-react';

export default function ItemView() {
  const [itemId] = useQueryState('itemId');
  const { data: items } = useAllItems();

  const selectedItem = items?.find((item) => item.id === itemId);

  if (!itemId || !selectedItem) {
    return (
      <div className="text-muted-foreground flex flex-1 items-center justify-center">
        Select an item to view details
      </div>
    );
  }

  const rarityClasses = getRarityClasses(selectedItem.rarity);

  return (
    <div className="h-full flex-1 overflow-y-auto p-6">
      <div className="space-y-6">
        {/* Header with image and name */}
        <div className="flex items-start gap-6">
          <div
            className={`${rarityClasses.background} ${rarityClasses.border} flex h-32 w-32 items-center justify-center overflow-hidden rounded-lg border-4`}
          >
            {selectedItem.icon ? (
              <Image
                src={selectedItem.icon}
                alt={selectedItem.name}
                width={96}
                height={96}
                className="object-contain"
              />
            ) : (
              <Package className="text-muted-foreground h-12 w-12" />
            )}
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold">{selectedItem.name}</h1>
            <div className="mt-2 flex items-center gap-3">
              <span
                className={`inline-block rounded px-2 py-1 text-sm font-medium ${rarityClasses.background}`}
              >
                {selectedItem.rarity}
              </span>
              <span className="text-muted-foreground text-sm">
                {selectedItem.item_type}
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        {selectedItem.description && (
          <div>
            <h2 className="mb-2 text-lg font-semibold">Description</h2>
            <p className="text-muted-foreground">{selectedItem.description}</p>
          </div>
        )}

        {/* Base Information */}
        <div>
          <h2 className="mb-2 text-lg font-semibold">Base Information</h2>
          <div className="grid gap-2">
            {selectedItem.value > 0 && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Value:</span>
                <span className="font-medium">{selectedItem.value}</span>
              </div>
            )}
            {selectedItem.subcategory && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subcategory:</span>
                <span className="font-medium">{selectedItem.subcategory}</span>
              </div>
            )}
            {selectedItem.workbench && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Workbench:</span>
                <span className="font-medium">{selectedItem.workbench}</span>
              </div>
            )}
            {selectedItem.ammo_type && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Ammo Type:</span>
                <span className="font-medium">{selectedItem.ammo_type}</span>
              </div>
            )}
            {selectedItem.shield_type && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shield Type:</span>
                <span className="font-medium">{selectedItem.shield_type}</span>
              </div>
            )}
          </div>
        </div>

        {/* Flavor Text */}
        {selectedItem.flavor_text && (
          <div>
            <h2 className="mb-2 text-lg font-semibold">Flavor Text</h2>
            <p className="text-muted-foreground italic">
              {selectedItem.flavor_text}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
