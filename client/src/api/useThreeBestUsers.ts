import { RATING_THREE_BEST_KEY } from '@/consts/queryKeys'
import ratingService from '@/services/rating.service'
import { useQuery } from '@tanstack/react-query'

export const useThreeBestUsers = () => {
  return useQuery([RATING_THREE_BEST_KEY], () => ratingService.getThreeBestUsers(), {
    select: ({ data }) => data
  })
}
