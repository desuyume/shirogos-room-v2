import { BADGE_KEY } from '@/consts/queryKeys'
import badgeService from '@/services/badge.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useDeleteBadge = (id: number | null) => {
	const queryClient = useQueryClient()

	return useMutation([BADGE_KEY, id], () => badgeService.delete(id), {
		onSettled: () => {
			queryClient.invalidateQueries([BADGE_KEY])
		},
	})
}
