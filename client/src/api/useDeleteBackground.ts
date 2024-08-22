import { useMutation, useQueryClient } from '@tanstack/react-query'
import { BACKGROUNDS_KEY } from '../consts/queryKeys'
import backgroundService from '@/services/background.service'

export const useDeleteBackground = (id: number | null) => {
  const queryClient = useQueryClient()

  return useMutation([BACKGROUNDS_KEY, id], () => backgroundService.delete(id), {
    onSettled: () => {
      queryClient.invalidateQueries([BACKGROUNDS_KEY])
    }
  })
}
