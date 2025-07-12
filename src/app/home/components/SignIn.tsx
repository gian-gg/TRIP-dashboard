import { toast } from 'sonner';

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

export function SignIn() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    console.log('Signed in as: ', {
      email: email,
      password: password,
    });

    toast.success('Signed in successfully!');
  };
  return (
    <Card className="w-full max-w-sm">
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
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>

                <Dialog>
                  <DialogTrigger className="hover:text-trip-primary/80 ml-auto inline-block cursor-pointer text-sm underline-offset-4 hover:underline">
                    Forgot your password?
                  </DialogTrigger>
                  <DialogContent>
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
              <Input id="password" type="password" name="password" required />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button
          type="submit"
          className="bg-trip-primary hover:bg-trip-primary/70 w-full cursor-pointer"
          form="sign-in-form"
        >
          Sign In
        </Button>
      </CardFooter>
    </Card>
  );
}
