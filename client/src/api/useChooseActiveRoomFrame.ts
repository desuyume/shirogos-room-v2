import {
	ACTIVE_FRAME_KEY,
	ROOM_APPEARANCE_KEY,
	ROOM_KEY,
	USER_INFO_KEY,
	USER_PROFILE_KEY,
} from '@/consts/queryKeys'
import roomService from '@/services/room.service'
import { IChooseActiveRoomFrame } from '@/types/room.interface'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useChooseActiveRoomFrame = () => {
	const queryClient = useQueryClient()

	return useMutation(
		[ACTIVE_FRAME_KEY],
		(data: IChooseActiveRoomFrame) => roomService.chooseActiveRoomFrame(data),
		{
			onSettled: () => {
				queryClient.invalidateQueries([ACTIVE_FRAME_KEY])
				queryClient.invalidateQueries([ROOM_APPEARANCE_KEY])
				queryClient.invalidateQueries([USER_INFO_KEY])
				queryClient.invalidateQueries([ROOM_KEY])
				queryClient.invalidateQueries([USER_PROFILE_KEY])
			},
		}
	)
}
