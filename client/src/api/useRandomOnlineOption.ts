import { ONLINE_OPTION_KEY } from '@/consts/queryKeys'
import onlineOptionService from '@/services/online-option.service'
import { useQuery } from '@tanstack/react-query'

export const useRandomOnlineOption = () => {
	return useQuery([ONLINE_OPTION_KEY, 'random'], () => onlineOptionService.getRandom(), {
		select: ({ data }) => data,
	})
}