import { successToast, unexpectedErrorToast } from '@/utils/toasts'
import { AxiosError } from 'axios'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

export const useToastOnError = (error: unknown, toastFn?: () => void) => {
  useEffect(() => {
    if (error instanceof AxiosError) {
      if (error.status !== 500) {
        !!toastFn ? toastFn() : toast.error(error.response?.data.message)
      } else {
        unexpectedErrorToast()
      }
    }
  }, [error])
}

export const useToastOnSuccess = (isSuccess: boolean, toastFn?: () => void) => {
  useEffect(() => {
    if (isSuccess) {
      !!toastFn ? toastFn() : successToast()
    }
  }, [isSuccess])
}
