'use client';

import type { Quest } from '@/lib/arc-raiders-data-api/models/quest.model';
import Image from 'next/image';
import { ScrollText } from 'lucide-react';
import { useQueryState } from 'nuqs';

export default function QuestRow({ quest }: { quest: Quest }) {
  const [, setQuestId] = useQueryState('questId');

  return (
    <div
      onClick={() => setQuestId(quest.id)}
      className="hover:bg-accent flex cursor-pointer items-center gap-3 border-b transition-colors"
    >
      <div className="flex h-16 w-16 items-center justify-center overflow-hidden border-r-2">
        {quest.image ? (
          <Image
            src={quest.image}
            alt={quest.name}
            width={48}
            height={48}
            className="object-contain"
          />
        ) : (
          <ScrollText className="text-muted-foreground h-4 w-4" />
        )}
      </div>
      <div className="min-w-0 flex-1 py-2">
        <div className="truncate">{quest.name}</div>
        <div className="text-muted-foreground flex items-center gap-2 text-xs">
          {quest.xp > 0 && <span>{quest.xp} XP</span>}
          {quest.marker_category && (
            <>
              <span className="text-muted-foreground/60">•</span>
              <span className="truncate">{quest.marker_category}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}


