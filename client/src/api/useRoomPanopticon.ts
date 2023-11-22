import { ROOM_PANOPTICON_KEY } from '@/consts/queryKeys'
import roomService from '@/services/room.service'
import { useQuery } from '@tanstack/react-query'

export const useRoomPanopticon = (panopticonId: number) => {
	return useQuery(
		[ROOM_PANOPTICON_KEY, panopticonId],
		() => roomService.getRoomPanopticon(panopticonId),
		{
			select: ({ data }) => data,
		}
	)
}
