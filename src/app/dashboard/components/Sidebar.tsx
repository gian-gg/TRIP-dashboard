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

const busCompanies = [
  {
    id: 1,
    title: 'Ceres Liners',
    subtitle: 'Ceres Transport, Inc.',
    logo: '/ceres.jpg',
  },
];

export function AppSidebar({
  UserData,
  SideBarData,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  UserData: UserType;
  SideBarData: { title: string; url: string; icon: LucideIcon }[];
}) {
  const [currentUser, setCurrentUser] = React.useState<UserType>(UserData); // for optimistic UI updates
  const [currentCompany, setCurrentCompany] =
    React.useState<(typeof busCompanies)[0]>(); // for optimistic UI updates

  React.useEffect(() => {
    setCurrentUser(UserData);
    setCurrentCompany(busCompanies[Number(UserData.company_id) - 1]);
  }, [UserData]);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <img
            src={currentCompany?.logo}
            className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg"
            alt="company logo"
          />
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-bold">{currentCompany?.title}</span>
            <span className="truncate text-xs">{currentCompany?.subtitle}</span>
          </div>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={SideBarData} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={currentUser} setUser={setCurrentUser} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
