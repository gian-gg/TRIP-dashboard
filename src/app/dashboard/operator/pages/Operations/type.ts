interface BusInformationType {
  bus_id: string;
  route_id: string;
  driver_id: number;
  conductor_id: number;
  status: 'active' | 'inactive' | 'in maintenance';
  next_maintenance: string;
  trips: {
    trip_id: string;
    route_id: string;
    boarding_time: string;
    arrival_time: string;
    total_passenger: string;
    total_revenue: string;
    driver_id: string;
    conductor_id: string;
    bus_id: string;
  }[];
}

interface DriverInformationType {
  driver_id: number;
  full_name: string;
  license_number: string;
  contact_number: string;
  bus_id: string;
  status: 'active' | 'inactive';
}

interface ConductorInformationType {
  conductor_id: number;
  name: string;
  contact_number: string;
  email: string;
  bus_id: string;
  status: 'active' | 'inactive';
}

export type {
  BusInformationType,
  DriverInformationType,
  ConductorInformationType,
};
