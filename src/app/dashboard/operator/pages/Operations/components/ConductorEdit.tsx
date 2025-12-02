import { useState, useEffect } from 'react';
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
import { Save } from 'lucide-react';
import { handleEditConductor } from '../utils/edit';

import type { ConductorInformationType, BusInformationType } from '../type';

const ConductorEdit = ({
  isOpen,
  setIsOpen,
  currentConductorData,
  currentBusData,
  refreshData,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  currentConductorData: ConductorInformationType;
  currentBusData: BusInformationType[];
  refreshData: () => void;
}) => {
  const [editConductor, setEditConductor] =
    useState<ConductorInformationType>(currentConductorData);

  useEffect(() => {
    // When the modal opens or the selected conductor changes, sync local state
    setEditConductor(currentConductorData);
  }, [currentConductorData, isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{`ID: ${editConductor.conductor_id}`}</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Edit the details of the selected conductor.
        </DialogDescription>
        <form
          onSubmit={(e) =>
            handleEditConductor(
              e,
              () => {
                refreshData();
                setIsOpen(false);
              },
              currentConductorData
            )
          }
        >
          <Input
            type="hidden"
            id="user_id"
            name="user_id"
            value={editConductor.conductor_id}
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
                value={editConductor.name}
                onChange={(e) =>
                  setEditConductor({ ...editConductor, name: e.target.value })
                }
                required
                className="mt-2 border border-gray-400"
              />
            </div>
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={editConductor.email}
                onChange={(e) =>
                  setEditConductor({ ...editConductor, email: e.target.value })
                }
                required
                className="mt-2 border border-gray-400"
              />
            </div>
            <div>
              <Label htmlFor="contact_number">Contact Number *</Label>
              <Input
                type="text"
                id="contact_number"
                name="contact_number"
                value={editConductor.contact_number}
                onChange={(e) =>
                  setEditConductor({
                    ...editConductor,
                    contact_number: e.target.value,
                  })
                }
                required
                className="mt-2 border border-gray-400"
              />
            </div>
            <div>
              <Label htmlFor="bus_id">Bus ID</Label>
              <select
                id="bus_id"
                name="bus_id"
                value={editConductor.bus_id || ''}
                onChange={(e) =>
                  setEditConductor({ ...editConductor, bus_id: e.target.value })
                }
                className="mt-2 w-full rounded border border-gray-400 p-2"
              >
                <option value="">No Bus Assigned</option>
                {currentBusData.map((bus) => (
                  <option key={bus.bus_id} value={bus.bus_id}>
                    {bus.bus_id}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-4 flex justify-end gap-3 md:col-span-2">
            <Button variant="default" className="px-2 md:px-4" type="submit">
              <Save className="mr-0 md:mr-2" />
              <span>Save Conductor</span>
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

export default ConductorEdit;
