import { useState, useEffect } from 'react';
import { toast } from 'sonner';

import { LoaderCircle } from 'lucide-react';

import FleetStatus from './operations';
import type {
  BusInformationType,
  DriverInformationType,
  ConductorInformationType,
} from './type';

import useAuthorized from '@/hooks/use-authorized';

import APICall from '@/lib/api';

const Operations = () => {
  const { user, loading } = useAuthorized();

  const [busData, setBusData] = useState<BusInformationType[]>();
  const [driverData, setDriverData] = useState<DriverInformationType[]>();
  const [conductorData, setConductorData] =
    useState<ConductorInformationType[]>();

  const fetchAllData = async () => {
    const fetchBusData = async () => {
      await APICall<BusInformationType[]>({
        type: 'GET',
        url: '/bus/index.php',
        consoleLabel: 'Fetching Bus Data: ',
        success: (data) => {
          setBusData(data);
        },
        error: (error) => {
          toast.error(error.message);
        },
      });
    };
    const fetchDriverData = async () => {
      await APICall<DriverInformationType[]>({
        type: 'GET',
        url: '/driver/index.php',
        consoleLabel: 'Fetching Driver Data: ',
        success: (data) => {
          setDriverData(data);
        },
        error: (error) => {
          toast.error(error.message);
        },
      });
    };
    const fetchConductorData = async () => {
      await APICall<ConductorInformationType[]>({
        type: 'GET',
        url: '/conductor/index.php',
        consoleLabel: 'Fetching Conductor Data: ',
        success: (data) => {
          setConductorData(data);
        },
        error: (error) => {
          toast.error(error.message);
        },
      });
    };
    fetchBusData();
    fetchDriverData();
    fetchConductorData();
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  if (loading || !user) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <LoaderCircle className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-xl font-bold">Operations</h1>
      <p className="text-muted-foreground text-xs md:text-sm">
        This page provides an overview of the fleet status, including buses,
        drivers, and conductors.
      </p>
      <FleetStatus
        userData={user}
        currentBusData={busData || []}
        currentDriverData={driverData || []}
        currentConductorData={conductorData || []}
        refreshData={fetchAllData}
      />
    </div>
  );
};

export default Operations;
