import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { getInitials } from '@/lib/misc';
import type {
  BusInformationType,
  DriverInformationType,
  ConductorInformationType,
} from '../type';

interface ViewBusModalProps {
  isOpen: boolean;
  onClose: () => void;
  bus: BusInformationType | null;
}

export function ViewBusModal({ isOpen, onClose, bus }: ViewBusModalProps) {
  if (!bus) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Bus Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label className="text-muted-foreground text-sm">Bus ID</Label>
            <p className="font-medium">{bus.bus_id}</p>
          </div>
          <div>
            <Label className="text-muted-foreground text-sm">Route</Label>
            <p className="font-medium">{bus.route_id || 'N/A'}</p>
          </div>
          <div>
            <Label className="text-muted-foreground text-sm">Driver ID</Label>
            <p className="font-medium">{bus.driver_id || 'N/A'}</p>
          </div>
          <div>
            <Label className="text-muted-foreground text-sm">
              Conductor ID
            </Label>
            <p className="font-medium">{bus.conductor_id || 'N/A'}</p>
          </div>
          <div>
            <Label className="text-muted-foreground text-sm">Status</Label>
            <p className="font-medium capitalize">{bus.status}</p>
          </div>
          <div>
            <Label className="text-muted-foreground text-sm">
              Next Maintenance
            </Label>
            <p className="font-medium">{bus.next_maintenance || 'N/A'}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface ViewDriverModalProps {
  isOpen: boolean;
  onClose: () => void;
  driver: DriverInformationType | null;
}

export function ViewDriverModal({
  isOpen,
  onClose,
  driver,
}: ViewDriverModalProps) {
  if (!driver) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Driver Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="bg-muted flex h-16 w-16 items-center justify-center rounded-full text-lg font-semibold">
              {getInitials(driver.full_name)}
            </div>
            <div>
              <p className="text-lg font-semibold">{driver.full_name}</p>
              <p className="text-muted-foreground text-sm">
                ID: {driver.driver_id}
              </p>
            </div>
          </div>
          <div>
            <Label className="text-muted-foreground text-sm">
              License Number
            </Label>
            <p className="font-medium">{driver.license_number}</p>
          </div>
          <div>
            <Label className="text-muted-foreground text-sm">
              Contact Number
            </Label>
            <p className="font-medium">{driver.contact_number}</p>
          </div>
          <div>
            <Label className="text-muted-foreground text-sm">Bus ID</Label>
            <p className="font-medium">{driver.bus_id || 'N/A'}</p>
          </div>
          <div>
            <Label className="text-muted-foreground text-sm">Status</Label>
            <p className="font-medium capitalize">{driver.status}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface ViewConductorModalProps {
  isOpen: boolean;
  onClose: () => void;
  conductor: ConductorInformationType | null;
}

export function ViewConductorModal({
  isOpen,
  onClose,
  conductor,
}: ViewConductorModalProps) {
  if (!conductor) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Conductor Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="bg-muted flex h-16 w-16 items-center justify-center rounded-full text-lg font-semibold">
              {getInitials(conductor.name)}
            </div>
            <div>
              <p className="text-lg font-semibold">{conductor.name}</p>
              <p className="text-muted-foreground text-sm">
                ID: {conductor.conductor_id}
              </p>
            </div>
          </div>
          <div>
            <Label className="text-muted-foreground text-sm">Email</Label>
            <p className="font-medium">{conductor.email}</p>
          </div>
          <div>
            <Label className="text-muted-foreground text-sm">
              Contact Number
            </Label>
            <p className="font-medium">{conductor.contact_number}</p>
          </div>
          <div>
            <Label className="text-muted-foreground text-sm">Bus ID</Label>
            <p className="font-medium">{conductor.bus_id || 'N/A'}</p>
          </div>
          <div>
            <Label className="text-muted-foreground text-sm">Status</Label>
            <p className="font-medium capitalize">{conductor.status}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
