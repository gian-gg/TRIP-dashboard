import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { getInitials } from '@/lib/misc';
import DriverModal from './view';
import DriverEdit from './edit';
import type { DriverInformationType, BusInformationType } from '../../type';

export function DriverTable({
  drivers,
  buses,
  refreshData,
}: {
  drivers: DriverInformationType[];
  buses: BusInformationType[];
  refreshData: () => void;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedDriver, setSelectedDriver] =
    useState<DriverInformationType | null>(null);
  const getStatusBadge = (status: DriverInformationType['status']) => {
    return (
      <Badge
        variant={status === 'active' ? 'default' : 'secondary'}
        className="capitalize"
      >
        {status}
      </Badge>
    );
  };

  return (
    <>
      <DriverModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        selectedDriver={selectedDriver}
        setIsEditModalOpen={setIsEditModalOpen}
        refreshData={refreshData}
      />

      {selectedDriver && (
        <DriverEdit
          isOpen={isEditModalOpen}
          setIsOpen={setIsEditModalOpen}
          currentDriverData={selectedDriver}
          currentBusData={buses}
          refreshData={refreshData}
        />
      )}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Driver</TableHead>
              <TableHead>License Number</TableHead>
              <TableHead>Contact Number</TableHead>
              <TableHead>Bus ID</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {drivers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No drivers found.
                </TableCell>
              </TableRow>
            ) : (
              drivers.map((driver) => (
                <TableRow
                  key={driver.driver_id}
                  className="cursor-pointer"
                  onClick={() => {
                    setSelectedDriver(driver);
                    setIsModalOpen(true);
                  }}
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="bg-muted flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold">
                        {getInitials(driver.full_name)}
                      </div>
                      <div>
                        <div className="font-medium">{driver.full_name}</div>
                        <div className="text-muted-foreground text-xs">
                          ID: {driver.driver_id}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{driver.license_number}</TableCell>
                  <TableCell>{driver.contact_number}</TableCell>
                  <TableCell>{driver.bus_id || 'N/A'}</TableCell>
                  <TableCell>{getStatusBadge(driver.status)}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
