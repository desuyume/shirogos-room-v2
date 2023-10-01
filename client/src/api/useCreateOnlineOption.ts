import { CREATE_ONLINE_OPTION_KEY, ONLINE_OPTION_KEY } from '@/consts/queryKeys'
import onlineOptionService from '@/services/online-option.service'
import { ICreateOnlineOption } from '@/types/online-option.interface'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useCreateOnlineOption = () => {
	const queryClient = useQueryClient()

	return useMutation(
		[CREATE_ONLINE_OPTION_KEY],
		(option: ICreateOnlineOption) => onlineOptionService.create(option),
		{
			onSettled: () => {
				queryClient.invalidateQueries([ONLINE_OPTION_KEY])
			},
		}
	)
}
