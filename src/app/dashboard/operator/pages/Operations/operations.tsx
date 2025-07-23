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

import { handleAddConductor, handleAddDriver, handleAddBus } from './utils/add';
import {
  handleDeleteConductor,
  handleDeleteDriver,
  handleDeleteBus,
} from './utils/delete';
import {
  handleEditConductor,
  handleEditDriver,
  handleEditBus,
} from './utils/edit';

import { getInitials } from '@/lib/misc';

import type { UserType } from '@/type';

const FleetStatus = (props: {
  userData: UserType;
  currentBusData: BusInformationType[];
  currentDriverData: DriverInformationType[];
  currentConductorData: ConductorInformationType[];
  refreshData: () => void;
}) => {
  const { currentBusData, currentDriverData, currentConductorData } = props;

  const [currentTab, setCurrentTab] = useState<'bus' | 'driver' | 'conductor'>(
    'bus'
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedBusId, setSelectedBusId] = useState<string | null>(null);
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
      if (busStatusFilter && busStatusFilter === 'in maintenance') {
        busData = busData.filter((bus) => {
          if (!bus.next_maintenance) return false;

          return new Date(bus.next_maintenance) < new Date();
        });
      } else if (busStatusFilter && busStatusFilter !== 'all') {
        busData = busData.filter((bus) => bus.status === busStatusFilter);
      } else if (searchInput !== '') {
        busData = busData.filter((bus) => bus.bus_id === searchInput);
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
            <form
              onSubmit={(e) =>
                handleAddBus(e, () => {
                  props.refreshData();
                  setIsAddModalOpen(false);
                })
              }
              className="w-full"
            >
              <Input
                type="hidden"
                id="company_id"
                name="company_id"
                defaultValue={props.userData.company_id}
                required
              />
              <div>
                <Label htmlFor="bus_id">Bus ID *</Label>
                <Input
                  type="text"
                  id="bus_id"
                  name="bus_id"
                  className="mt-2 border border-gray-400"
                  required
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
            <form
              onSubmit={(e) =>
                handleAddDriver(e, () => {
                  props.refreshData();
                  setIsAddModalOpen(false);
                })
              }
              className="grid grid-cols-1 gap-4 md:grid-cols-2"
            >
              <Input
                type="hidden"
                id="company_id"
                name="company_id"
                defaultValue={props.userData.company_id}
                required
              />
              <div>
                <Label htmlFor="full_name">Full Name *</Label>
                <Input
                  type="text"
                  id="full_name"
                  name="full_name"
                  className="mt-2 border border-gray-400"
                  required
                />
              </div>
              <div>
                <Label htmlFor="license_number">License Number *</Label>
                <Input
                  type="text"
                  id="license_number"
                  name="license_number"
                  className="mt-2 border border-gray-400"
                  required
                />
              </div>
              <div>
                <Label htmlFor="contact_number">Contact Number *</Label>
                <Input
                  type="tel"
                  id="contact_number"
                  name="contact_number"
                  pattern="[0-9]+"
                  inputMode="numeric"
                  className="mt-2 border border-gray-400"
                  required
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
            <form
              onSubmit={(e) =>
                handleAddConductor(e, () => {
                  props.refreshData();
                  setIsAddModalOpen(false);
                })
              }
            >
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Input
                  type="hidden"
                  id="company_id"
                  name="company_id"
                  defaultValue={props.userData.company_id}
                  required
                />
                <div>
                  <Label htmlFor="full_name">Full Name *</Label>
                  <Input
                    type="text"
                    id="full_name"
                    name="full_name"
                    className="mt-2 border border-gray-400"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    className="mt-2 border border-gray-400"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="contact_number">Contact Number *</Label>
                  <Input
                    type="tel"
                    id="contact_number"
                    name="contact_number"
                    pattern="[0-9]+"
                    inputMode="numeric"
                    className="mt-2 border border-gray-400"
                    required
                  />
                </div>
              </div>
              <p className="text-muted-foreground mt-4 text-xs">
                Note: Default Password for conductor account is 123123123.
              </p>
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
            <form
              onSubmit={(e) =>
                handleEditBus(
                  e,

                  () => {
                    props.refreshData();
                    setIsEditModalOpen(false);
                  },
                  props.currentBusData.find(
                    (bus) => bus.bus_id === editBus.bus_id
                  )
                )
              }
            >
              <Input
                type="hidden"
                id="bus_id"
                name="user_id"
                defaultValue={editBus.bus_id}
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
                    defaultValue={editBus.next_maintenance}
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
                        defaultValue={editBus.route_id}
                        className="mt-2 w-full rounded border border-gray-400 p-2"
                        required
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
                      <Label htmlFor="edit_driver_id">Driver ID *</Label>
                      <select
                        id="edit_driver_id"
                        name="driver_id"
                        defaultValue={editBus.driver_id}
                        className="mt-2 w-full rounded border border-gray-400 p-2"
                        required
                      >
                        <option value="">Select Driver</option>
                        {currentDriverData.map((driver) => (
                          <option
                            key={driver.driver_id}
                            value={driver.driver_id}
                          >
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
                        defaultValue={editBus.conductor_id}
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
            <form
              onSubmit={(e) =>
                handleEditDriver(
                  e,
                  () => {
                    props.refreshData();
                    setIsEditModalOpen(false);
                  },
                  props.currentDriverData.find(
                    (driver) => driver.driver_id === editDriver.driver_id
                  )
                )
              }
            >
              <Input
                type="hidden"
                id="user_id"
                name="user_id"
                defaultValue={editDriver.driver_id}
                required
              />
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="full_name">Full Name *</Label>
                  <Input
                    type="text"
                    id="full_name"
                    name="full_name"
                    defaultValue={editDriver.full_name}
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
                    defaultValue={editDriver.license_number}
                    required
                    className="mt-2 border border-gray-400"
                  />
                </div>
                <div>
                  <Label htmlFor="contact_number">Contact Number *</Label>
                  <Input
                    type="tel"
                    id="contact_number"
                    name="contact_number"
                    pattern="[0-9]+"
                    inputMode="numeric"
                    defaultValue={editDriver.contact_number}
                    required
                    className="mt-2 border border-gray-400"
                  />
                </div>
                <div>
                  <Label htmlFor="bus_id">Bus ID</Label>
                  <Input
                    type="string"
                    id="bus_id"
                    name="bus_id"
                    defaultValue={editDriver.bus_id}
                    className="mt-2 border border-gray-400"
                  />
                </div>
              </div>
              <p className="text-muted-foreground mt-4 text-xs">
                Note: Empty Bus ID input will set driver as inactive.
              </p>
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
            <form
              onSubmit={(e) =>
                handleEditConductor(
                  e,
                  () => {
                    props.refreshData();
                    setIsEditModalOpen(false);
                  },
                  props.currentConductorData.find(
                    (conductor) =>
                      conductor.conductor_id === editConductor.conductor_id
                  )
                )
              }
            >
              <Input
                type="hidden"
                id="user_id"
                name="user_id"
                defaultValue={editConductor.conductor_id}
                required
              />
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="full_name">Full Name *</Label>
                  <Input
                    type="text"
                    id="full_name"
                    name="full_name"
                    defaultValue={editConductor.name}
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
                    defaultValue={editConductor.email}
                    required
                    className="mt-2 border border-gray-400"
                  />
                </div>
                <div>
                  <Label htmlFor="contact_number">Contact Number *</Label>
                  <Input
                    type="tel"
                    id="contact_number"
                    name="contact_number"
                    pattern="[0-9]+"
                    inputMode="numeric"
                    defaultValue={editConductor.contact_number}
                    required
                    className="mt-2 border border-gray-400"
                  />
                </div>
                <div>
                  <Label htmlFor="bus_id">Bus ID</Label>
                  <Input
                    type="text"
                    id="bus_id"
                    name="bus_id"
                    defaultValue={editConductor.bus_id}
                    className="mt-2 border border-gray-400"
                  />
                </div>
              </div>
              <p className="text-muted-foreground mt-4 text-xs">
                Note: Empty Bus ID input will set conductor as inactive.
              </p>

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
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="w-full !max-w-4xl">
          <DialogHeader>
            <DialogTitle>Bus Details</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Here are the details of the selected bus.
          </DialogDescription>

          {selectedBus ? (
            <div className="flex w-full flex-col items-start justify-between gap-10 md:flex-row">
              {/* Bus details table */}
              <table className="border-outline w-full rounded-md border-2 md:w-1/2">
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
              {/* Timeline Chart */}
              <div className="w-full md:w-1/2">
                <div className="mb-4 flex w-full items-center justify-between">
                  <h3 className="text-lg font-semibold">Bus Timeline</h3>
                  <span className="text-muted-foreground mb-2 text-sm">
                    Trips Today: 3/4
                  </span>
                </div>
                <div className="relative max-h-72 overflow-y-auto">
                  <ul>
                    <ul className="relative pl-2">
                      {/* Vertical line */}
                      <div className="absolute top-2 bottom-2 left-[22px] z-0 w-px bg-gray-300" />
                      {[
                        {
                          time: selectedBus.next_maintenance,
                          title: 'Next Maintenance',
                          description: 'Scheduled maintenance for this bus.',
                        },
                        {
                          time: selectedBus.next_maintenance,
                          title: 'Next Maintenance',
                          description: 'Scheduled maintenance for this bus.',
                        },
                        {
                          time: selectedBus.next_maintenance,
                          title: 'Next Maintenance',
                          description: 'Scheduled maintenance for this bus.',
                        },
                        {
                          time: selectedBus.next_maintenance,
                          title: 'Next Maintenance',
                          description: 'Scheduled maintenance for this bus.',
                        },
                        {
                          time: selectedBus.next_maintenance,
                          title: 'Next Maintenance',
                          description: 'Scheduled maintenance for this bus.',
                        },
                        {
                          time: selectedBus.next_maintenance || 'N/A',
                          title: 'Last Maintenance',
                          description: 'Previous maintenance completed.',
                        },
                        {
                          time: selectedBus.next_maintenance || 'N/A',
                          title: 'Bus Added',
                          description: 'Bus was added to the fleet.',
                        },
                      ].map((event, idx) => (
                        <li
                          key={idx}
                          className="relative z-10 mb-4 ml-4 flex flex-col"
                        >
                          <div className="border-primary absolute top-2 left-[-12px] z-20 h-5 w-5 rounded-full border-2 bg-white" />
                          <time className="mb-1 ml-8 text-xs font-normal text-gray-400">
                            {event.time}
                          </time>
                          <h4 className="text-md ml-8 font-semibold text-gray-900">
                            {event.title}
                          </h4>
                          <p className="mb-2 ml-8 text-sm font-normal text-gray-500">
                            {event.description}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-muted-foreground text-center text-sm md:text-lg">
              No bus selected.
            </div>
          )}
          <DialogFooter>
            <div className="flex w-full flex-col gap-2">
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
                Edit Bus
              </Button>
              <Button
                variant="default"
                className="w-full bg-red-600 text-white hover:bg-red-700"
                onClick={() => {
                  if (selectedBus) {
                    setIsModalOpen(false);
                    handleDeleteBus(selectedBus.bus_id, props.refreshData);
                  }
                }}
              >
                Delete Bus
              </Button>
            </div>
          </DialogFooter>
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
            <div className="flex w-full flex-col gap-2">
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
                Edit Driver
              </Button>
              <Button
                variant="default"
                className="w-full bg-red-600 text-white hover:bg-red-700"
                onClick={() => {
                  if (selectedDriver) {
                    setIsDriverModalOpen(false);
                    handleDeleteDriver(
                      selectedDriver.driver_id,
                      props.refreshData
                    );
                  }
                }}
              >
                Delete Driver
              </Button>
            </div>
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
            <div className="flex w-full flex-col gap-2">
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
                Edit Conductor
              </Button>
              <Button
                variant="default"
                className="w-full bg-red-600 text-white hover:bg-red-700"
                onClick={() => {
                  if (selectedConductor) {
                    setIsConductorModalOpen(false);
                    handleDeleteConductor(
                      selectedConductor.conductor_id,
                      props.refreshData
                    );
                  }
                }}
              >
                Delete Conductor
              </Button>
            </div>
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
                        currentBusData.filter((bus) => {
                          if (!bus.next_maintenance) return false;

                          return new Date(bus.next_maintenance) < new Date();
                        }).length
                      ),
                      subtitle: 'Buses currently in maintenance',
                    }}
                  />
                </div>
                <hr className="my-4" />
                <div className="mt-2 mb-2 flex justify-start">
                  <div className="w-fit rounded-full bg-white">
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
                      DriverInfo={currentDriverData.find(
                        (driver) => driver.driver_id === bus.driver_id
                      )}
                      ConductorInfo={currentConductorData.find(
                        (conductor) =>
                          conductor.conductor_id === bus.conductor_id
                      )}
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
