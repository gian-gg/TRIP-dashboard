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
    <Card className="w-full max-w-sm bg-white">
      <CardHeader>
        <CardTitle className="text-xl font-bold">
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
                placeholder="Enter your email"
                required
                className="focus-visible:ring-ring border border-black/20"
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>

                <Dialog>
                  <DialogTrigger className="hover:text-primary/80 ml-auto inline-block cursor-pointer text-xs underline-offset-4 hover:underline">
                    Forgot your password?
                  </DialogTrigger>
                  <DialogContent className="bg-white">
                    <DialogHeader>
                      <DialogTitle className="text-primary">
                        Reset Your Password
                      </DialogTitle>
                      <DialogDescription>
                        To reset your password, please email us at{' '}
                        <strong className="text-primary">
                          support@trip.com
                        </strong>{' '}
                        with:
                        <div className="flex w-full flex-col items-center justify-center sm:items-start">
                          <ul className="mt-2 list-disc pl-4 text-left">
                            <li>Your registered email address</li>
                            <li>A brief description of your issue</li>
                          </ul>
                        </div>
                        <p className="mt-2">
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
                className="focus-visible:ring-ring border border-black/20"
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button
          type="submit"
          className="bg-primary hover:bg-primary/70 w-full cursor-pointer text-white"
          form="sign-in-form"
          disabled={isLoading}
        >
          <LogIn />
          Sign In
        </Button>
      </CardFooter>
    </Card>
  );
}
