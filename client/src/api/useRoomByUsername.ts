import { ROOM_BY_USERNAME } from '@/consts/queryKeys'
import roomGuideService from '@/services/room-guide.service'
import { useQuery } from '@tanstack/react-query'

export const useRoomByUsername = (username: string) => {
	return useQuery(
		[ROOM_BY_USERNAME, username],
		() => roomGuideService.getRoomByUsername(username),
		{
			select: ({ data }) => data,
			refetchOnWindowFocus: false,
		}
	)
}
