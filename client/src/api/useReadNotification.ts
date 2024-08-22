import { READ_NOTIFICATION_KEY, USER_NOTIFICATIONS_KEY } from '@/consts/queryKeys'
import notificationService from '@/services/notification.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useReadNotification = () => {
  const queryClient = useQueryClient()

  return useMutation([READ_NOTIFICATION_KEY], (id: number) => notificationService.read(id), {
    onSettled: () => {
      queryClient.invalidateQueries([USER_NOTIFICATIONS_KEY])
    }
  })
}
