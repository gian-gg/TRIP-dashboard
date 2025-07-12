import { ChevronLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Link } from 'react-router-dom';

export default function notfound() {
  return (
    <div className="bg-trip-primary-light/40 flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-sm bg-white">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-red-500">
            Error 404: Page Not Found
          </CardTitle>
          <CardDescription className="text-xs">
            Requested page does not exist. Please check the URL or return to the
            home page.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button
            className="w-full cursor-pointer bg-red-500 text-white hover:bg-red-500/70"
            asChild
          >
            <Link to="/">
              <ChevronLeft /> Home Page
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
