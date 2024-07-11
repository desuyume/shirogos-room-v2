import { USER_INFO_KEY, USER_PROFILE_KEY } from '@/consts/queryKeys'
import userInfoService from '@/services/user-info.service'
import { IUpdateBirthday } from '@/types/user.interface'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useUpdateBirthday = () => {
	const queryClient = useQueryClient()

	return useMutation(
		[USER_INFO_KEY],
		(data: IUpdateBirthday) => userInfoService.updateBirthday(data),
		{
			onSuccess: () => {
				queryClient.invalidateQueries([USER_INFO_KEY])
				queryClient.invalidateQueries([USER_PROFILE_KEY])
			},
		}
	)
}
