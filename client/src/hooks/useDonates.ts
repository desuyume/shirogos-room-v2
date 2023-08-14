import { DONATE_KEY } from '@/consts/queryKeys'
import donateService from '@/services/donate.service'
import { useQuery } from '@tanstack/react-query'

export const useDonates = () => {
	return useQuery([DONATE_KEY], () => donateService.getAll(), {
		select: ({ data }) => data,
	})
}