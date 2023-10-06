import { CHRONICLES_COUNT_KEY } from '@/consts/queryKeys'
import chronicleService from '@/services/chronicle.service'
import { useQuery } from '@tanstack/react-query'

export const useChroniclesCount = () => {
	return useQuery([CHRONICLES_COUNT_KEY], () => chronicleService.getCount(), {
		select: ({ data }) => data,
	})
}