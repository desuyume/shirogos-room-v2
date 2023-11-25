import { AWARD_KEY, CREATE_AWARD_KEY } from '@/consts/queryKeys'
import awardService from '@/services/award.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useCreateAward = () => {
	const queryClient = useQueryClient()

	return useMutation([CREATE_AWARD_KEY], (award: FormData) =>
		awardService.create(award),
		{
			onSettled: () => {
				queryClient.invalidateQueries([AWARD_KEY])
			}
		}
	)
}
