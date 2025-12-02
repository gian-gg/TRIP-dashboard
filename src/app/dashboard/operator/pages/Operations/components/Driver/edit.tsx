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
import { handleEditDriver } from '../../utils/edit';

import type { DriverInformationType, BusInformationType } from '../../type';

const DriverEdit = ({
  isOpen,
  setIsOpen,
  currentDriverData,
  currentBusData,
  refreshData,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  currentDriverData: DriverInformationType;
  currentBusData: BusInformationType[];
  refreshData: () => void;
}) => {
  const [editDriver, setEditDriver] =
    useState<DriverInformationType>(currentDriverData);

  useEffect(() => {
    // When the modal opens or the selected driver changes, sync local state
    setEditDriver(currentDriverData);
  }, [currentDriverData, isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{`ID: ${editDriver.driver_id}`}</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Edit the details of the selected driver.
        </DialogDescription>
        <form
          onSubmit={(e) =>
            handleEditDriver(
              e,
              () => {
                refreshData();
                setIsOpen(false);
              },
              currentDriverData
            )
          }
        >
          <Input
            type="hidden"
            id="user_id"
            name="user_id"
            value={editDriver.driver_id}
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
                value={editDriver.full_name}
                onChange={(e) =>
                  setEditDriver({ ...editDriver, full_name: e.target.value })
                }
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
                value={editDriver.license_number}
                onChange={(e) =>
                  setEditDriver({
                    ...editDriver,
                    license_number: e.target.value,
                  })
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
                value={editDriver.contact_number}
                onChange={(e) =>
                  setEditDriver({
                    ...editDriver,
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
                value={editDriver.bus_id || ''}
                onChange={(e) =>
                  setEditDriver({ ...editDriver, bus_id: e.target.value })
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
              <span>Save Driver</span>
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

export default DriverEdit;
