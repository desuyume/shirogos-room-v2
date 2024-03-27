import { ALMANAC_KEY } from '@/consts/queryKeys'
import almanacService from '@/services/almanac.service'
import { useQuery } from '@tanstack/react-query'

export const useCurrentBirthdays = (date: Date) => {
	return useQuery([ALMANAC_KEY, date], () => almanacService.getCurrentBirthdays(date), {
		select: ({ data }) => data,
		refetchOnWindowFocus: false,
	})
}
