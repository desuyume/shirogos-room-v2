import { ACHIEVEMENTS_KEY } from '@/consts/queryKeys'
import achievementService from '@/services/achievement.service'
import { useQuery } from '@tanstack/react-query'

export const useAchievementsByUsername = (username: string) => {
	return useQuery(
		[ACHIEVEMENTS_KEY, username],
		() => achievementService.getByUsername(username),
		{
			select: ({ data }) => data,
		}
	)
}
