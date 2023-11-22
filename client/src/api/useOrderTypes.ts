import { ORDER_TYPES_KEY } from '@/consts/queryKeys'
import orderService from '@/services/order.service'
import { useQuery } from '@tanstack/react-query'

export const useOrderTypes = () => {
	return useQuery([ORDER_TYPES_KEY], () => orderService.getOrderTypes(), {
		select: ({ data }) => data,
	})
}