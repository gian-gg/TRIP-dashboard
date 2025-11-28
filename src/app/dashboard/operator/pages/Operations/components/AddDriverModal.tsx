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
import { handleAddDriver } from '../utils/add';

interface AddDriverModalProps {
  isOpen: boolean;
  onClose: () => void;
  companyId: string;
  onSuccess: () => void;
}

export function AddDriverModal({
  isOpen,
  onClose,
  companyId,
  onSuccess,
}: AddDriverModalProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    handleAddDriver(e, () => {
      onSuccess();
      onClose();
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Driver</DialogTitle>
          <DialogDescription>
            Fill in the details to add a new driver.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input type="hidden" name="company_id" defaultValue={companyId} />
          <div>
            <Label htmlFor="full_name">Full Name *</Label>
            <Input type="text" id="full_name" name="full_name" required />
          </div>
          <div>
            <Label htmlFor="license_number">License Number *</Label>
            <Input
              type="text"
              id="license_number"
              name="license_number"
              required
            />
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
              Add Driver
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
