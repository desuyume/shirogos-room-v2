import { BOUTIQUE_BADGE_KEY, BUYED_BADGE_KEY, BUY_BADGE_KEY, USER_PROFILE_KEY } from '@/consts/queryKeys'
import roomService from '@/services/room.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useBuyBadge = () => {
	const queryClient = useQueryClient()

	return useMutation([BUY_BADGE_KEY], (badgeId: number) =>
		roomService.buyBoutiqueBadge(badgeId),
		{
			onSettled: () => {
				queryClient.invalidateQueries([BOUTIQUE_BADGE_KEY])
				queryClient.invalidateQueries([BUYED_BADGE_KEY])
				queryClient.invalidateQueries([USER_PROFILE_KEY])
			}
		}
	)
}
