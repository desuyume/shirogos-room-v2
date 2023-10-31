import { ROOM_KEY, USER_INFO_KEY } from '@/consts/queryKeys'
import userInfoService from '@/services/user-info.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useUpdateProfileImg = () => {
	const queryClient = useQueryClient()

	return useMutation(
		[USER_INFO_KEY],
		(data: FormData) => userInfoService.updateProfileImg(data),
		{
			onSuccess: () => {
				queryClient.invalidateQueries([USER_INFO_KEY])
				queryClient.invalidateQueries([ROOM_KEY])
			},
		}
	)
}
