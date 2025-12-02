import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Pencil, Trash } from 'lucide-react';
import { handleDeleteDriver } from '../../utils/delete';
import type { DriverInformationType } from '../../type';

const DriverModal = ({
  isModalOpen,
  setIsModalOpen,
  setIsEditModalOpen,
  selectedDriver,
  refreshData,
}: {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  setIsEditModalOpen: (open: boolean) => void;
  selectedDriver: DriverInformationType | null;
  refreshData: () => void;
}) => {
  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="!w-full !max-w-2xl">
        <DialogHeader>
          <DialogTitle>Driver Details</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Here are the details of the selected driver.
        </DialogDescription>

        {selectedDriver ? (
          <div className="flex w-full flex-col items-start justify-between">
            {/* Driver details table */}
            <table className="border-outline w-full rounded-md border-2">
              <thead>
                <tr>
                  <th
                    colSpan={2}
                    className="bg-neutral border-outline border-2 p-2 text-left sm:text-lg md:p-4 md:text-xl"
                  >
                    Current Driver Information
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                <tr className="border-outline border-b-2">
                  <td className="text-secondary-foreground p-2 text-sm font-semibold md:text-lg">
                    Driver ID
                  </td>
                  <td className="text-muted-foreground p-2 text-end text-sm md:text-lg">
                    {selectedDriver.driver_id}
                  </td>
                </tr>
                <tr className="border-outline border-b-2">
                  <td className="text-secondary-foreground p-2 text-sm font-semibold md:text-lg">
                    Full Name
                  </td>
                  <td className="text-muted-foreground p-2 text-end text-sm md:text-lg">
                    {selectedDriver.full_name}
                  </td>
                </tr>
                <tr className="border-outline border-b-2">
                  <td className="text-secondary-foreground p-2 text-sm font-semibold md:text-lg">
                    License Number
                  </td>
                  <td className="text-muted-foreground p-2 text-end text-sm md:text-lg">
                    {selectedDriver.license_number}
                  </td>
                </tr>
                <tr className="border-outline border-b-2">
                  <td className="text-secondary-foreground p-2 text-sm font-semibold md:text-lg">
                    Contact Number
                  </td>
                  <td className="text-muted-foreground p-2 text-end text-sm md:text-lg">
                    {selectedDriver.contact_number}
                  </td>
                </tr>
                <tr className="border-outline border-b-2">
                  <td className="text-secondary-foreground p-2 text-sm font-semibold md:text-lg">
                    Bus ID
                  </td>
                  <td className="text-muted-foreground p-2 text-end text-sm md:text-lg">
                    {selectedDriver.bus_id || 'N/A'}
                  </td>
                </tr>
                <tr className="border-outline">
                  <td className="text-secondary-foreground p-2 text-sm font-semibold md:text-lg">
                    Status
                  </td>
                  <td className="text-muted-foreground p-2 text-end text-sm capitalize md:text-lg">
                    <span
                      className={
                        selectedDriver.status === 'active'
                          ? 'font-semibold text-green-400'
                          : 'text-destructive font-semibold'
                      }
                    >
                      {selectedDriver.status.charAt(0).toUpperCase() +
                        selectedDriver.status.slice(1)}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-muted-foreground text-center text-sm md:text-lg">
            No driver selected.
          </div>
        )}
        <DialogFooter>
          <div className="flex w-full justify-end gap-2">
            <Button
              className="bg-destructive w-1/2 text-white hover:bg-red-700 md:w-fit"
              onClick={() => {
                if (selectedDriver) {
                  setIsModalOpen(false);
                  handleDeleteDriver(selectedDriver.driver_id, refreshData);
                }
              }}
            >
              <Trash />
              Delete Driver
            </Button>
            <Button
              className="w-1/2 md:w-fit"
              onClick={() => {
                if (selectedDriver) {
                  setIsEditModalOpen(true);
                  setIsModalOpen(false);
                }
              }}
            >
              <Pencil />
              Edit Driver
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DriverModal;
