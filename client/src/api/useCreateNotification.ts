import { CREATE_NOTIFICATION_KEY, NOTIFICATIONS_KEY, USER_NOTIFICATIONS_KEY } from '@/consts/queryKeys'
import notificationService from '@/services/notification.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useCreateNotification = () => {
	const queryClient = useQueryClient()

	return useMutation(
		[CREATE_NOTIFICATION_KEY],
		(data: FormData) => notificationService.create(data),
		{
			onSettled: () => {
				queryClient.invalidateQueries([NOTIFICATIONS_KEY])
				queryClient.invalidateQueries([USER_NOTIFICATIONS_KEY])
			},
		}
	)
}
