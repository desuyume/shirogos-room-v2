import { useMutation, useQueryClient } from '@tanstack/react-query'
import { PANOPTICONS_KEY } from '../consts/queryKeys'
import panopticonService from '@/services/panopticon.service'

export const useDeletePanopticon = (id: number | null) => {
	const queryClient = useQueryClient()

	return useMutation(
		[PANOPTICONS_KEY, id],
		() => panopticonService.delete(id),
		{
			onSettled: () => {
				queryClient.invalidateQueries([PANOPTICONS_KEY])
			},
		}
	)
}
