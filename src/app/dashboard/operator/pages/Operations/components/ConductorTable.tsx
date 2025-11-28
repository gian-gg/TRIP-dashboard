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
import type { ConductorInformationType } from '../type';

interface ConductorTableProps {
  conductors: ConductorInformationType[];
  onView: (conductorId: number) => void;
  onEdit: (conductor: ConductorInformationType) => void;
  onDelete: (conductorId: number) => void;
}

export function ConductorTable({
  conductors,
  onView,
  onEdit,
  onDelete,
}: ConductorTableProps) {
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
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Conductor</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact Number</TableHead>
            <TableHead>Bus ID</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {conductors.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                No conductors found.
              </TableCell>
            </TableRow>
          ) : (
            conductors.map((conductor) => (
              <TableRow key={conductor.conductor_id} className="cursor-pointer">
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
                        onClick={() => onView(conductor.conductor_id)}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEdit(conductor)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onDelete(conductor.conductor_id)}
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
