import { ACCEPT_TASK_RESPONSE_KEY, MANUAL_TASKS_KEY, TASK_RESPONSES_KEY } from '@/consts/queryKeys'
import manualTaskService from '@/services/manual-task.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useAcceptTaskResponse = (responseId: number) => {
  const queryClient = useQueryClient()

  return useMutation(
    [ACCEPT_TASK_RESPONSE_KEY],
    () => manualTaskService.acceptResponse(responseId),
    {
      onSettled: () => {
        queryClient.invalidateQueries([TASK_RESPONSES_KEY])
        queryClient.invalidateQueries([MANUAL_TASKS_KEY])
      }
    }
  )
}
