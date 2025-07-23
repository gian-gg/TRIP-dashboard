import { toast } from 'sonner';
import APICall from '@/lib/api';

import type {
  BusInformationType,
  DriverInformationType,
  ConductorInformationType,
} from '../type';

const handleEditConductor = async (
  e: React.FormEvent<HTMLFormElement>,
  refreshData: () => void,
  data?: ConductorInformationType
) => {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);

  const id = Number(formData.get('user_id'));
  const fullName = formData.get('full_name') as string;
  const email = formData.get('email') as string;
  const contactNumber = formData.get('contact_number') as string;
  const busId = (formData.get('bus_id') as string) || null;

  if (
    data &&
    data.conductor_id == id &&
    data.name === fullName &&
    data.email === email &&
    data.contact_number === contactNumber &&
    data.bus_id === busId
  ) {
    toast.warning('No changes detected. Please modify at least one field.');
    return;
  }

  if (!/^9\d{9}$/.test(contactNumber)) {
    toast.warning(
      'Please enter a valid phone number that starts with 9 and has 10 digits.'
    );
    return;
  }

  await APICall({
    type: 'PUT',
    url: '/conductor/index.php',
    body: {
      conductor_id: id,
      name: fullName,
      email: email,
      contact_number: contactNumber,
      bus_id: busId ? busId : null,
    },
    consoleLabel: 'Edit Conductor Response',
    success: () => {
      refreshData();
      toast.success('Conductor updated successfully');
    },
    error: (error) => {
      toast.error(error.message || 'Unknown error');
    },
  });
};

const handleEditDriver = async (
  e: React.FormEvent<HTMLFormElement>,
  refreshData: () => void,
  data?: DriverInformationType
) => {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);

  const id = Number(formData.get('user_id'));
  const fullName = formData.get('full_name') as string;
  const licenseNumber = formData.get('license_number') as string;
  const contactNumber = formData.get('contact_number') as string;
  const busId = (formData.get('bus_id') as string) || null;

  if (
    data &&
    data.driver_id == id &&
    data.full_name === fullName &&
    data.license_number === licenseNumber &&
    data.contact_number === contactNumber &&
    data.bus_id === busId
  ) {
    toast.warning('No changes detected. Please modify at least one field.');
    return;
  }

  if (!/^9\d{9}$/.test(contactNumber)) {
    toast.warning(
      'Please enter a valid phone number that starts with 9 and has 10 digits.'
    );
    return;
  }

  await APICall({
    type: 'PUT',
    url: '/driver/index.php',
    body: {
      driver_id: id,
      full_name: fullName,
      license_number: licenseNumber,
      contact_number: contactNumber,
      bus_id: busId ? busId : null,
    },
    consoleLabel: 'Edit Driver Response',
    success: () => {
      refreshData();
      toast.success('Driver updated successfully');
    },
    error: (error) => {
      toast.error(error.message || 'Unknown error');
    },
  });
};

const handleEditBus = async (
  e: React.FormEvent<HTMLFormElement>,
  refreshData: () => void,
  data?: BusInformationType
) => {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);

  const busID = formData.get('user_id') as string;
  const routeID = formData.get('route_id') as string | null;
  const driverID = Number(formData.get('driver_id')) || null;
  const conductorID = Number(formData.get('conductor_id')) || null;
  const status = formData.get('status') as string;
  const nextMaintenance = formData.get('next_maintenance') as string;

  if (
    data &&
    data.bus_id === busID &&
    data.route_id === routeID &&
    data.driver_id === driverID &&
    data.conductor_id === conductorID &&
    data.status === status &&
    data.next_maintenance === nextMaintenance
  ) {
    toast.warning('No changes detected. Please modify at least one field.');
    return;
  }

  await APICall({
    type: 'PUT',
    url: '/bus/index.php',
    body: {
      bus_id: busID,
      route_id: status === 'active' ? routeID : null,
      driver_id: status === 'active' ? driverID : null,
      conductor_id: status === 'active' ? conductorID : null,
      status: status,
      next_maintenance: nextMaintenance,
    },
    consoleLabel: 'Edit Bus Response',
    success: () => {
      refreshData();
      toast.success('Bus updated successfully');
    },
    error: (error) => {
      toast.error(error.message || 'Unknown error');
    },
  });
};

export { handleEditConductor, handleEditDriver, handleEditBus };
