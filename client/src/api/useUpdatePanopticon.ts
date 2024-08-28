import { PANOPTICONS_KEY, UPDATE_PANOPTICON_KEY } from '@/consts/queryKeys'
import panopticonService from '@/services/panopticon.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useUpdatePanopticon = (id: number | null) => {
  const queryClient = useQueryClient()

  return useMutation(
    [UPDATE_PANOPTICON_KEY],
    (data: FormData) => panopticonService.update(id, data),
    {
      onSettled: () => {
        queryClient.invalidateQueries([PANOPTICONS_KEY])
      }
    }
  )
}
