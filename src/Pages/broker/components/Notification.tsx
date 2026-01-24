import { notification } from 'antd';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

export const showNotification = (
  type: NotificationType,
  message: string,
  description: string
) => {
  notification[type]({
    message,
    description,
  });
};
