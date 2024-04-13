import { toast } from "react-toastify";

export enum NotificationType {
  SUCCESS = 'success',
  ERROR = 'error',
  INFO = 'info',
  WARNING = 'warning',
}

interface Props {
  message: string;
  type: NotificationType
}

export function toasty({ message, type }: Props) {
  const notify = () => toast(message, {
    type: type
  });

  notify();
}