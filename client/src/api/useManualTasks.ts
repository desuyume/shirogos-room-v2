import { MANUAL_TASKS_KEY } from '@/consts/queryKeys'
import manualTaskService from '@/services/manual-task.service'
import { useQuery } from '@tanstack/react-query'

export const useManualTasks = () => {
  return useQuery([MANUAL_TASKS_KEY], () => manualTaskService.getAll(), {
    select: ({ data }) => data
  })
}
