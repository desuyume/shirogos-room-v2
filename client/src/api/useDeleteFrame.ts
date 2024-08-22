import { useMutation, useQueryClient } from '@tanstack/react-query'
import { FRAMES_KEY } from '../consts/queryKeys'
import frameService from '@/services/frame.service'

export const useDeleteFrame = (id: number | null) => {
  const queryClient = useQueryClient()

  return useMutation([FRAMES_KEY, id], () => frameService.delete(id), {
    onSettled: () => {
      queryClient.invalidateQueries([FRAMES_KEY])
    }
  })
}
