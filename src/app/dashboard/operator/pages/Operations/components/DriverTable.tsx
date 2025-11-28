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
import { getInitials } from '@/lib/misc';
import type { DriverInformationType } from '../type';

interface DriverTableProps {
  drivers: DriverInformationType[];
  onView: (driverId: number) => void;
  onEdit: (driver: DriverInformationType) => void;
  onDelete: (driverId: number) => void;
}

export function DriverTable({
  drivers,
  onView,
  onEdit,
  onDelete,
}: DriverTableProps) {
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
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Driver</TableHead>
            <TableHead>License Number</TableHead>
            <TableHead>Contact Number</TableHead>
            <TableHead>Bus ID</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {drivers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                No drivers found.
              </TableCell>
            </TableRow>
          ) : (
            drivers.map((driver) => (
              <TableRow key={driver.driver_id} className="cursor-pointer">
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
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => onView(driver.driver_id)}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEdit(driver)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onDelete(driver.driver_id)}
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
