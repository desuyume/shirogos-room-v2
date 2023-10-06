import { CHRONICLES_KEY } from '@/consts/queryKeys'
import chronicleService from '@/services/chronicle.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useDeleteChronicle = (id: number) => {
	const queryClient = useQueryClient()

	return useMutation([CHRONICLES_KEY, id], () => chronicleService.delete(id), {
		onSettled: () => {
			queryClient.invalidateQueries([CHRONICLES_KEY])
		},
	})
}
