import { ACHIEVEMENTS_KEY, CREATE_ACHIEVEMENT_KEY } from '@/consts/queryKeys'
import achievementService from '@/services/achievement.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useCreateAchievement = () => {
  const queryClient = useQueryClient()

  return useMutation(
    [CREATE_ACHIEVEMENT_KEY],
    (achieve: FormData) => achievementService.create(achieve),
    {
      onSettled: () => {
        queryClient.invalidateQueries([ACHIEVEMENTS_KEY])
      }
    }
  )
}
