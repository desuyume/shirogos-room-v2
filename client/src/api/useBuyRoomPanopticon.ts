import {
	BUY_ROOM_PANOPTICON_KEY,
	ROOM_PANOPTICONS_KEY,
	ROOM_STATS_KEY,
	USER_PROFILE_KEY,
} from '@/consts/queryKeys'
import roomService from '@/services/room.service'
import { IBuyRoomPanopticon } from '@/types/room.interface'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useBuyRoomPanopticon = () => {
	const queryClient = useQueryClient()

	return useMutation(
		[BUY_ROOM_PANOPTICON_KEY],
		(data: IBuyRoomPanopticon) => roomService.buyRoomPanopticon(data),
		{
			onSettled: () => {
				queryClient.invalidateQueries([ROOM_PANOPTICONS_KEY])
				queryClient.invalidateQueries([USER_PROFILE_KEY])
				queryClient.invalidateQueries([ROOM_STATS_KEY])
			},
		}
	)
}
