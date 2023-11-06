import { ROOM_BACKGROUNDS_KEY } from '@/consts/queryKeys'
import roomService from '@/services/room.service'
import { useQuery } from '@tanstack/react-query'

export const useBuyedRoomBackgrounds = () => {
	return useQuery(
		[ROOM_BACKGROUNDS_KEY],
		() => roomService.getBuyedRoomBackgrounds(),
		{
			select: ({ data }) => data,
		}
	)
}
