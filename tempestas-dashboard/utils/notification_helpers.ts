import { NotificationProgrammatic as Notification } from 'buefy'

export const showNotification = (message: string, type = 'is-success') => {
  Notification.open({
    message: message,
    duration: 5000,
    type: type,
    pauseOnHover: true,
    queue: false,
    position: 'is-bottom-right',
  })
}
