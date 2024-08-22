import { CHRONICLE_EVENTS_KEY } from '@/consts/queryKeys'
import chronicleService from '@/services/chronicle.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useDeleteChronicleEvent = (id: number, chronicleId: number) => {
  const queryClient = useQueryClient()

  return useMutation([CHRONICLE_EVENTS_KEY, id], () => chronicleService.deleteEvent(id), {
    onSettled: () => {
      queryClient.invalidateQueries([CHRONICLE_EVENTS_KEY, chronicleId])
    }
  })
}
