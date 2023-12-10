import { CREATE_ORDER_MANUALLT_KEY, PENDING_ORDERS_KEY } from '@/consts/queryKeys'
import orderService from '@/services/order.service'
import { ICreateOrderManually } from '@/types/order.interface'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useCreateOrderManually = () => {
	const queryClient = useQueryClient()

	return useMutation(
		[CREATE_ORDER_MANUALLT_KEY],
		(data: ICreateOrderManually) => orderService.createOrderManually(data),
		{
			onSettled: () => {
				queryClient.invalidateQueries([PENDING_ORDERS_KEY])
			},
		}
	)
}
