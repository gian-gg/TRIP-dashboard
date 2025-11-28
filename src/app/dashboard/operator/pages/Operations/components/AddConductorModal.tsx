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
import { handleAddConductor } from '../utils/add';

interface AddConductorModalProps {
  isOpen: boolean;
  onClose: () => void;
  companyId: string;
  onSuccess: () => void;
}

export function AddConductorModal({
  isOpen,
  onClose,
  companyId,
  onSuccess,
}: AddConductorModalProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    handleAddConductor(e, () => {
      onSuccess();
      onClose();
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Conductor</DialogTitle>
          <DialogDescription>
            Fill in the details to add a new conductor.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input type="hidden" name="company_id" defaultValue={companyId} />
          <div>
            <Label htmlFor="name">Name *</Label>
            <Input type="text" id="name" name="name" required />
          </div>
          <div>
            <Label htmlFor="email">Email *</Label>
            <Input type="email" id="email" name="email" required />
          </div>
          <div>
            <Label htmlFor="contact_number">Contact Number *</Label>
            <Input
              type="tel"
              id="contact_number"
              name="contact_number"
              required
            />
          </div>
          <div>
            <Label htmlFor="bus_id">Bus ID</Label>
            <Input type="text" id="bus_id" name="bus_id" />
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
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              <Save className="mr-2 h-4 w-4" />
              Add Conductor
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
