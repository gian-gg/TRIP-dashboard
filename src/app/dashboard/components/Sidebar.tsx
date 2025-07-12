import * as React from 'react';
import {
  Bus,
  Route,
  SquareChartGantt,
  CircleDollarSign,
  Wrench,
} from 'lucide-react';

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

const data = {
  company: {
    title: 'Ceres Liners',
    subtitle: 'Ceres Transport, Inc.',
    logo: '/ceres.jpg',
  },
  user: {
    name: 'Geri Gian Epanto',
    email: '24100907@usc.edu.ph',
    avatar: '/user.png',
  },
  navMain: [
    {
      title: 'Overview',
      url: '/dashboard',
      icon: SquareChartGantt,
    },
    {
      title: 'Financial',
      url: '/dashboard/financial',
      icon: CircleDollarSign,
    },
    {
      title: 'Operations',
      url: '/dashboard/operations',
      icon: Bus,
    },
    {
      title: 'Routes',
      url: '/dashboard/busRoutes',
      icon: Route,
    },
    {
      title: 'Maintenance',
      url: '/dashboard/maintenance',
      icon: Wrench,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <img
            src={data.company.logo}
            className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg"
            alt="company logo"
          />
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-bold">{data.company.title}</span>
            <span className="truncate text-xs">{data.company.subtitle}</span>
          </div>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
