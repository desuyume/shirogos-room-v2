import { MAKE_ORDER_KEY, ROOM_STATS_KEY, USER_PROFILE_KEY } from '@/consts/queryKeys'
import roomService from '@/services/room.service'
import { IMakeOrder } from '@/types/room.interface'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useMakeOrder = (type: string) => {
	const queryClient = useQueryClient()

	return useMutation([MAKE_ORDER_KEY, type], (data: IMakeOrder) =>
		roomService.makeOrder(type, data),
		{
			onSuccess: () => {
				queryClient.invalidateQueries([USER_PROFILE_KEY])
				queryClient.invalidateQueries([ROOM_STATS_KEY])
			}
		}
	)
}
