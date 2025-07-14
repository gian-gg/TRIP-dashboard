import { Button } from '@/components/ui/button';
import { useState } from 'react';
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
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { X, Plus, Save } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const mockBusData: BusInformationType[] = [
  {
    bus_id: 1,
    route_id: 'Route 101',
    driver_id: 101,
    conductor_id: 201,
    passenger_count: 32,
    curr_location: 'Main St.',
    status: 'active',
  },
  {
    bus_id: 2,
    route_id: 'Route 202',
    driver_id: 102,
    conductor_id: 202,
    passenger_count: 0,
    curr_location: 'Depot',
    status: 'inactive',
  },
  {
    bus_id: 3,
    route_id: 'Route 303',
    driver_id: 103,
    conductor_id: 203,
    passenger_count: 18,
    curr_location: '5th Ave.',
    status: 'in transit',
  },
  {
    bus_id: 3,
    route_id: 'Route 303',
    driver_id: 103,
    conductor_id: 203,
    passenger_count: 18,
    curr_location: '5th Ave.',
    status: 'in transit',
  },
];

// Add mock driver data
const mockDriverData: DriverInformationType[] = [
  {
    driver_id: 101,
    full_name: 'John Doe',
    license_number: 'A1234567',
    contact_number: '09171234567',
    bus_id: 1,
  },
  {
    driver_id: 102,
    full_name: 'Jane Smith',
    license_number: 'B2345678',
    contact_number: '09179876543',
    bus_id: 2,
  },
  {
    driver_id: 103,
    full_name: 'Alex Lee',
    license_number: 'C3456789',
    contact_number: '09177654321',
    bus_id: 3,
  },
  {
    driver_id: 103,
    full_name: 'Alex Lee',
    license_number: 'C3456789',
    contact_number: '09177654321',
    bus_id: 3,
  },
];

// Add mock conductor data
const mockConductorData: ConductorInformationType[] = [
  {
    conductor_id: 201,
    full_name: 'Maria Cruz',
    contact_number: '09181234567',
    bus_id: 1,
  },
  {
    conductor_id: 202,
    full_name: 'Pedro Santos',
    contact_number: '09182345678',
    bus_id: 2,
  },
  {
    conductor_id: 203,
    full_name: 'Liza Reyes',
    contact_number: '09183456789',
    bus_id: 3,
  },
  {
    conductor_id: 203,
    full_name: 'Liza Reyes',
    contact_number: '09183456789',
    bus_id: 3,
  },
];

const FleetStatus = () => {
  const [currentTab, setCurrentTab] = useState<'bus' | 'driver' | 'conductor'>(
    'bus'
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedBusId, setSelectedBusId] = useState<number | null>(null);
  const selectedBus =
    selectedBusId !== null
      ? mockBusData.find((bus) => bus.bus_id === selectedBusId)
      : null;

  return (
    <>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader className="mb-1 flex">
            <DialogTitle className="text-left">
              <h1 className="text-lg font-semibold text-black">Bus Details</h1>
            </DialogTitle>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsModalOpen(false)}
            >
              <X className="text-primary" />
            </Button>
          </DialogHeader>
          <DialogDescription className="mt-0">
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
                      Passenger Count
                    </td>
                    <td className="text-muted-foreground p-2 text-end text-sm md:text-lg">
                      {selectedBus.passenger_count}
                    </td>
                  </tr>
                  <tr className="border-outline border-b-2">
                    <td className="text-secondary-foreground p-2 text-sm font-semibold md:text-lg">
                      Current Location
                    </td>
                    <td className="text-muted-foreground p-2 text-end text-sm md:text-lg">
                      {selectedBus.curr_location}
                    </td>
                  </tr>
                  <tr className="border-outline">
                    <td className="text-secondary-foreground p-2 text-sm font-semibold md:text-lg">
                      Status
                    </td>
                    <td className="text-muted-foreground p-2 text-end text-sm capitalize md:text-lg">
                      {selectedBus.status}
                    </td>
                  </tr>
                </tbody>
              </table>
            ) : (
              <div className="text-muted-foreground text-center text-sm md:text-lg">
                No bus selected.
              </div>
            )}
          </DialogDescription>
        </DialogContent>
      </Dialog>
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent>
          <DialogHeader className="mb-1 flex">
            <DialogTitle className="text-left">
              <h1 className="text-lg font-semibold text-black"></h1>
            </DialogTitle>
            Add {currentTab}
          </DialogHeader>
          <DialogDescription className="mt-0">
            {currentTab === 'bus' && (
              <div>
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
                    <Input
                      type="number"
                      id="route_id"
                      name="route_id"
                      required
                      className="mt-2 border border-gray-400"
                    />
                  </div>
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
                    <Label htmlFor="passenger_count">Passenger Count</Label>
                    <Input
                      type="number"
                      id="passenger_count"
                      name="passenger_count"
                      required
                      className="mt-2 border border-gray-400"
                    />
                  </div>
                  <div>
                    <Label htmlFor="curr_location">Current Location</Label>
                    <Input
                      type="text"
                      id="curr_location"
                      name="curr_location"
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
                      <option value="in transit">In Transit</option>
                    </select>
                  </div>
                </form>
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
              </div>
            )}
            {currentTab === 'driver' && (
              <div>
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
                      type="text"
                      id="contact_number"
                      name="contact_number"
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
                </form>
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
              </div>
            )}
            {currentTab === 'conductor' && (
              <div>
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
                      type="text"
                      id="contact_number"
                      name="contact_number"
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
                </form>
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
              </div>
            )}
          </DialogDescription>
        </DialogContent>
      </Dialog>
      <h1 className="text-xl font-bold">Operations</h1>
      <p className="text-muted-foreground text-xs md:text-sm">
        This page provides an overview of the fleet status, including buses,
        drivers, and conductors.
      </p>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3"></div>
      <div className="bg-muted min-h-[100vh] flex-1 rounded-xl md:min-h-min">
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
          <div className="mt-10">
            {currentTab === 'bus' && (
              <div className="grid w-full grid-cols-1 items-start justify-items-center gap-4 md:grid-cols-2 lg:grid-cols-3">
                {mockBusData.map((bus) => (
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
            )}
            {currentTab === 'driver' && (
              <div className="grid w-full grid-cols-1 items-start justify-items-center gap-4 md:grid-cols-2 lg:grid-cols-3">
                {mockDriverData.map((driver) => (
                  <DriverInformationCard
                    key={driver.driver_id}
                    DriverInfo={driver}
                    OnClick={() => {
                      // You can set selected driver state here if you want to show a dialog
                    }}
                  />
                ))}
              </div>
            )}
            {currentTab === 'conductor' && (
              <div className="grid w-full grid-cols-1 items-start justify-items-center gap-4 md:grid-cols-2 lg:grid-cols-3">
                {mockConductorData.map((conductor) => (
                  <ConductorInformationCard
                    key={conductor.conductor_id}
                    ConductorInfo={conductor}
                    OnClick={() => {
                      // You can set selected conductor state here if you want to show a dialog
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FleetStatus;
