import { MY_TASKS_WITH_RESPONSES_KEY } from '@/consts/queryKeys'
import manualTaskService from '@/services/manual-task.service'
import { useQuery } from '@tanstack/react-query'

export const useMyTasksWithResponses = () => {
	return useQuery(
		[MY_TASKS_WITH_RESPONSES_KEY],
		() => manualTaskService.getMyTasksWithResponses(),
		{
			select: ({ data }) => data,
		}
	)
}
