import { CHRONICLES_KEY } from '@/consts/queryKeys'
import chronicleService from '@/services/chronicle.service'
import { useQuery } from '@tanstack/react-query'

export const useChronicles = () => {
	return useQuery([CHRONICLES_KEY], () => chronicleService.getAll(), {
		select: ({ data }) => data,
	})
}