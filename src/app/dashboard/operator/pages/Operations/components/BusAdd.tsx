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
import { handleAddBus } from '../utils/add';

const BusAdd = ({
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
          <DialogTitle>Add New Bus</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Enter the details for the new bus.
        </DialogDescription>
        <form
          onSubmit={async (e) => {
            await handleAddBus(e, () => {
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
          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label htmlFor="bus_id">Bus ID *</Label>
              <Input
                type="text"
                id="bus_id"
                name="bus_id"
                placeholder="e.g., BUS-001"
                required
                className="mt-2 border border-gray-400"
              />
            </div>
          </div>
          <div className="mt-4 flex justify-end gap-3">
            <Button variant="default" className="px-2 md:px-4" type="submit">
              <Plus className="mr-0 md:mr-2" />
              <span>Add Bus</span>
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

export default BusAdd;
