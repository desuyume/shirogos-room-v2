import { COMPLETED_ORDERS_KEY, COMPLETE_ORDER_KEY, PENDING_ORDERS_KEY } from '@/consts/queryKeys'
import orderService from '@/services/order.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useCompleteOrder = () => {
	const queryClient = useQueryClient()

	return useMutation([COMPLETE_ORDER_KEY], (id: number) =>
		orderService.completeOrder(id),
		{
			onSettled: () => {
				queryClient.invalidateQueries([COMPLETED_ORDERS_KEY])
				queryClient.invalidateQueries([PENDING_ORDERS_KEY])
			}
		}
	)
}
