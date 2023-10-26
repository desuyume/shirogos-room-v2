import { USER_STATS_KEY } from '@/consts/queryKeys'
import userStatsService from '@/services/user-stats.service'
import { IAddUserStats } from '@/types/user.interface'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useAddUserStats = (id: number | null, type: string) => {
	const queryClient = useQueryClient()

	return useMutation(
		[USER_STATS_KEY, id],
		(stats: IAddUserStats) => userStatsService.add(id, type, stats),
		{
			onSettled: () => {
				queryClient.invalidateQueries([USER_STATS_KEY, id])
			},
		}
	)
}
