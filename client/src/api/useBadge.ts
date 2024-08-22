import { BADGES_KEY } from '@/consts/queryKeys'
import badgeService from '@/services/badge.service'
import { useQuery } from '@tanstack/react-query'

export const useBadge = () => {
  return useQuery([BADGES_KEY], () => badgeService.getAll(), {
    select: ({ data }) => data
  })
}
