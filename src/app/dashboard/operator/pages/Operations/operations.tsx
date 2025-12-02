import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { BusTable } from './components/BusTable';
import { DriverTable } from './components/DriverTable';
import { ConductorTable } from './components/ConductorTable';
import { StatisticsCards } from './components/StatisticsCards';
import BusAdd from './components/BusAdd';
import DriverAdd from './components/DriverAdd';
import ConductorAdd from './components/ConductorAdd';
import type {
  BusInformationType,
  DriverInformationType,
  ConductorInformationType,
} from './type';
import { Plus, Search, Printer } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { calculateFleetStatistics } from './utils/statistics';
import { generatePrintReport } from './utils/print';
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
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

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

  const statistics = calculateFleetStatistics(
    currentBusData,
    currentDriverData,
    currentConductorData
  );

  const handlePrint = () => {
    generatePrintReport(
      currentTab,
      filteredBusData,
      filteredDriverData,
      filteredConductorData,
      statistics,
      props.userData.company_id
    );
  };

  return (
    <>
      <StatisticsCards statistics={statistics} />

      {/* Add Modals */}
      {currentTab === 'bus' && (
        <BusAdd
          isOpen={isAddModalOpen}
          setIsOpen={setIsAddModalOpen}
          companyId={props.userData.company_id}
          refreshData={props.refreshData}
        />
      )}
      {currentTab === 'driver' && (
        <DriverAdd
          isOpen={isAddModalOpen}
          setIsOpen={setIsAddModalOpen}
          companyId={props.userData.company_id}
          refreshData={props.refreshData}
        />
      )}
      {currentTab === 'conductor' && (
        <ConductorAdd
          isOpen={isAddModalOpen}
          setIsOpen={setIsAddModalOpen}
          companyId={props.userData.company_id}
          refreshData={props.refreshData}
        />
      )}

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

        <div className="flex gap-2">
          <Button variant="outline" onClick={handlePrint}>
            <Printer className="mr-2 h-4 w-4" />
            Print PDF
          </Button>
          <Button onClick={() => setIsAddModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add {currentTab.charAt(0).toUpperCase() + currentTab.slice(1)}
          </Button>
        </div>
      </div>

      {/* Tables */}
      {currentTab === 'bus' && (
        <BusTable
          buses={filteredBusData}
          drivers={currentDriverData}
          conductors={currentConductorData}
          refreshData={props.refreshData}
        />
      )}

      {currentTab === 'driver' && (
        <DriverTable
          drivers={filteredDriverData}
          buses={currentBusData}
          refreshData={props.refreshData}
        />
      )}

      {currentTab === 'conductor' && (
        <ConductorTable
          conductors={filteredConductorData}
          buses={currentBusData}
          refreshData={props.refreshData}
        />
      )}
    </>
  );
};

export default FleetStatus;
