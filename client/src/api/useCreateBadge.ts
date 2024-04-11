import { BADGES_KEY, CREATE_BADGE_KEY } from '@/consts/queryKeys'
import badgeService from '@/services/badge.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useCreateBadge = () => {
	const queryClient = useQueryClient()

	return useMutation(
		[CREATE_BADGE_KEY],
		(badge: FormData) => badgeService.create(badge),
		{
			onSettled: () => {
				queryClient.invalidateQueries([BADGES_KEY])
			},
		}
	)
}
