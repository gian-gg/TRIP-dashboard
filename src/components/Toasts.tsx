import { toast } from 'sonner';

const ConfirmToast = (
  actionLabel: string,
  handleAction: () => void,
  description?: string
) => {
  toast.warning('Are you Sure?', {
    description: description,
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
