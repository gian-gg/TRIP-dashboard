import { useState, useCallback, useEffect } from 'react';
import { toast } from 'sonner';
import {
  Bus,
  BookUser,
  Upload as UploadIcon,
  FileText,
  X,
  Route,
} from 'lucide-react';

import { Card } from '@/components/ui/card';
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
  route_id: string;
  route_name: string;
  driver_id: string;
  driver_name: string;
  driver_contact: string;
}

const Upload = () => {
  const [currentConductor, setCurrentConductor] =
    useState<ConductorType | null>();
  const [tripContent, setTripContent] = useState<TRIPSummaryType | null>(null);
  const [encryptedToken, setEncryptedToken] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const [pageState, setPageState] = useState<'upload' | 'complete'>('upload');

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      if (!file.name.endsWith('.enc')) {
        toast.error('Please upload a .enc file');
        return;
      }

      setFileName(file.name);

      const reader = new FileReader();

      reader.onload = async (e) => {
        const fileContent = e.target?.result as string;
        setEncryptedToken(fileContent);

        try {
          await APICall<TRIPSummaryType>({
            type: 'POST',
            url: '/trip/index.php',
            body: {
              token: fileContent,
            },
            consoleLabel: 'Render File Content: ',
            success: (data) => {
              setTripContent(data);
              toast.success('File loaded successfully!');
            },
            error: (error) => {
              toast.error(error.message || 'Failed to load file');
              setFileName(null);
              setEncryptedToken(null);
            },
          });
        } catch {
          toast.error('Failed to process file');
          setFileName(null);
          setEncryptedToken(null);
        }
      };
      reader.onerror = () => {
        toast.error('Error reading file');
        setFileName(null);
      };

      reader.readAsText(file);
    },
    []
  );

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.enc')) {
      toast.error('Please upload a .enc file');
      return;
    }

    setFileName(file.name);

    const reader = new FileReader();

    reader.onload = async (event) => {
      const fileContent = event.target?.result as string;
      setEncryptedToken(fileContent);

      try {
        await APICall<TRIPSummaryType>({
          type: 'POST',
          url: '/trip/index.php',
          body: {
            token: fileContent,
          },
          consoleLabel: 'Render File Content: ',
          success: (data) => {
            setTripContent(data);
            toast.success('File loaded successfully!');
          },
          error: (error) => {
            toast.error(error.message || 'Failed to load file');
            setFileName(null);
            setEncryptedToken(null);
          },
        });
      } catch {
        toast.error('Failed to process file');
        setFileName(null);
        setEncryptedToken(null);
      }
    };

    reader.onerror = () => {
      toast.error('Error reading file');
      setFileName(null);
    };

    reader.readAsText(file);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleRemoveFile = useCallback(() => {
    setTripContent(null);
    setEncryptedToken(null);
    setFileName(null);
  }, []);

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
          setFileName(null);

          setPageState('complete');
        },
        error: (error) => {
          throw new Error(error.message || 'Unknown error');
        },
      });
    },
    [tripContent, encryptedToken, currentConductor]
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
      <div className="flex min-h-[calc(100vh-12rem)] flex-col items-center justify-center gap-6 p-4 text-center">
        <div className="bg-primary/10 rounded-full p-6">
          <Bus className="text-primary h-16 w-16" />
        </div>
        <div className="max-w-md space-y-3">
          <h2 className="text-2xl font-bold">No Assignment Yet</h2>
          <p className="text-muted-foreground leading-relaxed">
            You have not been assigned a bus or driver yet. Please contact your
            bus company operator for assistance.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {pageState === 'upload' ? (
        <>
          <div className="grid w-full gap-4 md:grid-cols-2 lg:grid-cols-3">
            <OverviewCards
              card={{
                title: 'Assigned Bus',
                icon: Bus,
                value: currentConductor.bus_id || 'Loading...',
                subtitle: 'Your assigned vehicle',
              }}
            />
            <OverviewCards
              card={{
                title: 'Assigned Route',
                icon: Route,
                value: currentConductor.route_id || 'Loading...',
                subtitle: currentConductor.route_name || 'Route information',
              }}
            />
            <OverviewCards
              card={{
                title: 'Assigned Driver',
                icon: BookUser,
                value: currentConductor.driver_name || 'Loading...',
                subtitle: currentConductor.driver_contact
                  ? `📞 0${currentConductor.driver_contact}`
                  : 'No contact available',
              }}
            />
          </div>

          <div className="mt-6 space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">
                Upload Trip Data
              </h1>
              <p className="text-muted-foreground">
                Upload your trip summary file (.enc) to record your journey.
              </p>
            </div>

            <form
              onSubmit={(e) =>
                toast.promise(handleSubmit(e), {
                  loading: 'Uploading trip data...',
                  success: 'Trip uploaded successfully!',
                  error: (err) => err.message,
                })
              }
              className="space-y-6"
            >
              {!tripContent ? (
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  className={`relative rounded-lg border-2 border-dashed p-12 text-center transition-all ${
                    isDragging
                      ? 'border-primary bg-primary/5'
                      : 'border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50'
                  }`}
                >
                  <input
                    id="files"
                    type="file"
                    accept=".enc"
                    className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                    onChange={handleFileChange}
                    required
                  />
                  <div className="flex flex-col items-center gap-4">
                    <div className="bg-primary/10 rounded-full p-4">
                      <UploadIcon className="text-primary h-12 w-12" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-lg font-semibold">
                        {isDragging
                          ? 'Drop your file here'
                          : 'Drag & drop your trip file'}
                      </p>
                      <p className="text-muted-foreground text-sm">
                        or click to browse (.enc files only)
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <Card className="overflow-hidden">
                    <div className="bg-primary/5 flex items-center justify-between border-b px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 rounded-lg p-2">
                          <FileText className="text-primary h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-semibold">{fileName}</p>
                          <p className="text-muted-foreground text-xs">
                            Ready to upload
                          </p>
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={handleRemoveFile}
                        className="hover:bg-destructive/10 hover:text-destructive"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="max-h-[400px] overflow-y-auto p-6">
                      <h4 className="mb-3 text-sm font-semibold">
                        Trip Details
                      </h4>
                      <div className="bg-muted/50 mb-4 grid gap-3 rounded-lg p-4 text-sm md:grid-cols-2">
                        <div>
                          <p className="text-muted-foreground text-xs">
                            Route ID
                          </p>
                          <p className="font-medium">
                            {tripContent.trip_details.route_id}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs">
                            Total Passengers
                          </p>
                          <p className="font-medium">
                            {tripContent.trip_details.total_passenger}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs">
                            Boarding Time
                          </p>
                          <p className="font-medium">
                            {new Date(
                              tripContent.trip_details.boarding_time
                            ).toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs">
                            Arrival Time
                          </p>
                          <p className="font-medium">
                            {new Date(
                              tripContent.trip_details.arrival_time
                            ).toLocaleString()}
                          </p>
                        </div>
                        <div className="md:col-span-2">
                          <p className="text-muted-foreground text-xs">
                            Total Revenue
                          </p>
                          <p className="text-lg font-bold text-green-600">
                            ₱
                            {parseFloat(
                              tripContent.trip_details
                                .total_revenue as unknown as string
                            ).toFixed(2)}
                          </p>
                        </div>
                      </div>
                      <h4 className="mb-3 text-sm font-semibold">
                        Tickets ({tripContent.tickets.length})
                      </h4>
                      <div className="space-y-2">
                        {tripContent.tickets.map((ticket, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between rounded-lg border p-3 text-xs"
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-muted-foreground">
                                #{ticket.ticket_id}
                              </span>
                              <span className="bg-primary/10 rounded-full px-2 py-1 text-xs font-medium capitalize">
                                {ticket.passenger_category}
                              </span>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="bg-muted rounded-full px-2 py-1 text-xs font-medium capitalize">
                                {ticket.payment_mode}
                              </span>
                              <span className="font-semibold">
                                ₱{parseFloat(ticket.fare_amount).toFixed(2)}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                </div>
              )}

              <Button
                type="submit"
                className="h-11 w-full shadow-lg transition-all hover:shadow-xl"
                disabled={!tripContent}
              >
                Submit Trip Data
              </Button>
            </form>
          </div>
        </>
      ) : (
        <div className="flex min-h-[calc(100vh-20rem)] flex-col items-center justify-center gap-6 text-center">
          <div className="rounded-full bg-green-500/10 p-6">
            <svg
              className="h-16 w-16 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <div className="max-w-md space-y-3">
            <h2 className="text-3xl font-bold">Upload Complete!</h2>
            <p className="text-muted-foreground text-lg">
              Your trip has been successfully uploaded. Thank you for your
              service!
            </p>
          </div>
          <Button
            onClick={() => setPageState('upload')}
            className="h-11 shadow-lg"
            size="lg"
          >
            Upload Another Trip
          </Button>
        </div>
      )}
    </>
  );
};

export default Upload;
