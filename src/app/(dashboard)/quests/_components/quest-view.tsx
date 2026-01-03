'use client';

import { useQueryState } from 'nuqs';
import { useAllQuests } from '@/lib/arc-raiders-data-api/hooks/use-quests';
import Image from 'next/image';
import { ExternalLink, MapPin, ScrollText } from 'lucide-react';
import QuestItemEntries from './quest-item-entries';

export default function QuestView() {
  const [questId] = useQueryState('questId');
  const { data: quests } = useAllQuests();

  const selectedQuest = quests?.find((quest) => quest.id === questId);

  if (!questId || !selectedQuest) {
    return (
      <div className="text-muted-foreground flex flex-1 items-center justify-center">
        Select a quest to view details
      </div>
    );
  }

  return (
    <div className="max-h-screen flex-1 overflow-y-auto p-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start gap-6">
          <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-lg border-4">
            {selectedQuest.image ? (
              <Image
                src={selectedQuest.image}
                alt={selectedQuest.name}
                width={96}
                height={96}
                className="object-contain"
              />
            ) : (
              <ScrollText className="text-muted-foreground h-12 w-12" />
            )}
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold">{selectedQuest.name}</h1>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              {selectedQuest.xp > 0 && (
                <span className="bg-muted text-muted-foreground inline-block rounded px-2 py-1 text-sm font-medium">
                  {selectedQuest.xp} XP
                </span>
              )}
              {selectedQuest.marker_category && (
                <span className="text-muted-foreground text-sm">
                  {selectedQuest.marker_category}
                </span>
              )}
            </div>
            <div className="text-muted-foreground mt-2 text-xs">
              <span>Updated: {selectedQuest.updated_at}</span>
              <span className="text-muted-foreground/60 mx-2">•</span>
              <span>Created: {selectedQuest.created_at}</span>
            </div>
          </div>
        </div>

        {/* Objectives */}
        {selectedQuest.objectives?.length > 0 && (
          <div>
            <h2 className="mb-2 text-lg font-semibold">Objectives</h2>
            <ul className="space-y-1">
              {selectedQuest.objectives.map((objective, idx) => (
                <li
                  key={`${selectedQuest.id}-obj-${idx}`}
                  className="flex gap-2"
                >
                  <span className="text-muted-foreground">-</span>
                  <span>{objective}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Items */}
        <QuestItemEntries
          title="Required Items"
          entries={selectedQuest.required_items}
        />
        <QuestItemEntries title="Rewards" entries={selectedQuest.rewards} />
        <QuestItemEntries
          title="Granted Items"
          entries={selectedQuest.granted_items}
        />

        {/* Locations */}
        {selectedQuest.locations?.length > 0 && (
          <div>
            <h2 className="mb-2 text-lg font-semibold">Locations</h2>
            <div className="space-y-2">
              {selectedQuest.locations.map((loc, idx) => (
                <div
                  key={`${selectedQuest.id}-loc-${idx}`}
                  className="flex items-center gap-2 rounded-md border p-3"
                >
                  <MapPin className="text-muted-foreground h-4 w-4" />
                  <div className="min-w-0 flex-1">
                    <div className="font-medium">{loc.map}</div>
                    <div className="text-muted-foreground text-xs">
                      {loc.id && <span>ID: {loc.id}</span>}
                      {loc.x !== undefined && loc.y !== undefined && (
                        <>
                          {loc.id && (
                            <span className="text-muted-foreground/60 mx-2">
                              •
                            </span>
                          )}
                          <span>
                            x: {loc.x}, y: {loc.y}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Guide Links */}
        {selectedQuest.guide_links?.length > 0 && (
          <div>
            <h2 className="mb-2 text-lg font-semibold">Guides</h2>
            <div className="space-y-2">
              {selectedQuest.guide_links.map((link, idx) => (
                <a
                  key={`${selectedQuest.id}-guide-${idx}`}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:bg-accent flex items-center justify-between gap-3 rounded-md border p-3 transition-colors"
                >
                  <div className="min-w-0">
                    <div className="truncate font-medium">
                      {link.label || link.url}
                    </div>
                    <div className="text-muted-foreground truncate text-xs">
                      {link.url}
                    </div>
                  </div>
                  <ExternalLink className="text-muted-foreground h-4 w-4 shrink-0" />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
