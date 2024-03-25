import { ROOM_APPEARANCE_KEY } from '@/consts/queryKeys'
import roomService from '@/services/room.service'
import { useQuery } from '@tanstack/react-query'

export const useRoomAppearance = (isEnabled: boolean) => {
	return useQuery(
		[ROOM_APPEARANCE_KEY],
		() => roomService.getRoomAppearance(),
		{
			select: ({ data }) => data,
			retry: false,
			refetchOnWindowFocus: false,
			enabled: isEnabled
		}
	)
}
