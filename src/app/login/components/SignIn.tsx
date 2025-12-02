import { useState } from 'react';

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
  const [isLoading, setIsLoading] = useState(false); // for form

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

    setIsLoading(true);
    toast.promise(signIn(req), {
      loading: 'Loading...',
      success: (role) => {
        navigate('/' + role);
        setIsLoading(false);
        return 'Sign in successful!';
      },
      error: (err) => {
        setIsLoading(false);
        return err.message;
      },
    });
  };

  return (
    <Card className="w-full max-w-md border-0 bg-white/80 shadow-xl backdrop-blur-sm">
      <CardHeader className="space-y-1 pb-6">
        <CardTitle className="text-center text-2xl font-bold tracking-tight">
          Welcome back
        </CardTitle>
        <CardDescription className="text-center">
          Sign in to access your dashboard
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} id="sign-in-form">
          <div className="flex flex-col gap-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="name@example.com"
                required
                className="h-11 transition-all focus-visible:ring-2"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>

                <Dialog>
                  <DialogTrigger className="text-primary hover:text-primary/80 text-xs underline-offset-4 transition-colors hover:underline">
                    Forgot password?
                  </DialogTrigger>
                  <DialogContent className="border-0 bg-white/95 backdrop-blur-sm">
                    <DialogHeader>
                      <DialogTitle className="text-primary text-xl">
                        Reset Your Password
                      </DialogTitle>
                      <DialogDescription className="space-y-3 pt-2">
                        <p>
                          To reset your password, please email us at{' '}
                          <strong className="text-primary">
                            support@trip.com
                          </strong>{' '}
                          with:
                        </p>
                        <ul className="list-disc space-y-1 pl-5">
                          <li>Your registered email address</li>
                          <li>A brief description of your issue</li>
                        </ul>
                        <p>
                          We'll send you a secure link to create a new password.
                        </p>
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </div>
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="Enter your password"
                required
                className="h-11 transition-all focus-visible:ring-2"
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-3 pt-2">
        <Button
          type="submit"
          className="h-11 w-full shadow-lg transition-all hover:shadow-xl"
          form="sign-in-form"
          disabled={isLoading}
        >
          <LogIn className="h-4 w-4" />
          Sign In
        </Button>
      </CardFooter>
    </Card>
  );
}
