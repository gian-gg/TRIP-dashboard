import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { BusTable } from './components/BusTable';
import { DriverTable } from './components/DriverTable';
import { ConductorTable } from './components/ConductorTable';
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
import { Plus, Save, Laugh, Frown, Wrench, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Cards from '@/components/Cards';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

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
  const [busStatusFilter, setBusStatusFilter] = useState('all');
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
      }
      if (searchInput !== '') {
        busData = busData.filter((bus) =>
          bus.bus_id.toLowerCase().includes(searchInput.toLowerCase())
        );
      }
      setFilteredBusData(busData);
    } else if (currentTab === 'driver') {
      let driverData = currentDriverData;
      if (driverStatusFilter && driverStatusFilter !== 'all') {
        driverData = driverData.filter(
          (driver) => driver.status === driverStatusFilter
        );
      }
      if (searchInput !== '') {
        driverData = driverData.filter(
          (driver) =>
            driver.driver_id.toString().includes(searchInput) ||
            driver.full_name.toLowerCase().includes(searchInput.toLowerCase())
        );
      }
      setFilteredDriverData(driverData);
    } else if (currentTab === 'conductor') {
      let conductorData = currentConductorData;
      if (conductorStatusFilter && conductorStatusFilter !== 'all') {
        conductorData = conductorData.filter(
          (conductor) => conductor.status === conductorStatusFilter
        );
      }
      if (searchInput !== '') {
        conductorData = conductorData.filter(
          (conductor) =>
            conductor.conductor_id.toString().includes(searchInput) ||
            conductor.name.toLowerCase().includes(searchInput.toLowerCase())
        );
      }
      setFilteredConductorData(conductorData);
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

  const handleViewBus = (busId: string) => {
    setSelectedBusId(busId);
    setIsModalOpen(true);
  };

  const handleViewDriver = (driverId: number) => {
    setSelectedDriverId(driverId);
    setIsDriverModalOpen(true);
  };

  const handleViewConductor = (conductorId: number) => {
    setSelectedConductorId(conductorId);
    setIsConductorModalOpen(true);
  };

  const handleEditBusModal = (bus: BusInformationType) => {
    setEditBus(bus);
    setIsEditModalOpen(true);
  };

  const handleEditDriverModal = (driver: DriverInformationType) => {
    setEditDriver(driver);
    setIsEditModalOpen(true);
  };

  const handleEditConductorModal = (conductor: ConductorInformationType) => {
    setEditConductor(conductor);
    setIsEditModalOpen(true);
  };

  const handleDeleteBusConfirm = (busId: string) => {
    handleDeleteBus(busId, () => {
      props.refreshData();
    });
  };

  const handleDeleteDriverConfirm = (driverId: number) => {
    handleDeleteDriver(driverId, () => {
      props.refreshData();
    });
  };

  const handleDeleteConductorConfirm = (conductorId: number) => {
    handleDeleteConductor(conductorId, () => {
      props.refreshData();
    });
  };

  const totalBuses = currentBusData.length;
  const activeBuses = currentBusData.filter(
    (bus) => bus.status === 'active'
  ).length;
  const maintenanceBuses = currentBusData.filter((bus) => {
    if (!bus.next_maintenance) return false;
    return new Date(bus.next_maintenance) < new Date();
  }).length;

  const totalDrivers = currentDriverData.length;
  const activeDrivers = currentDriverData.filter(
    (driver) => driver.status === 'active'
  ).length;

  const totalConductors = currentConductorData.length;
  const activeConductors = currentConductorData.filter(
    (conductor) => conductor.status === 'active'
  ).length;

  return (
    <>
      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Cards
          card={{
            title: 'Total Buses',
            icon: Laugh,
            value: totalBuses.toString(),
            subtitle: `${activeBuses} active, ${maintenanceBuses} need maintenance`,
          }}
        />
        <Cards
          card={{
            title: 'Total Drivers',
            icon: Frown,
            value: totalDrivers.toString(),
            subtitle: `${activeDrivers} active`,
          }}
        />
        <Cards
          card={{
            title: 'Total Conductors',
            icon: Wrench,
            value: totalConductors.toString(),
            subtitle: `${activeConductors} active`,
          }}
        />
      </div>

      {/* Tab Selector */}
      <div className="flex gap-2">
        <Button
          variant={currentTab === 'bus' ? 'default' : 'outline'}
          onClick={() => {
            setCurrentTab('bus');
            setSearchInput('');
          }}
        >
          Buses
        </Button>
        <Button
          variant={currentTab === 'driver' ? 'default' : 'outline'}
          onClick={() => {
            setCurrentTab('driver');
            setSearchInput('');
          }}
        >
          Drivers
        </Button>
        <Button
          variant={currentTab === 'conductor' ? 'default' : 'outline'}
          onClick={() => {
            setCurrentTab('conductor');
            setSearchInput('');
          }}
        >
          Conductors
        </Button>
      </div>

      {/* Controls */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 items-center gap-2">
          <div className="relative flex-1 md:max-w-sm">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input
              placeholder={`Search ${currentTab}s...`}
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="pl-9"
            />
          </div>

          {currentTab === 'bus' && (
            <Select value={busStatusFilter} onValueChange={setBusStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="in maintenance">In Maintenance</SelectItem>
                <SelectItem value="in transit">In Transit</SelectItem>
              </SelectContent>
            </Select>
          )}

          {currentTab === 'driver' && (
            <Select
              value={driverStatusFilter}
              onValueChange={setDriverStatusFilter}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          )}

          {currentTab === 'conductor' && (
            <Select
              value={conductorStatusFilter}
              onValueChange={setConductorStatusFilter}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>

        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add {currentTab.charAt(0).toUpperCase() + currentTab.slice(1)}
        </Button>
      </div>

      {/* Tables */}
      {currentTab === 'bus' && (
        <BusTable
          buses={filteredBusData}
          onView={handleViewBus}
          onEdit={handleEditBusModal}
          onDelete={handleDeleteBusConfirm}
        />
      )}

      {currentTab === 'driver' && (
        <DriverTable
          drivers={filteredDriverData}
          onView={handleViewDriver}
          onEdit={handleEditDriverModal}
          onDelete={handleDeleteDriverConfirm}
        />
      )}

      {currentTab === 'conductor' && (
        <ConductorTable
          conductors={filteredConductorData}
          onView={handleViewConductor}
          onEdit={handleEditConductorModal}
          onDelete={handleDeleteConductorConfirm}
        />
      )}

      {/* Add Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Add {currentTab.charAt(0).toUpperCase() + currentTab.slice(1)}
            </DialogTitle>
            <DialogDescription>
              Fill in the details to add a new {currentTab}.
            </DialogDescription>
          </DialogHeader>

          {currentTab === 'bus' && (
            <form
              onSubmit={(e) =>
                handleAddBus(e, () => {
                  props.refreshData();
                  setIsAddModalOpen(false);
                })
              }
              className="space-y-4"
            >
              <Input
                type="hidden"
                name="company_id"
                defaultValue={props.userData.company_id}
              />
              <div>
                <Label htmlFor="bus_id">Bus ID *</Label>
                <Input type="text" id="bus_id" name="bus_id" required />
              </div>
              <div>
                <Label htmlFor="route_id">Route ID</Label>
                <Input type="text" id="route_id" name="route_id" />
              </div>
              <div>
                <Label htmlFor="driver_id">Driver ID</Label>
                <Input type="number" id="driver_id" name="driver_id" />
              </div>
              <div>
                <Label htmlFor="conductor_id">Conductor ID</Label>
                <Input type="number" id="conductor_id" name="conductor_id" />
              </div>
              <div>
                <Label htmlFor="status">Status *</Label>
                <Select name="status" defaultValue="active" required>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="in maintenance">
                      In Maintenance
                    </SelectItem>
                    <SelectItem value="in transit">In Transit</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="next_maintenance">Next Maintenance</Label>
                <Input
                  type="date"
                  id="next_maintenance"
                  name="next_maintenance"
                />
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsAddModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  <Save className="mr-2 h-4 w-4" />
                  Add Bus
                </Button>
              </DialogFooter>
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
              className="space-y-4"
            >
              <Input
                type="hidden"
                name="company_id"
                defaultValue={props.userData.company_id}
              />
              <div>
                <Label htmlFor="full_name">Full Name *</Label>
                <Input type="text" id="full_name" name="full_name" required />
              </div>
              <div>
                <Label htmlFor="license_number">License Number *</Label>
                <Input
                  type="text"
                  id="license_number"
                  name="license_number"
                  required
                />
              </div>
              <div>
                <Label htmlFor="contact_number">Contact Number *</Label>
                <Input
                  type="tel"
                  id="contact_number"
                  name="contact_number"
                  required
                />
              </div>
              <div>
                <Label htmlFor="bus_id">Bus ID</Label>
                <Input type="text" id="bus_id" name="bus_id" />
              </div>
              <div>
                <Label htmlFor="status">Status *</Label>
                <Select name="status" defaultValue="active" required>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsAddModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  <Save className="mr-2 h-4 w-4" />
                  Add Driver
                </Button>
              </DialogFooter>
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
              className="space-y-4"
            >
              <Input
                type="hidden"
                name="company_id"
                defaultValue={props.userData.company_id}
              />
              <div>
                <Label htmlFor="name">Name *</Label>
                <Input type="text" id="name" name="name" required />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input type="email" id="email" name="email" required />
              </div>
              <div>
                <Label htmlFor="contact_number">Contact Number *</Label>
                <Input
                  type="tel"
                  id="contact_number"
                  name="contact_number"
                  required
                />
              </div>
              <div>
                <Label htmlFor="bus_id">Bus ID</Label>
                <Input type="text" id="bus_id" name="bus_id" />
              </div>
              <div>
                <Label htmlFor="status">Status *</Label>
                <Select name="status" defaultValue="active" required>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsAddModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  <Save className="mr-2 h-4 w-4" />
                  Add Conductor
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Edit {currentTab.charAt(0).toUpperCase() + currentTab.slice(1)}
            </DialogTitle>
            <DialogDescription>
              Update the details of the {currentTab}.
            </DialogDescription>
          </DialogHeader>

          {editBus && currentTab === 'bus' && (
            <form
              onSubmit={(e) =>
                handleEditBus(
                  e,
                  () => {
                    props.refreshData();
                    setIsEditModalOpen(false);
                    setEditBus(null);
                  },
                  editBus
                )
              }
              className="space-y-4"
            >
              <Input
                type="hidden"
                name="user_id"
                defaultValue={editBus.bus_id}
              />
              <div>
                <Label htmlFor="edit_bus_id">Bus ID *</Label>
                <Input
                  type="text"
                  id="edit_bus_id"
                  defaultValue={editBus.bus_id}
                  disabled
                />
              </div>
              <div>
                <Label htmlFor="edit_route_id">Route ID</Label>
                <Input
                  type="text"
                  id="edit_route_id"
                  name="route_id"
                  defaultValue={editBus.route_id || ''}
                />
              </div>
              <div>
                <Label htmlFor="edit_driver_id">Driver ID</Label>
                <Input
                  type="number"
                  id="edit_driver_id"
                  name="driver_id"
                  defaultValue={editBus.driver_id || ''}
                />
              </div>
              <div>
                <Label htmlFor="edit_conductor_id">Conductor ID</Label>
                <Input
                  type="number"
                  id="edit_conductor_id"
                  name="conductor_id"
                  defaultValue={editBus.conductor_id || ''}
                />
              </div>
              <div>
                <Label htmlFor="edit_status">Status *</Label>
                <Select name="status" defaultValue={editBus.status} required>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="in maintenance">
                      In Maintenance
                    </SelectItem>
                    <SelectItem value="in transit">In Transit</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit_next_maintenance">Next Maintenance</Label>
                <Input
                  type="date"
                  id="edit_next_maintenance"
                  name="next_maintenance"
                  defaultValue={editBus.next_maintenance || ''}
                />
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsEditModalOpen(false);
                    setEditBus(null);
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  <Save className="mr-2 h-4 w-4" />
                  Update Bus
                </Button>
              </DialogFooter>
            </form>
          )}

          {editDriver && currentTab === 'driver' && (
            <form
              onSubmit={(e) =>
                handleEditDriver(
                  e,
                  () => {
                    props.refreshData();
                    setIsEditModalOpen(false);
                    setEditDriver(null);
                  },
                  editDriver
                )
              }
              className="space-y-4"
            >
              <Input
                type="hidden"
                name="user_id"
                defaultValue={editDriver.driver_id}
              />
              <div>
                <Label htmlFor="edit_full_name">Full Name *</Label>
                <Input
                  type="text"
                  id="edit_full_name"
                  name="full_name"
                  defaultValue={editDriver.full_name}
                  required
                />
              </div>
              <div>
                <Label htmlFor="edit_license_number">License Number *</Label>
                <Input
                  type="text"
                  id="edit_license_number"
                  name="license_number"
                  defaultValue={editDriver.license_number}
                  required
                />
              </div>
              <div>
                <Label htmlFor="edit_contact_number">Contact Number *</Label>
                <Input
                  type="tel"
                  id="edit_contact_number"
                  name="contact_number"
                  defaultValue={editDriver.contact_number}
                  required
                />
              </div>
              <div>
                <Label htmlFor="edit_bus_id">Bus ID</Label>
                <Input
                  type="text"
                  id="edit_bus_id"
                  name="bus_id"
                  defaultValue={editDriver.bus_id || ''}
                />
              </div>
              <div>
                <Label htmlFor="edit_status">Status *</Label>
                <Select name="status" defaultValue={editDriver.status} required>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsEditModalOpen(false);
                    setEditDriver(null);
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  <Save className="mr-2 h-4 w-4" />
                  Update Driver
                </Button>
              </DialogFooter>
            </form>
          )}

          {editConductor && currentTab === 'conductor' && (
            <form
              onSubmit={(e) =>
                handleEditConductor(
                  e,
                  () => {
                    props.refreshData();
                    setIsEditModalOpen(false);
                    setEditConductor(null);
                  },
                  editConductor
                )
              }
              className="space-y-4"
            >
              <Input
                type="hidden"
                name="user_id"
                defaultValue={editConductor.conductor_id}
              />
              <div>
                <Label htmlFor="edit_name">Name *</Label>
                <Input
                  type="text"
                  id="edit_name"
                  name="name"
                  defaultValue={editConductor.name}
                  required
                />
              </div>
              <div>
                <Label htmlFor="edit_email">Email *</Label>
                <Input
                  type="email"
                  id="edit_email"
                  name="email"
                  defaultValue={editConductor.email}
                  required
                />
              </div>
              <div>
                <Label htmlFor="edit_contact_number">Contact Number *</Label>
                <Input
                  type="tel"
                  id="edit_contact_number"
                  name="contact_number"
                  defaultValue={editConductor.contact_number}
                  required
                />
              </div>
              <div>
                <Label htmlFor="edit_bus_id">Bus ID</Label>
                <Input
                  type="text"
                  id="edit_bus_id"
                  name="bus_id"
                  defaultValue={editConductor.bus_id || ''}
                />
              </div>
              <div>
                <Label htmlFor="edit_status">Status *</Label>
                <Select
                  name="status"
                  defaultValue={editConductor.status}
                  required
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsEditModalOpen(false);
                    setEditConductor(null);
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  <Save className="mr-2 h-4 w-4" />
                  Update Conductor
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* View Bus Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Bus Details</DialogTitle>
          </DialogHeader>
          {selectedBus && (
            <div className="space-y-4">
              <div>
                <Label className="text-muted-foreground text-sm">Bus ID</Label>
                <p className="font-medium">{selectedBus.bus_id}</p>
              </div>
              <div>
                <Label className="text-muted-foreground text-sm">Route</Label>
                <p className="font-medium">{selectedBus.route_id || 'N/A'}</p>
              </div>
              <div>
                <Label className="text-muted-foreground text-sm">
                  Driver ID
                </Label>
                <p className="font-medium">{selectedBus.driver_id || 'N/A'}</p>
              </div>
              <div>
                <Label className="text-muted-foreground text-sm">
                  Conductor ID
                </Label>
                <p className="font-medium">
                  {selectedBus.conductor_id || 'N/A'}
                </p>
              </div>
              <div>
                <Label className="text-muted-foreground text-sm">Status</Label>
                <p className="font-medium capitalize">{selectedBus.status}</p>
              </div>
              <div>
                <Label className="text-muted-foreground text-sm">
                  Next Maintenance
                </Label>
                <p className="font-medium">
                  {selectedBus.next_maintenance || 'N/A'}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* View Driver Modal */}
      <Dialog open={isDriverModalOpen} onOpenChange={setIsDriverModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Driver Details</DialogTitle>
          </DialogHeader>
          {selectedDriver && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="bg-muted flex h-16 w-16 items-center justify-center rounded-full text-lg font-semibold">
                  {getInitials(selectedDriver.full_name)}
                </div>
                <div>
                  <p className="text-lg font-semibold">
                    {selectedDriver.full_name}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    ID: {selectedDriver.driver_id}
                  </p>
                </div>
              </div>
              <div>
                <Label className="text-muted-foreground text-sm">
                  License Number
                </Label>
                <p className="font-medium">{selectedDriver.license_number}</p>
              </div>
              <div>
                <Label className="text-muted-foreground text-sm">
                  Contact Number
                </Label>
                <p className="font-medium">{selectedDriver.contact_number}</p>
              </div>
              <div>
                <Label className="text-muted-foreground text-sm">Bus ID</Label>
                <p className="font-medium">{selectedDriver.bus_id || 'N/A'}</p>
              </div>
              <div>
                <Label className="text-muted-foreground text-sm">Status</Label>
                <p className="font-medium capitalize">
                  {selectedDriver.status}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* View Conductor Modal */}
      <Dialog
        open={isConductorModalOpen}
        onOpenChange={setIsConductorModalOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Conductor Details</DialogTitle>
          </DialogHeader>
          {selectedConductor && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="bg-muted flex h-16 w-16 items-center justify-center rounded-full text-lg font-semibold">
                  {getInitials(selectedConductor.name)}
                </div>
                <div>
                  <p className="text-lg font-semibold">
                    {selectedConductor.name}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    ID: {selectedConductor.conductor_id}
                  </p>
                </div>
              </div>
              <div>
                <Label className="text-muted-foreground text-sm">Email</Label>
                <p className="font-medium">{selectedConductor.email}</p>
              </div>
              <div>
                <Label className="text-muted-foreground text-sm">
                  Contact Number
                </Label>
                <p className="font-medium">
                  {selectedConductor.contact_number}
                </p>
              </div>
              <div>
                <Label className="text-muted-foreground text-sm">Bus ID</Label>
                <p className="font-medium">
                  {selectedConductor.bus_id || 'N/A'}
                </p>
              </div>
              <div>
                <Label className="text-muted-foreground text-sm">Status</Label>
                <p className="font-medium capitalize">
                  {selectedConductor.status}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FleetStatus;
