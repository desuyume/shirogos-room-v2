import { USER_ROOM_COLORS_KEY } from '@/consts/queryKeys'
import roomService from '@/services/room.service'
import { useQuery } from '@tanstack/react-query'

export const useUserRoomColors = () => {
	return useQuery([USER_ROOM_COLORS_KEY], () => roomService.getUserRoomColors(), {
		select: ({ data }) => data,
	})
}
