import { PENDING_ORDERS_KEY, REJECT_ORDER_KEY } from '@/consts/queryKeys'
import orderService from '@/services/order.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useRejectOrder = () => {
	const queryClient = useQueryClient()

	return useMutation([REJECT_ORDER_KEY], (id: number) =>
		orderService.rejectOrder(id),
		{
			onSettled: () => {
				queryClient.invalidateQueries([PENDING_ORDERS_KEY])
			}
		}
	)
}
