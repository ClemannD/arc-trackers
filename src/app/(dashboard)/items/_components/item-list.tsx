'use client';

import { useState } from 'react';
import {
  useFilteredItems,
  useItemFilterOptions,
} from '@/lib/arc-raiders-data-api/hooks/use-items';
import ItemRow from './item-row';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Filter, X } from 'lucide-react';
import { Label } from '@/components/ui/label';

export default function ItemList() {
  const [search, setSearch] = useState('');
  const [rarity, setRarity] = useState<string>('');
  const [itemType, setItemType] = useState<string>('');
  const [showFilters, setShowFilters] = useState(false);

  const { data: items, isLoading } = useFilteredItems({
    search,
    rarity: rarity || undefined,
    itemType: itemType || undefined,
  });

  const filterOptions = useItemFilterOptions();

  const hasActiveFilters = rarity || itemType;

  const clearAllFilters = () => {
    setRarity('');
    setItemType('');
    setSearch('');
  };

  if (isLoading) {
    return (
      <div className="flex w-96 items-center justify-center border-r p-8">
        <p className="text-muted-foreground">Loading items...</p>
      </div>
    );
  }

  return (
    <div className="flex max-h-screen w-96 flex-col border-r">
      {/* Sticky Filter Section */}
      <div className="bg-background sticky top-0 z-10 space-y-3 border-b p-4">
        {/* Search Bar */}
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Search items..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-11 flex-1 text-base"
          />
          <Button
            variant={showFilters ? 'default' : 'outline'}
            size="icon"
            onClick={() => setShowFilters(!showFilters)}
            className="h-11 w-11 shrink-0"
          >
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        {/* Collapsible Additional Filters */}
        {showFilters && (
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">Filters</h3>
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllFilters}
                  className="h-7 text-xs"
                >
                  <X className="mr-1 h-3 w-3" />
                  Clear All
                </Button>
              )}
            </div>

            {/* Rarity Filter */}
            <div className="space-y-1.5">
              <Label htmlFor="rarity-filter" className="text-xs">
                Rarity
              </Label>
              <Select
                value={rarity || 'all'}
                onValueChange={(val) => setRarity(val === 'all' ? '' : val)}
              >
                <SelectTrigger id="rarity-filter" className="h-9">
                  <SelectValue placeholder="All Rarities" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Rarities</SelectItem>
                  {filterOptions.rarities.map((r) => (
                    <SelectItem key={r} value={r}>
                      {r}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Item Type Filter */}
            <div className="space-y-1.5">
              <Label htmlFor="type-filter" className="text-xs">
                Item Type
              </Label>
              <Select
                value={itemType || 'all'}
                onValueChange={(val) => setItemType(val === 'all' ? '' : val)}
              >
                <SelectTrigger id="type-filter" className="h-9">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {filterOptions.itemTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {/* Results Count */}
        <div className="text-muted-foreground pt-1 text-xs">
          {items.length} {items.length === 1 ? 'item' : 'items'}
        </div>
      </div>

      {/* Items List */}
      <div className="flex-1 overflow-y-auto">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <p className="text-muted-foreground text-sm">No items found</p>
            {(search || hasActiveFilters) && (
              <Button
                variant="link"
                onClick={clearAllFilters}
                className="mt-2 text-xs"
              >
                Clear filters
              </Button>
            )}
          </div>
        ) : (
          items.map((item) => <ItemRow key={item.id} item={item} />)
        )}
      </div>
    </div>
  );
}
