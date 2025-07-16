import { useAuthorized } from '@/lib/auth';
import { Outlet } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AppSidebar } from '../components/Sidebar';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { RotateCcw, LoaderCircle, CloudUpload } from 'lucide-react';

const SideBarData = [
  {
    title: 'Upload Trip',
    url: '/conductor/upload',
    icon: CloudUpload,
  },
];

export default function Conductor() {
  const { user, loading } = useAuthorized();

  if (!user || loading) {
    return (
      <div className="flex min-h-screen min-w-screen items-center justify-center">
        <LoaderCircle className="animate-spin" />
      </div>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar UserData={user} SideBarData={SideBarData} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex w-full items-center justify-between gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Button
              size="sm"
              onClick={() => window.location.reload()}
              className="cursor-pointer hover:opacity-80"
            >
              <RotateCcw className="size-4" /> Refresh
            </Button>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
