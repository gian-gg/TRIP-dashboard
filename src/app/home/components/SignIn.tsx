import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { LogIn } from 'lucide-react';

import { signIn } from '@/lib/auth';

export function SignIn() {
  const navigate = useNavigate();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const req = {
      email: email,
      password: password,
    };

    toast.promise(signIn(req), {
      loading: 'Loading...',
      success: (user) => {
        navigate('/' + user.role);
        return 'Sign in successful!';
      },
      error: 'Sign in failed. Please check your credentials.',
    });
  };

  return (
    <Card className="w-full max-w-sm bg-white">
      <CardHeader>
        <CardTitle className="text-trip-primary text-xl font-bold">
          Sign In to your Account!
        </CardTitle>
        <CardDescription className="text-xs">
          Enter your email below to sign in to your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} id="sign-in-form">
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="xxxx@trip.com"
                required
                className="placeholder:text-muted-foreground focus-visible:ring-ring border border-black/20 bg-white text-black shadow-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                style={
                  {
                    backgroundColor: 'white',
                    boxShadow: 'none',
                    '--ring': '#3b82f6', // override soft yellow focus ring (Tailwind blue-500)
                    '--input': '#ffffff', // override soft yellow input bg
                  } as React.CSSProperties
                }
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>

                <Dialog>
                  <DialogTrigger className="hover:text-trip-primary/80 ml-auto inline-block cursor-pointer text-sm underline-offset-4 hover:underline">
                    Forgot your password?
                  </DialogTrigger>
                  <DialogContent className="bg-white">
                    <DialogHeader>
                      <DialogTitle className="text-trip-primary">
                        Forgot your password?
                      </DialogTitle>
                      <DialogDescription>
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Accusamus rerum eaque ad quia itaque eos tenetur
                        reprehenderit illum voluptatibus eligendi.
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </div>
              <Input
                id="password"
                type="password"
                name="password"
                required
                className="placeholder:text-muted-foreground focus-visible:ring-ring border border-black/20 bg-white text-black shadow-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                style={
                  {
                    backgroundColor: 'white',
                    boxShadow: 'none',
                    '--ring': '#3b82f6', // override soft yellow focus ring (Tailwind blue-500)
                    '--input': '#ffffff', // override soft yellow input bg
                  } as React.CSSProperties
                }
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button
          type="submit"
          className="bg-trip-primary hover:bg-trip-primary/70 w-full cursor-pointer text-white"
          form="sign-in-form"
        >
          <LogIn />
          Sign In
        </Button>
      </CardFooter>
    </Card>
  );
}
