import { UNIQUE_BACKGROUNDS_KEY } from '@/consts/queryKeys'
import backgroundService from '@/services/background.service'
import { useQuery } from '@tanstack/react-query'

export const useUniqueBackgrounds = () => {
  return useQuery([UNIQUE_BACKGROUNDS_KEY], () => backgroundService.getUnique(), {
    select: ({ data }) => data
  })
}
