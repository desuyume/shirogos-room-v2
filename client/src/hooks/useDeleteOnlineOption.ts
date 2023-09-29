import { ONLINE_OPTION_KEY } from '@/consts/queryKeys'
import onlineOptionService from '@/services/online-option.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useDeleteOnlineOption = (id: number) => {
	const queryClient = useQueryClient()
	
	return useMutation([ONLINE_OPTION_KEY, id], () => onlineOptionService.delete(id), {
		onSettled: () => {
			queryClient.invalidateQueries([ONLINE_OPTION_KEY])
		}
	})
}