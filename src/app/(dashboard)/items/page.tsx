'use client';

import ItemList from './_components/item-list';
import ItemView from './_components/item-view';

export default function ItemsPage() {
  return (
    <div className="flex">
      <ItemList />
      <ItemView />
    </div>
  );
}
