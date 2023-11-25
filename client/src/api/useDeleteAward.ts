import { AWARD_KEY } from '@/consts/queryKeys'
import awardService from '@/services/award.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useDeleteAward = (id: number) => {
	const queryClient = useQueryClient()

	return useMutation([AWARD_KEY, id], () => awardService.delete(id), {
		onSettled: () => {
			queryClient.invalidateQueries([AWARD_KEY])
		},
	})
}
