import { BADGE_KEY } from '@/consts/queryKeys'
import badgeService from '@/services/badge.service'
import { useQuery } from '@tanstack/react-query'

export const useBadge = () => {
	return useQuery([BADGE_KEY], () => badgeService.getAll(), {
		select: ({ data }) => data,
	})
}
