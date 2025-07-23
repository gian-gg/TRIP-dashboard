import { toast } from 'sonner';
import APICall from '@/lib/api';
import { ConfirmToast } from '@/components/Toasts';

const handleDeleteConductor = (id: number, refreshData: () => void) => {
  ConfirmToast(
    'Delete',
    async () => {
      await APICall({
        type: 'DELETE',
        url: `/conductor/index.php?conductor_id=${id}`,
        consoleLabel: 'Delete Conductor Response',
        success: () => {
          refreshData();
          toast.success('Conductor deleted successfully');
        },
        error: (error) => {
          toast.error(error.message || 'Unknown error');
        },
      });
    },
    'This action cannot be undone.'
  );
};

const handleDeleteDriver = (id: number, refreshData: () => void) => {
  ConfirmToast(
    'Delete',
    async () => {
      await APICall({
        type: 'DELETE',
        url: `/driver/index.php?driver_id=${id}`,
        consoleLabel: 'Delete Driver Response',
        success: () => {
          refreshData();
          toast.success('Driver deleted successfully');
        },
        error: (error) => {
          toast.error(error.message || 'Unknown error');
        },
      });
    },
    'This action cannot be undone.'
  );
};

const handleDeleteBus = (id: string, refreshData: () => void) => {
  ConfirmToast(
    'Delete',
    async () => {
      await APICall({
        type: 'DELETE',
        url: `/bus/index.php?bus_id=${id}`,
        consoleLabel: 'Delete Bus Response',
        success: () => {
          refreshData();
          toast.success('Bus deleted successfully');
        },
        error: (error) => {
          toast.error(error.message || 'Unknown error');
        },
      });
    },
    'This action cannot be undone.'
  );
};

export { handleDeleteConductor, handleDeleteDriver, handleDeleteBus };
