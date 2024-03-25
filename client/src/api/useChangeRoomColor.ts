import { ROOM_APPEARANCE_KEY, ROOM_COLOR_KEY } from '@/consts/queryKeys'
import roomService from '@/services/room.service'
import { IChangeRoomColor } from '@/types/room.interface'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useChangeRoomColor = () => {
	const queryClient = useQueryClient()

	return useMutation([ROOM_COLOR_KEY], (data: IChangeRoomColor) =>
		roomService.changeRoomColor(data),
		{
			onSettled: () => {
				queryClient.invalidateQueries([ROOM_COLOR_KEY])
				queryClient.invalidateQueries([ROOM_APPEARANCE_KEY])
			}
		}
	)
}
