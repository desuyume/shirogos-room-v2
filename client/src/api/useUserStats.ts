import { USER_STATS_KEY } from '@/consts/queryKeys'
import userStatsService from '@/services/user-stats.service'
import { useQuery } from '@tanstack/react-query'

export const useUserStats = (id: number | null) => {
  return useQuery([USER_STATS_KEY, id], () => userStatsService.get(id), {
    select: ({ data }) => data,
    enabled: !!id
  })
}
