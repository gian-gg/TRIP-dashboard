import { useState, useCallback } from 'react';
import { toast } from 'sonner';

import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import APICall from '@/lib/api';
import { getUser } from '@/lib/auth';
import type { UserType } from '@/type';

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

const Upload = () => {
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

      const userResult = await getUser();
      if (!userResult) {
        throw new Error('User not authenticated. Please log in.');
      }
      const user = userResult as UserType;

      await APICall({
        type: 'POST',
        url: '/trip/index.php',
        body: {
          conductor_id: user.user_id,
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
    ]
  );

  return (
    <>
      {pageState === 'upload' ? (
        <>
          {' '}
          <h1 className="mb-2 text-2xl font-bold">Upload</h1>
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
