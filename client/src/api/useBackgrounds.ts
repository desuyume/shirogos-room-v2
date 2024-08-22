import { BACKGROUNDS_KEY } from '@/consts/queryKeys'
import backgroundService from '@/services/background.service'
import { useQuery } from '@tanstack/react-query'

export const useBackgrounds = () => {
  return useQuery([BACKGROUNDS_KEY], () => backgroundService.getAll(), {
    select: ({ data }) => data
  })
}
