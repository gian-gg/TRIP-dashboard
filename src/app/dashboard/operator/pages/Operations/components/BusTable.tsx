import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import BusModal from './BusModal';
import BusEdit from './BusEdit';

import type {
  BusInformationType,
  ConductorInformationType,
  DriverInformationType,
} from '../type';

export function BusTable({
  buses,
  drivers,
  conductors,
  refreshData,
}: {
  buses: BusInformationType[];
  drivers: DriverInformationType[];
  conductors: ConductorInformationType[];
  refreshData: () => void;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedBus, setSelectedBus] = useState<BusInformationType | null>(
    null
  );

  const getStatusBadge = (status: BusInformationType['status']) => {
    const variants: Record<
      BusInformationType['status'],
      'default' | 'secondary' | 'destructive' | 'outline'
    > = {
      active: 'default',
      inactive: 'secondary',
      'in maintenance': 'destructive',
    };

    console.log(status);

    return (
      <Badge variant={variants[status]} className="capitalize">
        {status}
      </Badge>
    );
  };

  const checkMaintenanceStatus = (nextMaintenance: string) => {
    if (!nextMaintenance) return false;
    return new Date(nextMaintenance) < new Date();
  };

  return (
    <>
      <BusModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        selectedBus={selectedBus}
        currentDriverData={drivers}
        currentConductorData={conductors}
        setIsEditModalOpen={setIsEditModalOpen}
        refreshData={refreshData}
      />

      {selectedBus && (
        <BusEdit
          isOpen={isEditModalOpen}
          setIsOpen={setIsEditModalOpen}
          currentBusData={selectedBus}
          currentDriverData={drivers}
          currentConductorData={conductors}
          refreshData={refreshData}
        />
      )}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Bus ID</TableHead>
              <TableHead>Route</TableHead>
              <TableHead>Driver</TableHead>
              <TableHead>Conductor</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Next Maintenance</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {buses.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No buses found.
                </TableCell>
              </TableRow>
            ) : (
              buses.map((bus) => (
                <TableRow
                  key={bus.bus_id}
                  className="cursor-pointer"
                  onClick={() => {
                    setSelectedBus(bus);
                    setIsModalOpen(true);
                  }}
                >
                  <TableCell className="font-medium">{bus.bus_id}</TableCell>
                  <TableCell>{bus.route_id || '---'}</TableCell>
                  <TableCell>
                    {bus.driver_id
                      ? drivers.find(
                          (driver) => driver.driver_id === bus.driver_id
                        )?.full_name
                      : '---'}
                  </TableCell>
                  <TableCell>
                    {bus.conductor_id
                      ? conductors.find(
                          (conductor) =>
                            conductor.conductor_id === bus.conductor_id
                        )?.name
                      : '---'}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(bus.status)}
                    </div>
                  </TableCell>
                  <TableCell className="space-x-2">
                    {checkMaintenanceStatus(bus.next_maintenance) && (
                      <Badge variant="destructive" className="text-[10px]">
                        Due
                      </Badge>
                    )}
                    <span
                      className={
                        checkMaintenanceStatus(bus.next_maintenance)
                          ? 'text-destructive font-semibold'
                          : ''
                      }
                    >
                      {bus.next_maintenance || '---'}
                    </span>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
