import { FRAMES_KEY, UPDATE_FRAME_KEY } from '@/consts/queryKeys'
import frameService from '@/services/frame.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useUpdateFrame = (id: number | null) => {
  const queryClient = useQueryClient()

  return useMutation(
    [UPDATE_FRAME_KEY],
    (data: FormData) => frameService.update(id, data),
    {
      onSettled: () => {
        queryClient.invalidateQueries([FRAMES_KEY])
      }
    }
  )
}
