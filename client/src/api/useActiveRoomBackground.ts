import { ACTIVE_BACKGROUND_KEY } from '@/consts/queryKeys'
import roomService from '@/services/room.service'
import { useQuery } from '@tanstack/react-query'

export const useActiveRoomBackground = () => {
	return useQuery(
		[ACTIVE_BACKGROUND_KEY],
		() => roomService.getActiveRoomBackground(),
		{
			select: ({ data }) => data,
		}
	)
}
