'use client';

import { useAllItems } from '@/lib/arc-raiders-data-api/hooks/use-items';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
export default function ItemsPage() {
  const { data: items, isLoading } = useAllItems();

  if (isLoading) {
    return <Skeleton className="h-16 w-full" />;
  }

  return (
    <div>
      {items?.map((item) => (
        <Card key={item.id}>
          <CardHeader>
            <CardTitle>{item.name}</CardTitle>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
