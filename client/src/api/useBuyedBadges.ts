import { BUYED_BADGE_KEY } from '@/consts/queryKeys'
import roomService from '@/services/room.service'
import { useQuery } from '@tanstack/react-query'

export const useBuyedBadges = () => {
	return useQuery([BUYED_BADGE_KEY], () => roomService.getBuyedBadges(), {
		select: ({ data }) => data,
	})
}
