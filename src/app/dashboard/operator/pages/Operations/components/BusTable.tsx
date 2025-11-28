import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Eye, Pencil, Trash } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { BusInformationType } from '../type';

interface BusTableProps {
  buses: BusInformationType[];
  onView: (busId: string) => void;
  onEdit: (bus: BusInformationType) => void;
  onDelete: (busId: string) => void;
}

export function BusTable({ buses, onView, onEdit, onDelete }: BusTableProps) {
  const getStatusBadge = (status: BusInformationType['status']) => {
    const variants: Record<
      BusInformationType['status'],
      'default' | 'secondary' | 'destructive' | 'outline'
    > = {
      active: 'default',
      inactive: 'secondary',
      'in maintenance': 'destructive',
      'in transit': 'outline',
    };

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
            <TableHead className="text-right">Actions</TableHead>
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
              <TableRow key={bus.bus_id} className="cursor-pointer">
                <TableCell className="font-medium">{bus.bus_id}</TableCell>
                <TableCell>{bus.route_id || 'N/A'}</TableCell>
                <TableCell>
                  {bus.driver_id ? `ID: ${bus.driver_id}` : 'N/A'}
                </TableCell>
                <TableCell>
                  {bus.conductor_id ? `ID: ${bus.conductor_id}` : 'N/A'}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(bus.status)}
                    {checkMaintenanceStatus(bus.next_maintenance) && (
                      <Badge variant="destructive" className="text-[10px]">
                        Due
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <span
                    className={
                      checkMaintenanceStatus(bus.next_maintenance)
                        ? 'text-destructive font-semibold'
                        : ''
                    }
                  >
                    {bus.next_maintenance || 'N/A'}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onView(bus.bus_id)}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEdit(bus)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onDelete(bus.bus_id)}
                        className="text-destructive"
                      >
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
