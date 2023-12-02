import { USER_KEY } from '@/consts/queryKeys'
import userService from '@/services/user.service'
import { useQuery } from '@tanstack/react-query'

export const useUser = () => {
	return useQuery([USER_KEY], () => userService.get(), {
		select: ({ data }) => data,
		retry: false,
		refetchOnWindowFocus: false,
	})
}
