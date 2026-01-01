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
      <SidebarInset>
        <main className="flex flex-1 flex-col gap-4 p-4">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
