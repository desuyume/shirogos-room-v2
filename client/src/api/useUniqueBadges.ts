import { UNIQUE_BADGES_KEY } from '@/consts/queryKeys'
import badgeService from '@/services/badge.service'
import { useQuery } from '@tanstack/react-query'

export const useUniqueBadges = () => {
  return useQuery([UNIQUE_BADGES_KEY], () => badgeService.getUnique(), {
    select: ({ data }) => data
  })
}
