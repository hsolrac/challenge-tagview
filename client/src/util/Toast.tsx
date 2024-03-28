import { toast } from 'react-toastify';

export const Toast = (type: string, msg: string) => {
  const style = { style: { fontSize: 14 } };
  if (type === 'ok') {
    toast.success(msg, style);
  } else {
    toast.error(msg, style);
  }
};

