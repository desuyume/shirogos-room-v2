import { ROOM_KEY, ROOM_NAME_KEY } from '@/consts/queryKeys'
import roomService from '@/services/room.service'
import { IChangeRoomName } from '@/types/room.interface'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useChangeRoomName = () => {
	const queryClient = useQueryClient()

	return useMutation([ROOM_NAME_KEY], (data: IChangeRoomName) =>
		roomService.changeRoomName(data),
		{
			onSettled: () => {
				queryClient.invalidateQueries([ROOM_KEY])
			}
		}
	)
}
