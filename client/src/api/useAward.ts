import { AWARD_KEY } from '@/consts/queryKeys'
import awardService from '@/services/award.service'
import { useQuery } from '@tanstack/react-query'

export const useAward = () => {
	return useQuery([AWARD_KEY], () => awardService.getAll(), {
		select: ({ data }) => data,
	})
}
