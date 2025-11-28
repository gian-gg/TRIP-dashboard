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
import { handleAddBus } from '../utils/add';

interface AddBusModalProps {
  isOpen: boolean;
  onClose: () => void;
  companyId: string;
  onSuccess: () => void;
}

export function AddBusModal({
  isOpen,
  onClose,
  companyId,
  onSuccess,
}: AddBusModalProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    handleAddBus(e, () => {
      onSuccess();
      onClose();
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Bus</DialogTitle>
          <DialogDescription>
            Fill in the details to add a new bus.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input type="hidden" name="company_id" defaultValue={companyId} />
          <div>
            <Label htmlFor="bus_id">Bus ID *</Label>
            <Input type="text" id="bus_id" name="bus_id" required />
          </div>
          <div>
            <Label htmlFor="route_id">Route ID</Label>
            <Input type="text" id="route_id" name="route_id" />
          </div>
          <div>
            <Label htmlFor="driver_id">Driver ID</Label>
            <Input type="number" id="driver_id" name="driver_id" />
          </div>
          <div>
            <Label htmlFor="conductor_id">Conductor ID</Label>
            <Input type="number" id="conductor_id" name="conductor_id" />
          </div>
          <div>
            <Label htmlFor="status">Status *</Label>
            <Select name="status" defaultValue="active" required>
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
            <Label htmlFor="next_maintenance">Next Maintenance</Label>
            <Input type="date" id="next_maintenance" name="next_maintenance" />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              <Save className="mr-2 h-4 w-4" />
              Add Bus
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
