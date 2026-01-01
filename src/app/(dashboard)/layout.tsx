'use client';

import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import AppSidebar from './_components/side-nav/app-sidebar';
import { useSidebarStore } from '@/lib/stores/sidebar-store';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { open, setOpen } = useSidebarStore();

  return (
    <SidebarProvider open={open} onOpenChange={setOpen}>
      <AppSidebar />
      <SidebarInset className="overflow-hidden">
        <main className="flex min-h-0 flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
