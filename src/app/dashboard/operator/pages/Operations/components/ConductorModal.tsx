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
import { handleDeleteConductor } from '../utils/delete';
import type { ConductorInformationType } from '../type';

const ConductorModal = ({
  isModalOpen,
  setIsModalOpen,
  setIsEditModalOpen,
  selectedConductor,
  refreshData,
}: {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  setIsEditModalOpen: (open: boolean) => void;
  selectedConductor: ConductorInformationType | null;
  refreshData: () => void;
}) => {
  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="!w-full !max-w-2xl">
        <DialogHeader>
          <DialogTitle>Conductor Details</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Here are the details of the selected conductor.
        </DialogDescription>

        {selectedConductor ? (
          <div className="flex w-full flex-col items-start justify-between">
            {/* Conductor details table */}
            <table className="border-outline w-full rounded-md border-2">
              <thead>
                <tr>
                  <th
                    colSpan={2}
                    className="bg-neutral border-outline border-2 p-2 text-left sm:text-lg md:p-4 md:text-xl"
                  >
                    Current Conductor Information
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                <tr className="border-outline border-b-2">
                  <td className="text-secondary-foreground p-2 text-sm font-semibold md:text-lg">
                    Conductor ID
                  </td>
                  <td className="text-muted-foreground p-2 text-end text-sm md:text-lg">
                    {selectedConductor.conductor_id}
                  </td>
                </tr>
                <tr className="border-outline border-b-2">
                  <td className="text-secondary-foreground p-2 text-sm font-semibold md:text-lg">
                    Name
                  </td>
                  <td className="text-muted-foreground p-2 text-end text-sm md:text-lg">
                    {selectedConductor.name}
                  </td>
                </tr>
                <tr className="border-outline border-b-2">
                  <td className="text-secondary-foreground p-2 text-sm font-semibold md:text-lg">
                    Email
                  </td>
                  <td className="text-muted-foreground p-2 text-end text-sm md:text-lg">
                    {selectedConductor.email}
                  </td>
                </tr>
                <tr className="border-outline border-b-2">
                  <td className="text-secondary-foreground p-2 text-sm font-semibold md:text-lg">
                    Contact Number
                  </td>
                  <td className="text-muted-foreground p-2 text-end text-sm md:text-lg">
                    {selectedConductor.contact_number}
                  </td>
                </tr>
                <tr className="border-outline border-b-2">
                  <td className="text-secondary-foreground p-2 text-sm font-semibold md:text-lg">
                    Bus ID
                  </td>
                  <td className="text-muted-foreground p-2 text-end text-sm md:text-lg">
                    {selectedConductor.bus_id || 'N/A'}
                  </td>
                </tr>
                <tr className="border-outline">
                  <td className="text-secondary-foreground p-2 text-sm font-semibold md:text-lg">
                    Status
                  </td>
                  <td className="text-muted-foreground p-2 text-end text-sm capitalize md:text-lg">
                    <span
                      className={
                        selectedConductor.status === 'active'
                          ? 'font-semibold text-green-400'
                          : 'text-destructive font-semibold'
                      }
                    >
                      {selectedConductor.status.charAt(0).toUpperCase() +
                        selectedConductor.status.slice(1)}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-muted-foreground text-center text-sm md:text-lg">
            No conductor selected.
          </div>
        )}
        <DialogFooter>
          <div className="flex w-full justify-end gap-2">
            <Button
              className="bg-destructive w-1/2 text-white hover:bg-red-700 md:w-fit"
              onClick={() => {
                if (selectedConductor) {
                  setIsModalOpen(false);
                  handleDeleteConductor(
                    selectedConductor.conductor_id,
                    refreshData
                  );
                }
              }}
            >
              <Trash />
              Delete Conductor
            </Button>
            <Button
              className="w-1/2 md:w-fit"
              onClick={() => {
                if (selectedConductor) {
                  setIsEditModalOpen(true);
                  setIsModalOpen(false);
                }
              }}
            >
              <Pencil />
              Edit Conductor
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConductorModal;
