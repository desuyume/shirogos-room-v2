import { PANOPTICONS_KEY } from '@/consts/queryKeys'
import panopticonService from '@/services/panopticon.service'
import { useQuery } from '@tanstack/react-query'

export const usePanopticons = () => {
  return useQuery([PANOPTICONS_KEY], () => panopticonService.getAll(), {
    select: ({ data }) => data
  })
}
