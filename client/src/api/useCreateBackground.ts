import { BACKGROUNDS_KEY, CREATE_BACKGROUND_KEY } from '@/consts/queryKeys'
import backgroundService from '@/services/background.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useCreateBackground = () => {
  const queryClient = useQueryClient()

  return useMutation(
    [CREATE_BACKGROUND_KEY],
    (frame: FormData) => backgroundService.create(frame),
    {
      onSettled: () => {
        queryClient.invalidateQueries([BACKGROUNDS_KEY])
      }
    }
  )
}
