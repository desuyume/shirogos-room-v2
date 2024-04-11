import { CREATE_PANOPTICON_KEY, PANOPTICONS_KEY } from '@/consts/queryKeys'
import panopticonService from '@/services/panopticon.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useCreatePanopticon = () => {
	const queryClient = useQueryClient()

	return useMutation(
		[CREATE_PANOPTICON_KEY],
		(panopticon: FormData) => panopticonService.create(panopticon),
		{
			onSettled: () => {
				queryClient.invalidateQueries([PANOPTICONS_KEY])
			},
		}
	)
}
