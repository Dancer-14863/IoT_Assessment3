import { ToastProgrammatic as Toast } from 'buefy'

export const showToast = (message: string, type = 'is-success') => {
  Toast.open({
    message: message,
    type: type,
    pauseOnHover: true,
    queue: true,
    position: 'is-top',
  })
}
