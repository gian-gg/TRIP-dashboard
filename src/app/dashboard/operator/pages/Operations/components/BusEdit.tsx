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
import { handleEditBus } from '../utils/edit';

import type {
  BusInformationType,
  ConductorInformationType,
  DriverInformationType,
} from '../type';

const BusEdit = ({
  isOpen,
  setIsOpen,
  currentBusData,
  currentDriverData,
  currentConductorData,
  refreshData,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  currentBusData: BusInformationType;
  currentDriverData: DriverInformationType[];
  currentConductorData: ConductorInformationType[];
  refreshData: () => void;
}) => {
  const [editBus, setEditBus] = useState<BusInformationType>(currentBusData);

  useEffect(() => {
    // When the modal opens or the selected bus changes, sync local state
    setEditBus(currentBusData);
  }, [currentBusData, isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{`ID: ${editBus.bus_id}`}</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Edit the details of the selected bus.
        </DialogDescription>
        <form
          onSubmit={(e) =>
            handleEditBus(
              e,
              () => {
                refreshData();
                setIsOpen(false);
              },
              currentBusData
            )
          }
        >
          <Input
            type="hidden"
            id="bus_id"
            name="user_id"
            value={editBus.bus_id}
            readOnly
            required
          />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="status">Status *</Label>
              <select
                id="status"
                name="status"
                value={editBus.status}
                onChange={(e) => {
                  setEditBus({
                    ...editBus,
                    status: e.target.value as BusInformationType['status'],
                  });
                }}
                className="mt-2 w-full rounded border border-gray-400 p-2"
                required
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div>
              <Label htmlFor="next_maintenance">Next Maintenance *</Label>
              <Input
                type="date"
                id="next_maintenance"
                name="next_maintenance"
                value={editBus.next_maintenance}
                onChange={(e) =>
                  setEditBus({ ...editBus, next_maintenance: e.target.value })
                }
                required
                className="mt-2 border border-gray-400"
              />
            </div>
            {editBus.status === 'active' && (
              <>
                <div>
                  <Label htmlFor="edit_route_id">Route ID *</Label>
                  <select
                    id="edit_route_id"
                    name="route_id"
                    value={String(editBus.route_id ?? '')}
                    onChange={(e) => {
                      const value = e.target.value;
                      setEditBus({
                        ...editBus,
                        route_id: value === '' ? '' : value,
                      } as BusInformationType);
                    }}
                    className="mt-2 w-full rounded border border-gray-400 p-2"
                    required
                  >
                    <option value="">Select Route</option>
                    {[1, 2, 3, 4].map((route) => (
                      <option key={route} value={route}>
                        {route}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="edit_driver_id">Driver ID *</Label>
                  <select
                    id="edit_driver_id"
                    name="driver_id"
                    value={String(editBus.driver_id ?? '')}
                    onChange={(e) => {
                      const value = e.target.value;
                      setEditBus({
                        ...editBus,
                        driver_id: value === '' ? 0 : Number(value),
                      } as BusInformationType);
                    }}
                    className="mt-2 w-full rounded border border-gray-400 p-2"
                    required
                  >
                    <option value="">Select Driver</option>
                    {currentDriverData.map((driver) => (
                      <option key={driver.driver_id} value={driver.driver_id}>
                        {driver.driver_id} - {driver.full_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="edit_conductor_id">Conductor ID *</Label>
                  <select
                    id="edit_conductor_id"
                    name="conductor_id"
                    value={String(editBus.conductor_id ?? '')}
                    onChange={(e) => {
                      const value = e.target.value;
                      setEditBus({
                        ...editBus,
                        conductor_id: value === '' ? 0 : Number(value),
                      } as BusInformationType);
                    }}
                    className="mt-2 w-full rounded border border-gray-400 p-2"
                    required
                  >
                    <option value="">Select Conductor</option>
                    {currentConductorData.map((conductor) => (
                      <option
                        key={conductor.conductor_id}
                        value={conductor.conductor_id}
                      >
                        {conductor.conductor_id} - {conductor.name}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}
          </div>
          <div className="mt-4 flex justify-end gap-3 md:col-span-2">
            <Button variant="default" className="px-2 md:px-4" type="submit">
              <Save className="mr-0 md:mr-2" />
              <span>Save Bus</span>
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

export default BusEdit;
