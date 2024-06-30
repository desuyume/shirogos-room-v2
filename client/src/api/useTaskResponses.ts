import { TASK_RESPONSES_KEY } from '@/consts/queryKeys'
import manualTaskService from '@/services/manual-task.service'
import { useQuery } from '@tanstack/react-query'

export const useTaskResponses = (id: number) => {
	return useQuery(
		[TASK_RESPONSES_KEY, id],
		() => manualTaskService.getTaskResponses(id),
		{
			select: ({ data }) => data,
		}
	)
}
