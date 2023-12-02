import { ROOM_KEY, USER_INFO_KEY, USER_PROFILE_KEY } from '@/consts/queryKeys'
import userInfoService from '@/services/user-info.service'
import { IUpdateUsername } from '@/types/user.interface'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useUpdateUsername = () => {
	const queryClient = useQueryClient()

	return useMutation(
		[USER_INFO_KEY],
		(data: IUpdateUsername) => userInfoService.updateUsername(data),
		{
			onSuccess: () => {
				queryClient.invalidateQueries([USER_INFO_KEY])
				queryClient.invalidateQueries([ROOM_KEY])
				queryClient.invalidateQueries([USER_PROFILE_KEY])
			},
		}
	)
}
