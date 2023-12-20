import { COMPLETED_ORDERS_KEY } from '@/consts/queryKeys'
import orderService from '@/services/order.service'
import { useQuery } from '@tanstack/react-query'

export const useCompletedOrders = () => {
	return useQuery([COMPLETED_ORDERS_KEY], () => orderService.getCompletedOrders(), {
		select: ({ data }) => data,
	})
}