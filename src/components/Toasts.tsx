import { toast } from 'sonner';

const ConfirmToast = (actionLabel: string, handleAction: () => void) => {
  toast.warning('Are you Sure?', {
    action: {
      label: actionLabel,
      onClick: handleAction,
    },
    actionButtonStyle: {
      backgroundColor: '#DC7609',
      color: '#FEFCF1',
      padding: '1rem',
    },
  });
};

export { ConfirmToast };
