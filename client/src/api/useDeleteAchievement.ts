import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ACHIEVEMENTS_KEY } from '../consts/queryKeys'
import achievementService from '@/services/achievement.service'

export const useDeleteAchievement = (id: number | null) => {
  const queryClient = useQueryClient()

  return useMutation([ACHIEVEMENTS_KEY, id], () => achievementService.remove(id), {
    onSettled: () => {
      queryClient.invalidateQueries([ACHIEVEMENTS_KEY])
    }
  })
}
