import { RANDOM_ROOMS_KEY } from '@/consts/queryKeys'
import roomGuideService from '@/services/room-guide.service'
import { useQuery } from '@tanstack/react-query'

export const useRandomRooms = () => {
	return useQuery([RANDOM_ROOMS_KEY], () => roomGuideService.getRandomRooms(), {
		select: ({ data }) => data,
		refetchOnWindowFocus: false,
	})
}
