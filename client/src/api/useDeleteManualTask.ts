import { useMutation, useQueryClient } from '@tanstack/react-query'
import { DELETE_MANUAL_TASK_KEY, MANUAL_TASKS_KEY } from '../consts/queryKeys'
import manualTaskService from '@/services/manual-task.service'

export const useDeleteManualTask = (id: number) => {
	const queryClient = useQueryClient()

	return useMutation(
		[DELETE_MANUAL_TASK_KEY],
		() => manualTaskService.delete(id),
		{
			onSettled: () => {
				queryClient.invalidateQueries([MANUAL_TASKS_KEY])
			},
		}
	)
}
