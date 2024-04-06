import { ROOMS_BY_LEVEL_KEY } from '@/consts/queryKeys'
import roomGuideService from '@/services/room-guide.service'
import { useQuery } from '@tanstack/react-query'

export const useRoomsByLevel = (limit: number = 10, page: number = 1) => {
	return useQuery(
		[ROOMS_BY_LEVEL_KEY, limit, page],
		() => roomGuideService.getRoomsByLevel(limit, page),
		{
			select: ({ data }) => data,
			refetchOnWindowFocus: false,
		}
	)
}
