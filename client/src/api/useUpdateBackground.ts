import { BACKGROUNDS_KEY, UPDATE_BACKGROUND_KEY } from '@/consts/queryKeys'
import backgroundService from '@/services/background.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useUpdateBackground = (id: number | null) => {
  const queryClient = useQueryClient()

  return useMutation(
    [UPDATE_BACKGROUND_KEY],
    (data: FormData) => backgroundService.update(id, data),
    {
      onSettled: () => {
        queryClient.invalidateQueries([BACKGROUNDS_KEY])
      }
    }
  )
}
