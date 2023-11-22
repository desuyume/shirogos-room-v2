import { MAKE_ORDER_KEY } from '@/consts/queryKeys'
import roomService from '@/services/room.service'
import { IMakeOrder } from '@/types/room.interface'
import { useMutation } from '@tanstack/react-query'

export const useMakeOrder = (type: string) => {
	return useMutation([MAKE_ORDER_KEY, type], (data: IMakeOrder) =>
		roomService.makeOrder(type, data)
	)
}
