import { DONATES_KEY } from '@/consts/queryKeys'
import donateService from '@/services/donate.service'
import { useQuery } from '@tanstack/react-query'

export const useDonates = () => {
  return useQuery([DONATES_KEY], () => donateService.getAll(), {
    select: ({ data }) => data
  })
}
