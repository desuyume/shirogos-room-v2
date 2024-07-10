import { USER_NOTIFICATIONS_KEY } from '@/consts/queryKeys'
import notificationService from '@/services/notification.service'
import { useQuery } from '@tanstack/react-query'

export const useUserNotifications = () => {
	return useQuery(
		[USER_NOTIFICATIONS_KEY],
		() => notificationService.getUserNotifications(),
		{
			select: ({ data }) => data,
		}
	)
}
