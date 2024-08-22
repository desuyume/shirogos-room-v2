import { CHRONICLE_EVENTS_KEY, CREATE_CHRONICLE_EVENT_KEY } from '@/consts/queryKeys'
import chronicleService from '@/services/chronicle.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useCreateChronicleEvent = (id: number) => {
  const queryClient = useQueryClient()

  return useMutation(
    [CREATE_CHRONICLE_EVENT_KEY],
    (event: FormData) => chronicleService.createEvent(id, event),
    {
      onSettled: () => {
        queryClient.invalidateQueries([CHRONICLE_EVENTS_KEY, id])
      }
    }
  )
}
