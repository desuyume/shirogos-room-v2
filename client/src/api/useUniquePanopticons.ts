import { UNIQUE_PANOPTICONS_KEY } from '@/consts/queryKeys'
import panopticonService from '@/services/panopticon.service'
import { useQuery } from '@tanstack/react-query'

export const useUniquePanopticons = () => {
  return useQuery([UNIQUE_PANOPTICONS_KEY], () => panopticonService.getUnique(), {
    select: ({ data }) => data
  })
}
