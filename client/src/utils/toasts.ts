import { toast } from 'react-toastify'

// success toasts
export const successBuyToast = () => toast.success('Приобретение приобретено !')
export const successToast = () => toast.success('Успешно выполнено !')

// error toasts
export const notEnoughDangoToast = () => toast.error('Нужно больше данго (Богу Данго) !')
export const usernameAlreadyExistsToast = () =>
  toast.error('Пользователь с таким никнеймом уже существует !')

// warning toasts
export const needUrlToast = () => toast.warning('В этом поле нужна только ссылка !')
export const usernameLengthToast = () =>
  toast.warning('Длина никнейма должна состоять от 3 до 25 символов !')
export const roomNameLengthToast = () =>
  toast.warning('В названии комнаты должно быть от 3 до 34 символов !')
export const unexpectedErrorToast = () => toast.warning('Непредвиденная ошибка !')
