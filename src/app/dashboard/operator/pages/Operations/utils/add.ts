import { toast } from 'sonner';
import APICall from '@/lib/api';

const handleAddConductor = async (
  e: React.FormEvent<HTMLFormElement>,
  refreshData: () => void
) => {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);

  const fullName = formData.get('full_name') as string;
  const contactNumber = formData.get('contact_number') as string;
  const email = formData.get('email') as string;
  const companyID = formData.get('company_id') as string;

  if (!/^9\d{9}$/.test(contactNumber)) {
    toast.warning(
      'Please enter a valid phone number that starts with 9 and has 10 digits.'
    );
    return;
  }

  await APICall({
    type: 'POST',
    url: '/conductor/index.php',
    body: {
      name: fullName,
      contact_number: contactNumber,
      email: email,
      company_id: companyID,
    },
    consoleLabel: 'Add Conductor Response',
    success: () => {
      refreshData();
      toast.success('Conductor added successfully');
    },
    error: (error) => {
      toast.error(error.message || 'Unknown error');
    },
  });
};

const handleAddDriver = async (
  e: React.FormEvent<HTMLFormElement>,
  refreshData: () => void
) => {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);

  const fullName = formData.get('full_name') as string;
  const contactNumber = formData.get('contact_number') as string;
  const licenseNumber = formData.get('license_number') as string;
  const companyID = formData.get('company_id') as string;

  if (!/^9\d{9}$/.test(contactNumber)) {
    toast.warning(
      'Please enter a valid phone number that starts with 9 and has 10 digits.'
    );
    return;
  }

  await APICall({
    type: 'POST',
    url: '/driver/index.php',
    body: {
      full_name: fullName,
      contact_number: contactNumber,
      license_number: licenseNumber,
      company_id: companyID,
    },
    consoleLabel: 'Add Driver Response',
    success: () => {
      refreshData();
      toast.success('Driver added successfully');
    },
    error: (error) => {
      toast.error(error.message || 'Unknown error');
    },
  });
};

const handleAddBus = async (
  e: React.FormEvent<HTMLFormElement>,
  refreshData: () => void
) => {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  const busID = formData.get('bus_id') as string;
  const companyID = formData.get('company_id') as string;

  await APICall({
    type: 'POST',
    url: '/bus/index.php',
    body: {
      bus_id: busID,
      company_id: companyID,
    },
    consoleLabel: 'Add Bus Response',
    success: () => {
      refreshData();
      toast.success('Bus added successfully');
    },
    error: (error) => {
      toast.error(error.message || 'Unknown error');
    },
  });
};

export { handleAddConductor, handleAddDriver, handleAddBus };
