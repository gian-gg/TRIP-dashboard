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
import ConductorModal from './ConductorModal';
import ConductorEdit from './ConductorEdit';
import type { ConductorInformationType, BusInformationType } from '../type';

export function ConductorTable({
  conductors,
  buses,
  refreshData,
}: {
  conductors: ConductorInformationType[];
  buses: BusInformationType[];
  refreshData: () => void;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedConductor, setSelectedConductor] =
    useState<ConductorInformationType | null>(null);
  const getStatusBadge = (status: ConductorInformationType['status']) => {
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
      <ConductorModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        selectedConductor={selectedConductor}
        setIsEditModalOpen={setIsEditModalOpen}
        refreshData={refreshData}
      />

      {selectedConductor && (
        <ConductorEdit
          isOpen={isEditModalOpen}
          setIsOpen={setIsEditModalOpen}
          currentConductorData={selectedConductor}
          currentBusData={buses}
          refreshData={refreshData}
        />
      )}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Conductor</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Contact Number</TableHead>
              <TableHead>Bus ID</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {conductors.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No conductors found.
                </TableCell>
              </TableRow>
            ) : (
              conductors.map((conductor) => (
                <TableRow
                  key={conductor.conductor_id}
                  className="cursor-pointer"
                  onClick={() => {
                    setSelectedConductor(conductor);
                    setIsModalOpen(true);
                  }}
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="bg-muted flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold">
                        {getInitials(conductor.name)}
                      </div>
                      <div>
                        <div className="font-medium">{conductor.name}</div>
                        <div className="text-muted-foreground text-xs">
                          ID: {conductor.conductor_id}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{conductor.email}</TableCell>
                  <TableCell>{conductor.contact_number}</TableCell>
                  <TableCell>{conductor.bus_id || 'N/A'}</TableCell>
                  <TableCell>{getStatusBadge(conductor.status)}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
