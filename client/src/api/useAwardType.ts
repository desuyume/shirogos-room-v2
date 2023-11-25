import { AWARD_TYPE_KEY } from '@/consts/queryKeys'
import awardService from '@/services/award.service'
import { useQuery } from '@tanstack/react-query'

export const useAwardType = () => {
	return useQuery([AWARD_TYPE_KEY], () => awardService.getAwardTypes(), {
		select: ({ data }) => data,
	})
}
