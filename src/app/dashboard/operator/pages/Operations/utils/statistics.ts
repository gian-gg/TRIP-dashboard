import type {
  BusInformationType,
  DriverInformationType,
  ConductorInformationType,
} from '../type';

export interface FleetStatistics {
  totalBuses: number;
  activeBuses: number;
  maintenanceBuses: number;
  totalDrivers: number;
  activeDrivers: number;
  totalConductors: number;
  activeConductors: number;
}

export const calculateFleetStatistics = (
  busData: BusInformationType[],
  driverData: DriverInformationType[],
  conductorData: ConductorInformationType[]
): FleetStatistics => {
  const totalBuses = busData.length;
  const activeBuses = busData.filter((bus) => bus.status === 'active').length;
  const maintenanceBuses = busData.filter((bus) => {
    if (!bus.next_maintenance) return false;
    return new Date(bus.next_maintenance) < new Date();
  }).length;

  const totalDrivers = driverData.length;
  const activeDrivers = driverData.filter(
    (driver) => driver.status === 'active'
  ).length;

  const totalConductors = conductorData.length;
  const activeConductors = conductorData.filter(
    (conductor) => conductor.status === 'active'
  ).length;

  return {
    totalBuses,
    activeBuses,
    maintenanceBuses,
    totalDrivers,
    activeDrivers,
    totalConductors,
    activeConductors,
  };
};
