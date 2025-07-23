import { useState, useCallback, useEffect } from 'react';
import { toast } from 'sonner';
import { Bus, BookUser } from 'lucide-react';

import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import APICall from '@/lib/api';
import { getUser } from '@/lib/auth';
import type { UserType } from '@/type';
import OverviewCards from '@/components/Cards';

interface TRIPSummaryType {
  trip_details: {
    route_id: string;
    boarding_time: string;
    arrival_time: string;
    total_passenger: number;
    total_revenue: number;
  };
  tickets: {
    ticket_id: number;
    passenger_category: 'regular' | 'pwd' | 'student' | 'senior';
    fare_amount: string;
    payment_mode: 'cash' | 'online';
  }[];
}

interface ConductorType extends UserType {
  bus_id: string;
  driver_id: string;
  driver_name: string;
}

const Upload = () => {
  const [currentConductor, setCurrentConductor] =
    useState<ConductorType | null>();
  const [tripContent, setTripContent] = useState<TRIPSummaryType | null>(null);
  const [encryptedToken, setEncryptedToken] = useState<string | null>(null);

  const [pageState, setPageState] = useState<'upload' | 'complete'>('upload');

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();

      reader.onload = async (e) => {
        const fileContent = e.target?.result as string;
        setEncryptedToken(fileContent);

        await APICall<TRIPSummaryType>({
          type: 'POST',
          url: '/trip/index.php',
          body: {
            token: fileContent,
          },
          consoleLabel: 'Render File Content: ',
          success: (data) => {
            setTripContent(data);
          },
          error: (error) => {
            throw new Error(error.message || 'Unknown error');
          },
        });
      };

      reader.onerror = (e) => {
        console.error('Error reading file:', e);
      };

      reader.readAsText(file); // reads as plain text (suitable for .enc if it's text-based)
    },
    [setTripContent, setEncryptedToken]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!tripContent || !encryptedToken) {
        throw new Error('Please upload a valid file first.');
      }

      if (!currentConductor) {
        throw new Error('User not found. Please log in again.');
      }

      await APICall({
        type: 'POST',
        url: '/trip/index.php',
        body: {
          conductor_id: currentConductor.user_id,
          token: encryptedToken,
        },
        consoleLabel: 'Upload Trip:',
        success: () => {
          setTripContent(null);
          setEncryptedToken(null);

          setPageState('complete');
        },
        error: (error) => {
          throw new Error(error.message || 'Unknown error');
        },
      });
    },
    [
      tripContent,
      encryptedToken,
      setTripContent,
      setEncryptedToken,
      setPageState,
      currentConductor,
    ]
  );

  useEffect(() => {
    const fetchCurrentConductor = async () => {
      const user = await getUser();
      if (user) {
        setCurrentConductor(user as ConductorType);
      } else {
        toast.error('User not found. Please log in again.');
      }
    };
    fetchCurrentConductor();
  }, []);

  if (!currentConductor) {
    return (
      <div className="flex min-h-screen min-w-screen items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!currentConductor.bus_id || !currentConductor.driver_name) {
    return (
      <p className="text-gray-600">
        You have not been assigned a bus or driver yet. Please contact bus
        company operator for assistance.
      </p>
    );
  }

  return (
    <>
      {pageState === 'upload' ? (
        <>
          <div className="flex w-full flex-col items-center justify-start gap-4 md:flex-row">
            <OverviewCards
              card={{
                title: 'Assigned Bus',
                icon: Bus,
                value: currentConductor.bus_id || 'Loading...',
                subtitle: 'This is the bus assigned to you.',
              }}
            />
            <OverviewCards
              card={{
                title: 'Assigned Driver',
                icon: BookUser,
                value: currentConductor.driver_name || 'Loading...',
                subtitle: 'Please ensure to coordinate with them.',
              }}
            />
          </div>
          <hr />
          <h1 className="my-2 text-2xl font-bold">Upload</h1>
          <p className="mb-4 text-gray-600">
            Greetings Conductors! Please upload your files using the form below.
          </p>
          <hr />
          <form
            onSubmit={(e) =>
              toast.promise(handleSubmit(e), {
                loading: 'Loading...',
                success: 'Trip uploaded successfully!',
                error: (err) => err.message,
              })
            }
            className="mt-4 space-y-4"
          >
            <Input
              id="files"
              type="file"
              accept=".enc"
              className="bg-neutral w-full border-1 border-gray-200 px-4"
              onChange={handleFileChange}
              required
            />

            <Card className="h-[500px] overflow-y-auto p-4 text-sm md:p-8 md:text-base">
              <pre className="whitespace-pre-wrap">
                {tripContent && (
                  <code>{JSON.stringify(tripContent, null, 2)}</code>
                )}
              </pre>
            </Card>
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </>
      ) : (
        <div className="mt-4 space-y-4">
          <h2 className="text-xl font-semibold">Upload Complete!</h2>
          <p className="text-gray-600">
            Your trip has been successfully uploaded. Thank you for your
            service!
          </p>
          <Button onClick={() => setPageState('upload')} className="w-full">
            Upload Another Trip
          </Button>
        </div>
      )}
    </>
  );
};

export default Upload;
