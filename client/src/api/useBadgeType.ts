import { BADGE_TYPE_KEY } from '@/consts/queryKeys'
import badgeService from '@/services/badge.service'
import { useQuery } from '@tanstack/react-query'

export const useBadgeType = () => {
	return useQuery([BADGE_TYPE_KEY], () => badgeService.getTypes(), {
		select: ({ data }) => data,
	})
}
