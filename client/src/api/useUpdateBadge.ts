import { BADGES_KEY, UPDATE_BADGE_KEY } from '@/consts/queryKeys'
import badgeService from '@/services/badge.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useUpdateBadge = (id: number | null) => {
  const queryClient = useQueryClient()

  return useMutation(
    [UPDATE_BADGE_KEY],
    (data: FormData) => badgeService.update(id, data),
    {
      onSettled: () => {
        queryClient.invalidateQueries([BADGES_KEY])
      }
    }
  )
}
