import { DONATE_KEY } from '@/consts/queryKeys'
import donateService from '@/services/donate.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useDeleteDonate = (id: number) => {
	const queryClient = useQueryClient()

	return useMutation([DONATE_KEY, id], (id: number) => donateService.delete(id), {
		onSettled: () => {
			queryClient.invalidateQueries([DONATE_KEY])
		}
	})
}
