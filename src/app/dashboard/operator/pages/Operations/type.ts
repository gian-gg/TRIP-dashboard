interface BusInformationType {
  bus_id: string;
  route_id: string;
  driver_id: number;
  conductor_id: number;
  status: 'active' | 'inactive' | 'in maintenance' | 'in transit';
  next_maintenance: string;
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
