import { USER_INFO_KEY } from '@/consts/queryKeys'
import userInfoService from '@/services/user-info.service'
import { IUpdateGender } from '@/types/user.interface'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useUpdateGender = () => {
	const queryClient = useQueryClient()

	return useMutation(
		[USER_INFO_KEY],
		(data: IUpdateGender) => userInfoService.updateGender(data),
		{
			onSuccess: () => {
				queryClient.invalidateQueries([USER_INFO_KEY])
			},
		}
	)
}
