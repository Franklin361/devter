import toast, { ToastPosition, ToastType } from 'react-hot-toast'

interface Props {
  msg: string
  duration?: number
  position?: ToastPosition
  typeToast?: ToastType
}

export const showToast = ({
  msg,
  duration = 4000,
  position = 'bottom-right',
  typeToast = 'success'
}: Props) => {
  ;(toast as any)[typeToast](msg, {
    duration,
    position,
    id: 'franko',
    style: {
      background: '#0C0E12',
      color: '#A6ADBA',
      padding: '1rem'
    }
  })
}
