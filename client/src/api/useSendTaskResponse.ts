import {
	MY_TASKS_WITH_RESPONSES_KEY,
	SEND_TASK_RESPONSE_KEY,
} from '@/consts/queryKeys'
import manualTaskService from '@/services/manual-task.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useSendTaskResponse = (id: number) => {
	const queryClient = useQueryClient()

	return useMutation(
		[SEND_TASK_RESPONSE_KEY, id],
		(data: FormData) => manualTaskService.sendResponse(id, data),
		{
			onSettled: () => {
				queryClient.invalidateQueries([MY_TASKS_WITH_RESPONSES_KEY])
			},
		}
	)
}
