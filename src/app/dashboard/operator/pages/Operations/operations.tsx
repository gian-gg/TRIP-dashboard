import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import BusInformationCard from './components/BusInformationCard';
import DriverInformationCard from './components/DriverInformationCard';
import ConductorInformationCard from './components/ConductorInformationCard';
import type {
  BusInformationType,
  DriverInformationType,
  ConductorInformationType,
} from './type';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Plus,
  Save,
  Laugh,
  Frown,
  Wrench,
  Search,
  ChevronDown,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Cards from '@/components/Cards';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

import { getInitials } from '@/lib/misc';

const FleetStatus = (props: {
  currentBusData: BusInformationType[];
  currentDriverData: DriverInformationType[];
  currentConductorData: ConductorInformationType[];
}) => {
  const { currentBusData, currentDriverData, currentConductorData } = props;

  const [currentTab, setCurrentTab] = useState<'bus' | 'driver' | 'conductor'>(
    'bus'
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedBusId, setSelectedBusId] = useState<number | null>(null);
  const [selectedDriverId, setSelectedDriverId] = useState<number | null>(null);
  const [selectedConductorId, setSelectedConductorId] = useState<number | null>(
    null
  );
  const [isDriverModalOpen, setIsDriverModalOpen] = useState(false);
  const [isConductorModalOpen, setIsConductorModalOpen] = useState(false);
  const selectedBus =
    selectedBusId !== null
      ? currentBusData.find((bus) => bus.bus_id === selectedBusId)
      : null;
  const selectedDriver =
    selectedDriverId !== null
      ? currentDriverData.find(
          (driver) => driver.driver_id === selectedDriverId
        )
      : null;
  const selectedConductor =
    selectedConductorId !== null
      ? currentConductorData.find(
          (conductor) => conductor.conductor_id === selectedConductorId
        )
      : null;
  const [searchInput, setSearchInput] = useState('');
  const [filteredBusData, setFilteredBusData] =
    useState<BusInformationType[]>(currentBusData);
  const [filteredDriverData, setFilteredDriverData] =
    useState<DriverInformationType[]>(currentDriverData);
  const [filteredConductorData, setFilteredConductorData] =
    useState<ConductorInformationType[]>(currentConductorData);
  const [busStatusFilter, setBusStatusFilter] = useState('');
  const [driverStatusFilter, setDriverStatusFilter] = useState('all');
  const [conductorStatusFilter, setConductorStatusFilter] = useState('all');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editBus, setEditBus] = useState<BusInformationType | null>(null);
  const [editDriver, setEditDriver] = useState<DriverInformationType | null>(
    null
  );
  const [editConductor, setEditConductor] =
    useState<ConductorInformationType | null>(null);

  useEffect(() => {
    if (currentTab === 'bus') {
      let busData = currentBusData;
      if (busStatusFilter && busStatusFilter !== 'all') {
        busData = busData.filter((bus) => bus.status === busStatusFilter);
      }
      if (searchInput !== '') {
        const searchNumber = Number(searchInput);
        busData = busData.filter((bus) => bus.bus_id === searchNumber);
      }
      setFilteredBusData(busData);
    } else if (currentTab === 'driver') {
      let driverData = currentDriverData;
      if (driverStatusFilter && driverStatusFilter !== 'all') {
        driverData = driverData.filter(
          (driver) => driver.status === driverStatusFilter
        );
      }
      setFilteredDriverData(
        driverData.filter(
          (driver) =>
            driver.driver_id.toString().includes(searchInput) ||
            driver.full_name.toLowerCase().includes(searchInput.toLowerCase())
        )
      );
    } else if (currentTab === 'conductor') {
      let conductorData = currentConductorData;
      if (conductorStatusFilter && conductorStatusFilter !== 'all') {
        conductorData = conductorData.filter(
          (conductor) => conductor.status === conductorStatusFilter
        );
      }
      setFilteredConductorData(
        conductorData.filter(
          (conductor) =>
            conductor.conductor_id.toString().includes(searchInput) ||
            conductor.name.toLowerCase().includes(searchInput.toLowerCase())
        )
      );
    }
  }, [
    currentBusData,
    currentDriverData,
    currentConductorData,
    searchInput,
    busStatusFilter,
    currentTab,
    driverStatusFilter,
    conductorStatusFilter,
  ]);

  return (
    <>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Bus Details</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Here are the details of the selected bus.
          </DialogDescription>

          {selectedBus ? (
            <table className="border-outline w-full rounded-md border-2">
              <thead>
                <tr>
                  <th
                    colSpan={2}
                    className="bg-neutral border-outline border-2 p-2 text-left text-black sm:text-lg md:p-4 md:text-xl"
                  >
                    Bus Information
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                <tr className="border-outline border-b-2">
                  <td className="text-secondary-foreground p-2 text-sm font-semibold md:text-lg">
                    Bus ID
                  </td>
                  <td className="text-muted-foreground p-2 text-end text-sm md:text-lg">
                    {selectedBus.bus_id}
                  </td>
                </tr>
                <tr className="border-outline border-b-2">
                  <td className="text-secondary-foreground p-2 text-sm font-semibold md:text-lg">
                    Route
                  </td>
                  <td className="text-muted-foreground p-2 text-end text-sm md:text-lg">
                    {selectedBus.route_id}
                  </td>
                </tr>
                <tr className="border-outline border-b-2">
                  <td className="text-secondary-foreground p-2 text-sm font-semibold md:text-lg">
                    Driver
                  </td>
                  <td className="text-muted-foreground p-2 text-end text-sm md:text-lg">
                    {selectedBus.driver_id}
                  </td>
                </tr>
                <tr className="border-outline border-b-2">
                  <td className="text-secondary-foreground p-2 text-sm font-semibold md:text-lg">
                    Conductor
                  </td>
                  <td className="text-muted-foreground p-2 text-end text-sm md:text-lg">
                    {selectedBus.conductor_id}
                  </td>
                </tr>
                <tr className="border-outline border-b-2">
                  <td className="text-secondary-foreground p-2 text-sm font-semibold md:text-lg">
                    Status
                  </td>
                  <td className="text-muted-foreground p-2 text-end text-sm capitalize md:text-lg">
                    <span
                      className={
                        selectedBus.status === 'active'
                          ? 'font-semibold text-green-600'
                          : selectedBus.status === 'inactive'
                            ? 'font-semibold text-red-600'
                            : selectedBus.status === 'in maintenance'
                              ? 'font-semibold text-yellow-500'
                              : ''
                      }
                    >
                      {selectedBus.status.charAt(0).toUpperCase() +
                        selectedBus.status.slice(1)}
                    </span>
                  </td>
                </tr>
                <tr className="border-outline">
                  <td className="text-secondary-foreground p-2 text-sm font-semibold md:text-lg">
                    Next Maintenance
                  </td>
                  <td className="text-muted-foreground p-2 text-end text-sm md:text-lg">
                    {selectedBus.next_maintenance}
                  </td>
                </tr>
              </tbody>
            </table>
          ) : (
            <div className="text-muted-foreground text-center text-sm md:text-lg">
              No bus selected.
            </div>
          )}
          <DialogFooter>
            <Button
              variant="default"
              className="w-full"
              onClick={() => {
                if (selectedBus) {
                  setEditBus(selectedBus);
                  setIsEditModalOpen(true);
                  setIsModalOpen(false);
                }
              }}
            >
              Edit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Add {currentTab.charAt(0).toUpperCase() + currentTab.slice(1)}
            </DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Fill in the details to add a new {currentTab}.
          </DialogDescription>

          {currentTab === 'bus' && (
            <form className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="bus_id">Bus ID</Label>
                <Input
                  type="number"
                  id="bus_id"
                  name="bus_id"
                  required
                  className="mt-2 border border-gray-400"
                />
              </div>
              <div>
                <Label htmlFor="route_id">Route ID</Label>
                <select
                  id="route_id"
                  name="route_id"
                  required
                  className="mt-2 w-full rounded border border-gray-400 p-2"
                >
                  <option value="">Select Route</option>
                  {Array.from(
                    new Set(currentBusData.map((bus) => bus.route_id))
                  ).map((route) => (
                    <option key={route} value={route}>
                      {route}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="driver_id">Driver ID</Label>
                <select
                  id="driver_id"
                  name="driver_id"
                  required
                  className="mt-2 w-full rounded border border-gray-400 p-2"
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
                <Label htmlFor="conductor_id">Conductor ID</Label>
                <select
                  id="conductor_id"
                  name="conductor_id"
                  required
                  className="mt-2 w-full rounded border border-gray-400 p-2"
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
              <div>
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  name="status"
                  className="mt-2 w-full rounded border border-gray-400 p-2"
                  required
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="in maintenance">In Maintenance</option>
                </select>
              </div>
              <div>
                <Label htmlFor="next_maintenance">Next Maintenance</Label>
                <Input
                  type="date"
                  id="next_maintenance"
                  name="next_maintenance"
                  required
                  className="mt-2 border border-gray-400"
                />
              </div>
              <div className="mt-4 flex justify-end gap-3 md:col-span-2">
                <Button
                  variant="default"
                  className="px-2 md:px-4"
                  type="submit"
                >
                  <Save className="mr-0 md:mr-2" />
                  <span>Save Bus</span>
                </Button>
                <Button
                  variant="default"
                  className="px-2 md:px-4"
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                >
                  <span>Cancel</span>
                </Button>
              </div>
            </form>
          )}
          {currentTab === 'driver' && (
            <form className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="driver_id">Driver ID</Label>
                <Input
                  type="number"
                  id="driver_id"
                  name="driver_id"
                  required
                  className="mt-2 border border-gray-400"
                />
              </div>
              <div>
                <Label htmlFor="full_name">Full Name</Label>
                <Input
                  type="text"
                  id="full_name"
                  name="full_name"
                  required
                  className="mt-2 border border-gray-400"
                />
              </div>
              <div>
                <Label htmlFor="license_number">License Number</Label>
                <Input
                  type="text"
                  id="license_number"
                  name="license_number"
                  required
                  className="mt-2 border border-gray-400"
                />
              </div>
              <div>
                <Label htmlFor="contact_number">Contact Number</Label>
                <Input
                  type="tel"
                  id="contact_number"
                  name="contact_number"
                  pattern="[0-9]+"
                  inputMode="numeric"
                  required
                  className="mt-2 border border-gray-400"
                />
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  name="status"
                  className="mt-2 w-full rounded border border-gray-400 p-2"
                  required
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div>
                <Label htmlFor="bus_id">Bus ID</Label>
                <Input
                  type="number"
                  id="bus_id"
                  name="bus_id"
                  className="mt-2 border border-gray-400"
                />
              </div>
              <div className="mt-4 flex justify-end gap-3 md:col-span-2">
                <Button
                  variant="default"
                  className="px-2 md:px-4"
                  type="submit"
                >
                  <Save className="mr-0 md:mr-2" />
                  <span>Save Driver</span>
                </Button>
                <Button
                  variant="default"
                  className="px-2 md:px-4"
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                >
                  <span>Cancel</span>
                </Button>
              </div>
            </form>
          )}
          {currentTab === 'conductor' && (
            <form className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="conductor_id">Conductor ID</Label>
                <Input
                  type="number"
                  id="conductor_id"
                  name="conductor_id"
                  required
                  className="mt-2 border border-gray-400"
                />
              </div>
              <div>
                <Label htmlFor="full_name">Full Name</Label>
                <Input
                  type="text"
                  id="full_name"
                  name="full_name"
                  required
                  className="mt-2 border border-gray-400"
                />
              </div>
              <div>
                <Label htmlFor="contact_number">Contact Number</Label>
                <Input
                  type="tel"
                  id="contact_number"
                  name="contact_number"
                  pattern="[0-9]+"
                  inputMode="numeric"
                  required
                  className="mt-2 border border-gray-400"
                />
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  name="status"
                  className="mt-2 w-full rounded border border-gray-400 p-2"
                  required
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div>
                <Label htmlFor="bus_id">Bus ID</Label>
                <Input
                  type="number"
                  id="bus_id"
                  name="bus_id"
                  className="mt-2 border border-gray-400"
                />
              </div>
              <div className="mt-4 flex justify-end gap-3 md:col-span-2">
                <Button
                  variant="default"
                  className="px-2 md:px-4"
                  type="submit"
                >
                  <Save className="mr-0 md:mr-2" />
                  <span>Save Conductor</span>
                </Button>
                <Button
                  variant="default"
                  className="px-2 md:px-4"
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                >
                  <span>Cancel</span>
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {`Edit ${currentTab} `}
              {currentTab === 'bus' && editBus && `(ID: ${editBus.bus_id})`}
              {currentTab === 'driver' &&
                editDriver &&
                `(ID: ${editDriver.driver_id})`}
              {currentTab === 'conductor' &&
                editConductor &&
                `(ID: ${editConductor.conductor_id})`}
            </DialogTitle>
          </DialogHeader>
          <DialogDescription>
            {currentTab === 'bus' &&
              editBus &&
              'Edit the details of the selected bus.'}
            {currentTab === 'driver' &&
              editDriver &&
              'Edit the details of the selected driver.'}
            {currentTab === 'conductor' &&
              editConductor &&
              'Edit the details of the selected conductor.'}
          </DialogDescription>
          {currentTab === 'bus' && editBus && (
            <form className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="edit_route_id">Route ID</Label>
                <select
                  id="edit_route_id"
                  name="route_id"
                  value={editBus.route_id}
                  onChange={(e) =>
                    setEditBus({ ...editBus, route_id: e.target.value })
                  }
                  required
                  className="mt-2 w-full rounded border border-gray-400 p-2"
                >
                  <option value="">Select Route</option>
                  {Array.from(
                    new Set(currentBusData.map((bus) => bus.route_id))
                  ).map((route) => (
                    <option key={route} value={route}>
                      {route}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="edit_driver_id">Driver ID</Label>
                <select
                  id="edit_driver_id"
                  name="driver_id"
                  value={editBus.driver_id}
                  onChange={(e) =>
                    setEditBus({
                      ...editBus,
                      driver_id: Number(e.target.value),
                    })
                  }
                  required
                  className="mt-2 w-full rounded border border-gray-400 p-2"
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
                <Label htmlFor="edit_conductor_id">Conductor ID</Label>
                <select
                  id="edit_conductor_id"
                  name="conductor_id"
                  value={editBus.conductor_id}
                  onChange={(e) =>
                    setEditBus({
                      ...editBus,
                      conductor_id: Number(e.target.value),
                    })
                  }
                  required
                  className="mt-2 w-full rounded border border-gray-400 p-2"
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
              <div>
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  name="status"
                  value={editBus.status}
                  onChange={(e) =>
                    setEditBus({
                      ...editBus,
                      status: e.target.value as BusInformationType['status'],
                    })
                  }
                  className="mt-2 w-full rounded border border-gray-400 p-2"
                  required
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="in maintenance">In Maintenance</option>
                </select>
              </div>
              <div>
                <Label htmlFor="next_maintenance">Next Maintenance</Label>
                <Input
                  type="date"
                  id="next_maintenance"
                  name="next_maintenance"
                  value={editBus.next_maintenance}
                  onChange={(e) =>
                    setEditBus({
                      ...editBus,
                      next_maintenance: e.target.value,
                    })
                  }
                  required
                  className="mt-2 border border-gray-400"
                />
              </div>
              <div className="mt-4 flex justify-end gap-3 md:col-span-2">
                <Button
                  variant="default"
                  className="px-2 md:px-4"
                  type="submit"
                >
                  <Save className="mr-0 md:mr-2" />
                  <span>Save Bus</span>
                </Button>
                <Button
                  variant="default"
                  className="px-2 md:px-4"
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                >
                  <span>Cancel</span>
                </Button>
              </div>
            </form>
          )}
          {currentTab === 'driver' && editDriver && (
            <form className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="driver_id">Driver ID</Label>
                <Input
                  type="number"
                  id="driver_id"
                  name="driver_id"
                  value={editDriver.driver_id}
                  onChange={(e) =>
                    setEditDriver({
                      ...editDriver,
                      driver_id: Number(e.target.value),
                    })
                  }
                  required
                  className="mt-2 border border-gray-400"
                />
              </div>
              <div>
                <Label htmlFor="full_name">Full Name</Label>
                <Input
                  type="text"
                  id="full_name"
                  name="full_name"
                  value={editDriver.full_name}
                  onChange={(e) =>
                    setEditDriver({
                      ...editDriver,
                      full_name: e.target.value,
                    })
                  }
                  required
                  className="mt-2 border border-gray-400"
                />
              </div>
              <div>
                <Label htmlFor="license_number">License Number</Label>
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
                <Label htmlFor="contact_number">Contact Number</Label>
                <Input
                  type="tel"
                  id="contact_number"
                  name="contact_number"
                  pattern="[0-9]+"
                  inputMode="numeric"
                  value={editDriver.contact_number}
                  onChange={(e) =>
                    setEditDriver({
                      ...editDriver,
                      contact_number: e.target.value.replace(/[^0-9]/g, ''),
                    })
                  }
                  required
                  className="mt-2 border border-gray-400"
                />
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  name="status"
                  value={editDriver.status}
                  onChange={(e) =>
                    setEditDriver({
                      ...editDriver,
                      status: e.target.value as DriverInformationType['status'],
                    })
                  }
                  className="mt-2 w-full rounded border border-gray-400 p-2"
                  required
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div>
                <Label htmlFor="bus_id">Bus ID</Label>
                <Input
                  type="number"
                  id="bus_id"
                  name="bus_id"
                  value={editDriver.bus_id}
                  onChange={(e) =>
                    setEditDriver({
                      ...editDriver,
                      bus_id: Number(e.target.value),
                    })
                  }
                  className="mt-2 border border-gray-400"
                />
              </div>
              <div className="mt-4 flex justify-end gap-3 md:col-span-2">
                <Button
                  variant="default"
                  className="px-2 md:px-4"
                  type="submit"
                >
                  <Save className="mr-0 md:mr-2" />
                  <span>Save Driver</span>
                </Button>
                <Button
                  variant="default"
                  className="px-2 md:px-4"
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                >
                  <span>Cancel</span>
                </Button>
              </div>
            </form>
          )}
          {currentTab === 'conductor' && editConductor && (
            <form className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="conductor_id">Conductor ID</Label>
                <Input
                  type="number"
                  id="conductor_id"
                  name="conductor_id"
                  value={editConductor.conductor_id}
                  onChange={(e) =>
                    setEditConductor({
                      ...editConductor,
                      conductor_id: Number(e.target.value),
                    })
                  }
                  required
                  className="mt-2 border border-gray-400"
                />
              </div>
              <div>
                <Label htmlFor="full_name">Full Name</Label>
                <Input
                  type="text"
                  id="full_name"
                  name="full_name"
                  value={editConductor.name}
                  onChange={(e) =>
                    setEditConductor({
                      ...editConductor,
                      name: e.target.value,
                    })
                  }
                  required
                  className="mt-2 border border-gray-400"
                />
              </div>
              <div>
                <Label htmlFor="contact_number">Contact Number</Label>
                <Input
                  type="tel"
                  id="contact_number"
                  name="contact_number"
                  pattern="[0-9]+"
                  inputMode="numeric"
                  value={editConductor.contact_number}
                  onChange={(e) =>
                    setEditConductor({
                      ...editConductor,
                      contact_number: e.target.value.replace(/[^0-9]/g, ''),
                    })
                  }
                  required
                  className="mt-2 border border-gray-400"
                />
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  name="status"
                  value={editConductor.status}
                  onChange={(e) =>
                    setEditConductor({
                      ...editConductor,
                      status: e.target
                        .value as ConductorInformationType['status'],
                    })
                  }
                  className="mt-2 w-full rounded border border-gray-400 p-2"
                  required
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div>
                <Label htmlFor="bus_id">Bus ID</Label>
                <Input
                  type="number"
                  id="bus_id"
                  name="bus_id"
                  value={editConductor.bus_id}
                  onChange={(e) =>
                    setEditConductor({
                      ...editConductor,
                      bus_id: Number(e.target.value),
                    })
                  }
                  className="mt-2 border border-gray-400"
                />
              </div>
              <div className="mt-4 flex justify-end gap-3 md:col-span-2">
                <Button
                  variant="default"
                  className="px-2 md:px-4"
                  type="submit"
                >
                  <Save className="mr-0 md:mr-2" />
                  <span>Save Conductor</span>
                </Button>
                <Button
                  variant="default"
                  className="px-2 md:px-4"
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                >
                  <span>Cancel</span>
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
      <Dialog open={isDriverModalOpen} onOpenChange={setIsDriverModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Driver Details</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Here are the details of the selected driver.
          </DialogDescription>

          {selectedDriver ? (
            <div className="mb-4 flex flex-col items-center">
              <div className="mb-2 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-gray-200">
                <span className="text-4xl font-bold text-gray-600">
                  {getInitials(selectedDriver.full_name)}
                </span>
              </div>
              <span className="text-muted-foreground text-xs">
                Profile Picture
              </span>
            </div>
          ) : null}
          {selectedDriver ? (
            <table className="border-outline w-full rounded-md border-2">
              <thead>
                <tr>
                  <th
                    colSpan={2}
                    className="bg-neutral border-outline border-2 p-2 text-left text-black sm:text-lg md:p-4 md:text-xl"
                  >
                    Driver Information
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
                    Status
                  </td>
                  <td className="text-muted-foreground p-2 text-end text-sm md:text-lg">
                    <span
                      className={
                        selectedDriver.status === 'active'
                          ? 'font-semibold text-green-600'
                          : 'font-semibold text-red-600'
                      }
                    >
                      {selectedDriver.status.charAt(0).toUpperCase() +
                        selectedDriver.status.slice(1)}
                    </span>
                  </td>
                </tr>
                <tr className="border-outline">
                  <td className="text-secondary-foreground p-2 text-sm font-semibold md:text-lg">
                    Bus ID
                  </td>
                  <td className="text-muted-foreground p-2 text-end text-sm md:text-lg">
                    {selectedDriver.bus_id ?? 'N/A'}
                  </td>
                </tr>
              </tbody>
            </table>
          ) : (
            <div className="text-muted-foreground text-center text-sm md:text-lg">
              No driver selected.
            </div>
          )}
          <DialogFooter>
            <Button
              variant="default"
              className="w-full"
              onClick={() => {
                if (selectedDriver) {
                  setEditDriver(selectedDriver);
                  setIsEditModalOpen(true);
                  setIsDriverModalOpen(false);
                }
              }}
            >
              Edit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog
        open={isConductorModalOpen}
        onOpenChange={setIsConductorModalOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Conductor Details</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Here are the details of the selected conductor.
          </DialogDescription>
          {selectedConductor ? (
            <div className="my-4 flex flex-col items-center">
              <div className="mb-2 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-gray-200">
                <span className="text-4xl font-bold text-gray-600">
                  {getInitials(selectedConductor.name)}
                </span>
              </div>
              <span className="text-muted-foreground text-xs">
                Profile Picture
              </span>
            </div>
          ) : null}
          {selectedConductor ? (
            <table className="border-outline w-full rounded-md border-2">
              <thead>
                <tr>
                  <th
                    colSpan={2}
                    className="bg-neutral border-outline border-2 p-2 text-left text-black sm:text-lg md:p-4 md:text-xl"
                  >
                    Conductor Information
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
                    Full Name
                  </td>
                  <td className="text-muted-foreground p-2 text-end text-sm md:text-lg">
                    {selectedConductor.name}
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
                    Email
                  </td>
                  <td className="text-muted-foreground p-2 text-end text-sm md:text-lg">
                    {selectedConductor.email}
                  </td>
                </tr>
                <tr className="border-outline border-b-2">
                  <td className="text-secondary-foreground p-2 text-sm font-semibold md:text-lg">
                    Status
                  </td>
                  <td className="text-muted-foreground p-2 text-end text-sm md:text-lg">
                    <span
                      className={
                        selectedConductor.status === 'active'
                          ? 'font-semibold text-green-600'
                          : 'font-semibold text-red-600'
                      }
                    >
                      {selectedConductor.status.charAt(0).toUpperCase() +
                        selectedConductor.status.slice(1)}
                    </span>
                  </td>
                </tr>

                <tr className="border-outline">
                  <td className="text-secondary-foreground p-2 text-sm font-semibold md:text-lg">
                    Bus ID
                  </td>
                  <td className="text-muted-foreground p-2 text-end text-sm md:text-lg">
                    {selectedConductor.bus_id ?? 'N/A'}
                  </td>
                </tr>
              </tbody>
            </table>
          ) : (
            <div className="text-muted-foreground text-center text-sm md:text-lg">
              No conductor selected.
            </div>
          )}
          <DialogFooter>
            <Button
              variant="default"
              className="w-full"
              onClick={() => {
                if (selectedConductor) {
                  setEditConductor(selectedConductor);
                  setIsEditModalOpen(true);
                  setIsConductorModalOpen(false);
                }
              }}
            >
              Edit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="grid auto-rows-min gap-4 md:grid-cols-3"></div>
      <div className="min-h-[100vh] flex-1 rounded-xl bg-white md:min-h-min">
        <div className="flex-col gap-3">
          <div className="flex justify-between pr-3 pl-3">
            <div className="inline-flex gap-3">
              <Button
                onClick={() => setCurrentTab('bus')}
                variant={currentTab === 'bus' ? 'default' : 'outline'}
                className={
                  currentTab === 'bus'
                    ? 'border-primary font-bold text-black'
                    : ''
                }
              >
                Buses
              </Button>
              <Button
                onClick={() => setCurrentTab('driver')}
                variant={currentTab === 'driver' ? 'default' : 'outline'}
                className={
                  currentTab === 'driver'
                    ? 'border-primary font-bold text-black'
                    : ''
                }
              >
                Drivers
              </Button>
              <Button
                onClick={() => setCurrentTab('conductor')}
                variant={currentTab === 'conductor' ? 'default' : 'outline'}
                className={
                  currentTab === 'conductor'
                    ? 'border-primary font-bold text-black'
                    : ''
                }
              >
                Conductors
              </Button>
            </div>
            <div>
              {currentTab === 'bus' && (
                <Button
                  variant="default"
                  className="px-2 md:px-4"
                  onClick={() => setIsAddModalOpen(true)}
                >
                  <Plus
                    className={currentTab === 'bus' ? 'mr-0 md:mr-2' : ''}
                  />
                  <span className="hidden md:inline">New Bus</span>
                </Button>
              )}
              {currentTab === 'driver' && (
                <Button
                  variant="default"
                  className="px-2 md:px-4"
                  onClick={() => setIsAddModalOpen(true)}
                >
                  <Plus
                    className={currentTab === 'driver' ? 'mr-0 md:mr-2' : ''}
                  />
                  <span className="hidden md:inline">New Driver</span>
                </Button>
              )}
              {currentTab === 'conductor' && (
                <Button
                  variant="default"
                  className="px-2 md:px-4"
                  onClick={() => setIsAddModalOpen(true)}
                >
                  <Plus
                    className={currentTab === 'conductor' ? 'mr-0 md:mr-2' : ''}
                  />
                  <span className="hidden md:inline">New Conductor</span>
                </Button>
              )}
            </div>
          </div>
          <div className="relative my-6 w-full">
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-5 w-5 text-gray-400" />
            </span>
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search..."
              className="focus:border-primary focus:ring-primary/20 block w-full rounded-xl border border-gray-300 bg-white p-2 pl-10 transition placeholder:text-gray-400 focus:ring-2"
            />
          </div>
          <div className="mt-5">
            {currentTab === 'bus' && (
              <div>
                <hr className="my-4" />
                <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-3">
                  <Cards
                    card={{
                      title: 'Active',
                      icon: Laugh,
                      value: String(
                        currentBusData.filter((bus) => bus.status === 'active')
                          .length
                      ),
                      subtitle: 'Currently in service',
                    }}
                  />
                  <Cards
                    card={{
                      title: 'Inactive',
                      icon: Frown,
                      value: String(
                        currentBusData.filter(
                          (bus) => bus.status === 'inactive'
                        ).length
                      ),
                      subtitle: 'Not in service',
                    }}
                  />
                  <Cards
                    card={{
                      title: 'In Maintenance',
                      icon: Wrench,
                      value: String(
                        currentBusData.filter(
                          (bus) => bus.status === 'in maintenance'
                        ).length
                      ),
                      subtitle: 'Buses currently in maintenance',
                    }}
                  />
                </div>
                <hr className="my-4" />
                <div className="mt-2 mb-2 flex justify-start">
                  <div className="w-full max-w-[180px] rounded-full border border-gray-300 bg-white">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          className="flex w-full items-center justify-between"
                        >
                          <span>
                            {busStatusFilter === '' || busStatusFilter === 'all'
                              ? 'All buses'
                              : busStatusFilter === 'active'
                                ? 'Active buses'
                                : busStatusFilter === 'inactive'
                                  ? 'Inactive buses'
                                  : busStatusFilter === 'in maintenance'
                                    ? 'In maintenance buses'
                                    : 'All buses'}
                          </span>
                          <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onSelect={() => setBusStatusFilter('all')}
                        >
                          All buses
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onSelect={() => setBusStatusFilter('active')}
                        >
                          Active buses
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onSelect={() => setBusStatusFilter('inactive')}
                        >
                          Inactive buses
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onSelect={() => setBusStatusFilter('in maintenance')}
                        >
                          In maintenance buses
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <div className="grid w-full grid-cols-1 items-start justify-items-center gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {filteredBusData.map((bus) => (
                    <BusInformationCard
                      key={bus.bus_id}
                      BusInfo={bus}
                      OnClick={() => {
                        setSelectedBusId(bus.bus_id);
                        setIsModalOpen(true);
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
            {currentTab === 'driver' && (
              <>
                <hr className="my-4" />
                <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-2">
                  <Cards
                    card={{
                      title: 'Active',
                      icon: Laugh,
                      value: String(
                        currentDriverData.filter(
                          (driver) => driver.status === 'active'
                        ).length
                      ),
                      subtitle: 'Active drivers',
                    }}
                  />
                  <Cards
                    card={{
                      title: 'Inactive',
                      icon: Frown,
                      value: String(
                        currentDriverData.filter(
                          (driver) => driver.status === 'inactive'
                        ).length
                      ),
                      subtitle: 'Inactive drivers',
                    }}
                  />
                </div>
                <hr className="my-4" />
                <div className="mt-2 mb-2 flex justify-start">
                  <div className="w-full max-w-[180px] rounded-full border border-gray-300 bg-white">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          className="flex w-full items-center justify-between"
                        >
                          <span>
                            {driverStatusFilter === '' ||
                            driverStatusFilter === 'all'
                              ? 'All drivers'
                              : driverStatusFilter === 'active'
                                ? 'Active drivers'
                                : driverStatusFilter === 'inactive'
                                  ? 'Inactive drivers'
                                  : 'All drivers'}
                          </span>
                          <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onSelect={() => setDriverStatusFilter('all')}
                        >
                          All drivers
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onSelect={() => setDriverStatusFilter('active')}
                        >
                          Active drivers
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onSelect={() => setDriverStatusFilter('inactive')}
                        >
                          Inactive drivers
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <div className="grid w-full grid-cols-1 items-start justify-items-center gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {filteredDriverData.map((driver) => (
                    <DriverInformationCard
                      key={driver.driver_id}
                      DriverInfo={driver}
                      OnClick={() => {
                        setSelectedDriverId(driver.driver_id);
                        setIsDriverModalOpen(true);
                      }}
                    />
                  ))}
                </div>
              </>
            )}
            {currentTab === 'conductor' && (
              <>
                <hr className="my-4" />
                <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-2">
                  <Cards
                    card={{
                      title: 'Active',
                      icon: Laugh,
                      value: String(
                        currentConductorData.filter(
                          (conductor) => conductor.status === 'active'
                        ).length
                      ),
                      subtitle: 'Active conductors',
                    }}
                  />
                  <Cards
                    card={{
                      title: 'Inactive',
                      icon: Frown,
                      value: String(
                        currentConductorData.filter(
                          (conductor) => conductor.status === 'inactive'
                        ).length
                      ),
                      subtitle: 'Inactive conductors',
                    }}
                  />
                </div>
                <hr className="my-4" />
                <div className="mt-2 mb-2 flex justify-start">
                  <div className="w-full max-w-[180px] rounded-full border border-gray-300 bg-white">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          className="flex w-full items-center justify-between"
                        >
                          <span>
                            {conductorStatusFilter === '' ||
                            conductorStatusFilter === 'all'
                              ? 'All conductors'
                              : conductorStatusFilter === 'active'
                                ? 'Active conductors'
                                : conductorStatusFilter === 'inactive'
                                  ? 'Inactive conductors'
                                  : 'All conductors'}
                          </span>
                          <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onSelect={() => setConductorStatusFilter('all')}
                        >
                          All conductors
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onSelect={() => setConductorStatusFilter('active')}
                        >
                          Active conductors
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onSelect={() => setConductorStatusFilter('inactive')}
                        >
                          Inactive conductors
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <div className="grid w-full grid-cols-1 items-start justify-items-center gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {filteredConductorData.map((conductor) => (
                    <ConductorInformationCard
                      key={conductor.conductor_id}
                      ConductorInfo={conductor}
                      OnClick={() => {
                        setSelectedConductorId(conductor.conductor_id);
                        setIsConductorModalOpen(true);
                      }}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FleetStatus;
