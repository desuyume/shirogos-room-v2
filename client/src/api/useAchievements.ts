import { ACHIEVEMENTS_KEY } from '@/consts/queryKeys'
import achievementService from '@/services/achievement.service'
import { useQuery } from '@tanstack/react-query'

export const useAchievements = () => {
  return useQuery([ACHIEVEMENTS_KEY], () => achievementService.getAll(), {
    select: ({ data }) => data
  })
}
