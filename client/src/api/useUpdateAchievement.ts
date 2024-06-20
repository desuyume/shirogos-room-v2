import { ACHIEVEMENTS_KEY } from '@/consts/queryKeys'
import achievementService from '@/services/achievement.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useUpdateAchievement = (id: number | null) => {
	const queryClient = useQueryClient()

	return useMutation(
		[ACHIEVEMENTS_KEY, id],
		(achieve: FormData) => achievementService.update(id, achieve),
		{
			onSettled: () => {
				queryClient.invalidateQueries([ACHIEVEMENTS_KEY])
			},
		}
	)
}
