import { ACHIEVEMENTS_KEY } from '@/consts/queryKeys'
import achievementService from '@/services/achievement.service'
import { useQuery } from '@tanstack/react-query'

export const useAchievementsByTwitchLogin = (twitchLogin: string) => {
  return useQuery(
    [ACHIEVEMENTS_KEY, twitchLogin],
    () => achievementService.getByTwitchLogin(twitchLogin),
    {
      select: ({ data }) => data,
      enabled: !!twitchLogin
    }
  )
}
