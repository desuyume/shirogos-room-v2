import { MANUAL_TASKS_KEY, REJECT_TASK_RESPONSE_KEY, TASK_RESPONSES_KEY } from '@/consts/queryKeys'
import manualTaskService from '@/services/manual-task.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useRejectTaskResponse = (responseId: number) => {
  const queryClient = useQueryClient()

  return useMutation(
    [REJECT_TASK_RESPONSE_KEY],
    () => manualTaskService.rejectResponse(responseId),
    {
      onSettled: () => {
        queryClient.invalidateQueries([TASK_RESPONSES_KEY])
        queryClient.invalidateQueries([MANUAL_TASKS_KEY])
      }
    }
  )
}
