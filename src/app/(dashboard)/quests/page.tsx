'use client';

import QuestList from './_components/quest-list';
import QuestView from './_components/quest-view';

export default function QuestsPage() {
  return (
    <div className="flex">
      <QuestList />
      <QuestView />
    </div>
  );
}


