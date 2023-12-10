import { ORDER_RULES_KEY, UPDATE_ORDER_RULES_KEY } from '@/consts/queryKeys'
import orderService from '@/services/order.service'
import { IUpdateOrderRules } from '@/types/order.interface'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useUpdateOrderRules = (type: string) => {
	const queryClient = useQueryClient()

	return useMutation(
		[UPDATE_ORDER_RULES_KEY],
		(data: IUpdateOrderRules) => orderService.updateOrderRules(type, data),
		{
			onSuccess: () => {
				queryClient.invalidateQueries([ORDER_RULES_KEY])
			},
		}
	)
}
