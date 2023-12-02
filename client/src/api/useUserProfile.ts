import { USER_PROFILE_KEY } from '@/consts/queryKeys'
import userService from '@/services/user.service'
import { useQuery } from '@tanstack/react-query'

export const useUserProfile = () => {
	return useQuery([USER_PROFILE_KEY], () => userService.getProfile(), {
		select: ({ data }) => data,
	})
}
