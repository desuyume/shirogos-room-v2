import { BUY_ROOM_COLOR_KEY, USER_PROFILE_KEY, USER_ROOM_COLORS_KEY } from '@/consts/queryKeys'
import roomService from '@/services/room.service'
import { IBuyRoomColor } from '@/types/room.interface'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useBuyRoomColor = (type: string) => {
	const queryClient = useQueryClient()

	return useMutation([BUY_ROOM_COLOR_KEY, type], (data: IBuyRoomColor) =>
		roomService.buyRoomColor(type, data),
		{
			onSettled: () => {
				queryClient.invalidateQueries([USER_ROOM_COLORS_KEY])
				queryClient.invalidateQueries([USER_PROFILE_KEY])
			}
		}
	)
}
