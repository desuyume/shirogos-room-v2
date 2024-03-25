import { ROOM_APPEARANCE_KEY, USERNAME_COLOR_KEY } from '@/consts/queryKeys'
import roomService from '@/services/room.service'
import { IChangeRoomColor } from '@/types/room.interface'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useChangeUsernameColor = () => {
	const queryClient = useQueryClient()

	return useMutation([USERNAME_COLOR_KEY], (data: IChangeRoomColor) =>
		roomService.changeUsernameColor(data),
		{
			onSettled: () => {
				queryClient.invalidateQueries([USERNAME_COLOR_KEY])
				queryClient.invalidateQueries([ROOM_APPEARANCE_KEY])
			}
		}
	)
}
