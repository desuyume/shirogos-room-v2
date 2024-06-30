import { CREATE_MANUAL_TASK_KEY, MANUAL_TASKS_KEY } from '@/consts/queryKeys'
import manualTaskService from '@/services/manual-task.service'
import { ICreateManualTasK } from '@/types/manual-task.interface'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useCreateManualTask = () => {
	const queryClient = useQueryClient()

	return useMutation(
		[CREATE_MANUAL_TASK_KEY],
		(task: ICreateManualTasK) => manualTaskService.create(task),
		{
			onSettled: () => {
				queryClient.invalidateQueries([MANUAL_TASKS_KEY])
			},
		}
	)
}
