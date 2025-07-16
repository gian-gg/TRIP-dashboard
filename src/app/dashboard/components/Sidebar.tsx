import * as React from 'react';
import { type LucideIcon } from 'lucide-react';

import { NavMain } from './nav-main';
import { NavUser } from './nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';

import { SidebarMenuButton } from '@/components/ui/sidebar';

import type { UserType } from '@/type';

const companyData = {
  title: 'Ceres Liners',
  subtitle: 'Ceres Transport, Inc.',
  logo: '/ceres.jpg',
};

export function AppSidebar({
  UserData,
  SideBarData,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  UserData: UserType;
  SideBarData: { title: string; url: string; icon: LucideIcon }[];
}) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <img
            src={companyData.logo}
            className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg"
            alt="company logo"
          />
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-bold">{companyData.title}</span>
            <span className="truncate text-xs">{companyData.subtitle}</span>
          </div>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={SideBarData} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={UserData} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
