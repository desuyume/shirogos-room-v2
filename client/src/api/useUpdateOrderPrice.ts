import { ORDERS_KEY, UPDATE_ORDER_PRICE_KEY } from '@/consts/queryKeys'
import orderService from '@/services/order.service'
import { IUpdateOrderPrice } from '@/types/order.interface'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useUpdateOrderPrice = (id: number) => {
	const queryClient = useQueryClient()

	return useMutation(
		[UPDATE_ORDER_PRICE_KEY],
		(data: IUpdateOrderPrice) => orderService.updateOrderPrice(id, data),
		{
			onSuccess: () => {
				queryClient.invalidateQueries([ORDERS_KEY])
			},
		}
	)
}
