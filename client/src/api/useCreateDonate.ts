import { CREATE_DONATE_KEY } from '@/consts/queryKeys'
import donateService from '@/services/donate.service'
import { ICreateDonate } from '@/types/donate.interface'
import { useMutation } from '@tanstack/react-query'

export const useCreateDonate = () => {
  return useMutation([CREATE_DONATE_KEY], (donate: ICreateDonate) => donateService.create(donate))
}
