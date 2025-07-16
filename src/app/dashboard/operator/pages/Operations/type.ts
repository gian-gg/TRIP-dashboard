interface BusInformationType {
  bus_id: number;
  route_id: string;
  driver_id: number;
  conductor_id: number;
  passenger_count: number;
  curr_location: string;
  status: 'active' | 'inactive' | 'in transit';
}

interface DriverInformationType {
  driver_id: number;
  full_name: string;
  license_number: string;
  contact_number: string;
  bus_id?: number;
}

interface ConductorInformationType {
  conductor_id: number;
  full_name: string;
  contact_number: string;
  bus_id?: number;
}

export type {
  BusInformationType,
  DriverInformationType,
  ConductorInformationType,
};
