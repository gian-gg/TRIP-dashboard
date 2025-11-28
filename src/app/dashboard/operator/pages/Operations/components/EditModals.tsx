import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Save } from 'lucide-react';
import {
  handleEditBus,
  handleEditDriver,
  handleEditConductor,
} from '../utils/edit';
import type {
  BusInformationType,
  DriverInformationType,
  ConductorInformationType,
} from '../type';

interface EditBusModalProps {
  isOpen: boolean;
  onClose: () => void;
  bus: BusInformationType;
  onSuccess: () => void;
}

export function EditBusModal({
  isOpen,
  onClose,
  bus,
  onSuccess,
}: EditBusModalProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    handleEditBus(
      e,
      () => {
        onSuccess();
        onClose();
      },
      bus
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Bus</DialogTitle>
          <DialogDescription>Update the details of the bus.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input type="hidden" name="user_id" defaultValue={bus.bus_id} />
          <div>
            <Label htmlFor="edit_bus_id">Bus ID *</Label>
            <Input
              type="text"
              id="edit_bus_id"
              defaultValue={bus.bus_id}
              disabled
            />
          </div>
          <div>
            <Label htmlFor="edit_route_id">Route ID</Label>
            <Input
              type="text"
              id="edit_route_id"
              name="route_id"
              defaultValue={bus.route_id || ''}
            />
          </div>
          <div>
            <Label htmlFor="edit_driver_id">Driver ID</Label>
            <Input
              type="number"
              id="edit_driver_id"
              name="driver_id"
              defaultValue={bus.driver_id || ''}
            />
          </div>
          <div>
            <Label htmlFor="edit_conductor_id">Conductor ID</Label>
            <Input
              type="number"
              id="edit_conductor_id"
              name="conductor_id"
              defaultValue={bus.conductor_id || ''}
            />
          </div>
          <div>
            <Label htmlFor="edit_status">Status *</Label>
            <Select name="status" defaultValue={bus.status} required>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="in maintenance">In Maintenance</SelectItem>
                <SelectItem value="in transit">In Transit</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="edit_next_maintenance">Next Maintenance</Label>
            <Input
              type="date"
              id="edit_next_maintenance"
              name="next_maintenance"
              defaultValue={bus.next_maintenance || ''}
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              <Save className="mr-2 h-4 w-4" />
              Update Bus
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

interface EditDriverModalProps {
  isOpen: boolean;
  onClose: () => void;
  driver: DriverInformationType;
  onSuccess: () => void;
}

export function EditDriverModal({
  isOpen,
  onClose,
  driver,
  onSuccess,
}: EditDriverModalProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    handleEditDriver(
      e,
      () => {
        onSuccess();
        onClose();
      },
      driver
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Driver</DialogTitle>
          <DialogDescription>
            Update the details of the driver.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input type="hidden" name="user_id" defaultValue={driver.driver_id} />
          <div>
            <Label htmlFor="edit_full_name">Full Name *</Label>
            <Input
              type="text"
              id="edit_full_name"
              name="full_name"
              defaultValue={driver.full_name}
              required
            />
          </div>
          <div>
            <Label htmlFor="edit_license_number">License Number *</Label>
            <Input
              type="text"
              id="edit_license_number"
              name="license_number"
              defaultValue={driver.license_number}
              required
            />
          </div>
          <div>
            <Label htmlFor="edit_contact_number">Contact Number *</Label>
            <Input
              type="tel"
              id="edit_contact_number"
              name="contact_number"
              defaultValue={driver.contact_number}
              required
            />
          </div>
          <div>
            <Label htmlFor="edit_bus_id">Bus ID</Label>
            <Input
              type="text"
              id="edit_bus_id"
              name="bus_id"
              defaultValue={driver.bus_id || ''}
            />
          </div>
          <div>
            <Label htmlFor="edit_status">Status *</Label>
            <Select name="status" defaultValue={driver.status} required>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              <Save className="mr-2 h-4 w-4" />
              Update Driver
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

interface EditConductorModalProps {
  isOpen: boolean;
  onClose: () => void;
  conductor: ConductorInformationType;
  onSuccess: () => void;
}

export function EditConductorModal({
  isOpen,
  onClose,
  conductor,
  onSuccess,
}: EditConductorModalProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    handleEditConductor(
      e,
      () => {
        onSuccess();
        onClose();
      },
      conductor
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Conductor</DialogTitle>
          <DialogDescription>
            Update the details of the conductor.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="hidden"
            name="user_id"
            defaultValue={conductor.conductor_id}
          />
          <div>
            <Label htmlFor="edit_name">Name *</Label>
            <Input
              type="text"
              id="edit_name"
              name="name"
              defaultValue={conductor.name}
              required
            />
          </div>
          <div>
            <Label htmlFor="edit_email">Email *</Label>
            <Input
              type="email"
              id="edit_email"
              name="email"
              defaultValue={conductor.email}
              required
            />
          </div>
          <div>
            <Label htmlFor="edit_contact_number">Contact Number *</Label>
            <Input
              type="tel"
              id="edit_contact_number"
              name="contact_number"
              defaultValue={conductor.contact_number}
              required
            />
          </div>
          <div>
            <Label htmlFor="edit_bus_id">Bus ID</Label>
            <Input
              type="text"
              id="edit_bus_id"
              name="bus_id"
              defaultValue={conductor.bus_id || ''}
            />
          </div>
          <div>
            <Label htmlFor="edit_status">Status *</Label>
            <Select name="status" defaultValue={conductor.status} required>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              <Save className="mr-2 h-4 w-4" />
              Update Conductor
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
