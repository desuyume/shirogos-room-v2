import { ORDER_PRICES_KEY } from '@/consts/queryKeys'
import orderService from '@/services/order.service'
import { useQuery } from '@tanstack/react-query'

export const useOrderPrices = () => {
	return useQuery([ORDER_PRICES_KEY], () => orderService.getOrderPrices(), {
		select: ({ data }) => data,
	})
}