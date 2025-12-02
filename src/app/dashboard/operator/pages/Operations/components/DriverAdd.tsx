import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';
import { handleAddDriver } from '../utils/add';

const DriverAdd = ({
  isOpen,
  setIsOpen,
  companyId,
  refreshData,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  companyId: string;
  refreshData: () => void;
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Driver</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Enter the details for the new driver.
        </DialogDescription>
        <form
          onSubmit={async (e) => {
            await handleAddDriver(e, () => {
              refreshData();
              setIsOpen(false);
            });
          }}
        >
          <Input
            type="hidden"
            name="company_id"
            value={companyId}
            readOnly
            required
          />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="full_name">Full Name *</Label>
              <Input
                type="text"
                id="full_name"
                name="full_name"
                placeholder="John Doe"
                required
                className="mt-2 border border-gray-400"
              />
            </div>
            <div>
              <Label htmlFor="license_number">License Number *</Label>
              <Input
                type="text"
                id="license_number"
                name="license_number"
                placeholder="DL-123456"
                required
                className="mt-2 border border-gray-400"
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="contact_number">Contact Number *</Label>
              <Input
                type="text"
                id="contact_number"
                name="contact_number"
                placeholder="9123456789"
                required
                className="mt-2 border border-gray-400"
              />
            </div>
          </div>
          <div className="mt-4 flex justify-end gap-3">
            <Button variant="default" className="px-2 md:px-4" type="submit">
              <Plus className="mr-0 md:mr-2" />
              <span>Add Driver</span>
            </Button>
            <Button
              variant="outline"
              className="px-2 md:px-4"
              type="button"
              onClick={() => setIsOpen(false)}
            >
              <span>Cancel</span>
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DriverAdd;
