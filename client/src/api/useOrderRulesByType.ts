import { ORDER_RULES_KEY } from '@/consts/queryKeys'
import orderService from '@/services/order.service'
import { useQuery } from '@tanstack/react-query'

export const useOrderRulesByType = (type: string) => {
  return useQuery([ORDER_RULES_KEY, type], () => orderService.getOrderRulesByType(type), {
    select: ({ data }) => data
  })
}
