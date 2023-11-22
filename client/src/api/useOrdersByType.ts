import { ORDERS_KEY } from '@/consts/queryKeys'
import orderService from '@/services/order.service'
import { useQuery } from '@tanstack/react-query'

export const useOrdersByType = (type: string) => {
	return useQuery([ORDERS_KEY, type], () => orderService.getOrdersByType(type), {
		select: ({ data }) => data,
	})
}