import { PENDING_ORDERS_KEY } from '@/consts/queryKeys'
import orderService from '@/services/order.service'
import { useQuery } from '@tanstack/react-query'

export const usePendingOrders = () => {
  return useQuery([PENDING_ORDERS_KEY], () => orderService.getPendingOrders(), {
    select: ({ data }) => data
  })
}
