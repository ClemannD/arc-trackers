'use client';

import { useState } from 'react';
import {
  useFilteredQuests,
  useQuestFilterOptions,
} from '@/lib/arc-raiders-data-api/hooks/use-quests';
import QuestRow from './quest-row';
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

export default function QuestList() {
  const [search, setSearch] = useState('');
  const [markerCategory, setMarkerCategory] = useState<string>('');
  const [hasRewards, setHasRewards] = useState<'all' | 'yes' | 'no'>('all');
  const [sortBy, setSortBy] = useState<
    '' | 'name' | 'xp' | 'created_at' | 'updated_at'
  >('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [minXp, setMinXp] = useState<string>('');
  const [maxXp, setMaxXp] = useState<string>('');
  const [showFilters, setShowFilters] = useState(false);

  const { data: quests, isLoading } = useFilteredQuests({
    search,
    markerCategory: markerCategory || undefined,
    hasRewards:
      hasRewards === 'all' ? undefined : hasRewards === 'yes' ? true : false,
    minXp: minXp ? Number(minXp) : undefined,
    maxXp: maxXp ? Number(maxXp) : undefined,
    sortBy: sortBy || undefined,
    sortOrder,
  });

  const filterOptions = useQuestFilterOptions();

  const hasActiveFilters =
    markerCategory || hasRewards !== 'all' || minXp || maxXp;

  const clearAllFilters = () => {
    setMarkerCategory('');
    setHasRewards('all');
    setMinXp('');
    setMaxXp('');
    setSearch('');
    setSortBy('name');
    setSortOrder('asc');
  };

  if (isLoading) {
    return (
      <div className="flex w-96 items-center justify-center border-r p-8">
        <p className="text-muted-foreground">Loading quests...</p>
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
            placeholder="Search quests..."
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

            {/* Marker Category */}
            <div className="space-y-1.5">
              <Label htmlFor="marker-filter" className="text-xs">
                Marker Category
              </Label>
              <Select
                value={markerCategory || 'all'}
                onValueChange={(val) =>
                  setMarkerCategory(val === 'all' ? '' : val)
                }
              >
                <SelectTrigger id="marker-filter" className="h-9">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {filterOptions.markerCategories.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Rewards */}
            <div className="space-y-1.5">
              <Label htmlFor="rewards-filter" className="text-xs">
                Rewards
              </Label>
              <Select
                value={hasRewards}
                onValueChange={(val) =>
                  setHasRewards(val as 'all' | 'yes' | 'no')
                }
              >
                <SelectTrigger id="rewards-filter" className="h-9">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="yes">Has rewards</SelectItem>
                  <SelectItem value="no">No rewards</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* XP Range */}
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1.5">
                <Label htmlFor="min-xp" className="text-xs">
                  Min XP
                </Label>
                <Input
                  id="min-xp"
                  inputMode="numeric"
                  placeholder={`${filterOptions.xpRange.min || 0}`}
                  value={minXp}
                  onChange={(e) => setMinXp(e.target.value)}
                  className="h-9"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="max-xp" className="text-xs">
                  Max XP
                </Label>
                <Input
                  id="max-xp"
                  inputMode="numeric"
                  placeholder={`${filterOptions.xpRange.max || 0}`}
                  value={maxXp}
                  onChange={(e) => setMaxXp(e.target.value)}
                  className="h-9"
                />
              </div>
            </div>

            {/* Sort */}
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1.5">
                <Label htmlFor="sort-by" className="text-xs">
                  Sort By
                </Label>
                <Select
                  value={sortBy || 'name'}
                  onValueChange={(val) =>
                    setSortBy(
                      (val === 'name'
                        ? 'name'
                        : val === 'xp'
                          ? 'xp'
                          : val === 'created_at'
                            ? 'created_at'
                            : 'updated_at') as
                        | 'name'
                        | 'xp'
                        | 'created_at'
                        | 'updated_at',
                    )
                  }
                >
                  <SelectTrigger id="sort-by" className="h-9">
                    <SelectValue placeholder="Name" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="xp">XP</SelectItem>
                    <SelectItem value="updated_at">Updated</SelectItem>
                    <SelectItem value="created_at">Created</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="sort-order" className="text-xs">
                  Order
                </Label>
                <Select
                  value={sortOrder}
                  onValueChange={(val) => setSortOrder(val as 'asc' | 'desc')}
                >
                  <SelectTrigger id="sort-order" className="h-9">
                    <SelectValue placeholder="Asc" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="asc">Asc</SelectItem>
                    <SelectItem value="desc">Desc</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}

        {/* Results Count */}
        <div className="text-muted-foreground pt-1 text-xs">
          {quests.length} {quests.length === 1 ? 'quest' : 'quests'}
        </div>
      </div>

      {/* Quests List */}
      <div className="flex-1 overflow-y-auto">
        {quests.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <p className="text-muted-foreground text-sm">No quests found</p>
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
          quests.map((quest) => <QuestRow key={quest.id} quest={quest} />)
        )}
      </div>
    </div>
  );
}


