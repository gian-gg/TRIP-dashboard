import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { Settings, ChevronsUpDown, LogOut } from 'lucide-react';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useSidebar } from '@/components/ui/sidebar-helpers';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { ConfirmToast } from '@/components/Toasts';

import { signOut } from '@/lib/auth';
import passwordChecker from '@/lib/passwordChecker';
import APICall from '@/lib/api';

import type { UserType } from '@/type';

import { getInitials } from '@/lib/misc';

export function NavUser(props: {
  user: UserType;
  setUser: (user: UserType) => void;
}) {
  const { isMobile } = useSidebar();
  const navigate = useNavigate();

  const [openProfileDialog, setOpenProfileDialog] = useState<boolean>(false);

  const handleSignOut = () => {
    signOut();
    toast.success('Signed out successfully');
    navigate('/');
  };

  const handleProfileUpdate = useCallback(
    async (e: React.FormEvent) => {
      const formData = new FormData(e.target as HTMLFormElement);
      const name = formData.get('name') as string | null;
      const email = formData.get('email') as string | null;
      const oldPassword = formData.get('oldPassword') as string | null;
      const newPassword = formData.get('newPassword') as string | null;
      const confirmPassword = formData.get('confirmPassword') as string | null;

      if (name === props.user.name || email === props.user.email) {
        toast.error('No changes detected for name or email.');
      }

      if (newPassword && confirmPassword) {
        if (newPassword !== confirmPassword) {
          toast.error('New password and confirmation do not match');
        }

        const passwordError = passwordChecker(newPassword);
        if (passwordError) {
          toast.error(passwordError);
        }
      }

      const requestBody = {
        user_id: props.user.user_id,
        name: name,
        email: email,
        current_password: oldPassword,
        new_password: newPassword,
      };

      console.log('Request Body:', requestBody);

      toast.promise(
        async () => {
          await APICall<UserType>({
            type: 'PUT',
            url: '/users/index.php',
            body: requestBody,
            consoleLabel: 'Profile Update Response',
            success: (data) => props.setUser(data),
            error: (error) => {
              throw new Error(error.message);
            },
          });
        },
        {
          loading: 'Updating profile...',
          success: 'Profile updated successfully',
          error: (err) => err.message,
        }
      );
    },
    [props]
  );

  return (
    <>
      <Dialog open={openProfileDialog} onOpenChange={setOpenProfileDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Settings</DialogTitle>
            <DialogDescription asChild>
              <div className="mb-4 flex flex-col items-center">
                <div className="mb-2 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-gray-200">
                  <span className="text-4xl font-bold text-gray-600">
                    {getInitials(props.user.name)}
                  </span>
                </div>
                <span className="text-muted-foreground text-xs">
                  {props.user.name}
                </span>
              </div>
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col justify-start gap-3">
            {/* Change Name Form */}
            <form
              className="flex flex-col gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                setOpenProfileDialog(false);
                ConfirmToast('Edit Profile', () => handleProfileUpdate(e));
              }}
            >
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                defaultValue={props.user.name}
                required
              />
              <Button type="submit" variant="default">
                Update Name
              </Button>
            </form>
            {/* Change Email Form */}
            <form
              className="flex flex-col gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                setOpenProfileDialog(false);
                ConfirmToast('Edit Profile', () => handleProfileUpdate(e));
              }}
            >
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                defaultValue={props.user.email}
                required
              />
              <Button type="submit" variant="default">
                Update Email
              </Button>
            </form>
            {/* Change Password Form */}
            <form
              className="flex flex-col gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                setOpenProfileDialog(false);
                ConfirmToast('Edit Profile', () => handleProfileUpdate(e));
              }}
            >
              <Label htmlFor="oldPassword">Current Password</Label>
              <Input
                id="oldPassword"
                name="oldPassword"
                type="password"
                autoComplete="current-password"
                required
              />
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                name="newPassword"
                required
                type="password"
                autoComplete="new-password"
              />
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
              />
              <Button type="submit" variant="default">
                Update Password
              </Button>
            </form>
          </div>
        </DialogContent>
      </Dialog>

      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarFallback className="rounded-lg">
                    {getInitials(props.user.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {props.user.name}
                  </span>
                  <span className="truncate text-xs">{props.user.email}</span>
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
              side={isMobile ? 'bottom' : 'right'}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarFallback className="rounded-lg">
                      {getInitials(props.user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">
                      {props.user.name}
                    </span>
                    <span className="truncate text-xs">{props.user.email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => setOpenProfileDialog(true)}>
                  <Settings />
                  Account Settings
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut}>
                <LogOut />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </>
  );
}
