import { CHRONICLES_KEY } from '@/consts/queryKeys'
import chronicleService from '@/services/chronicle.service'
import { useQuery } from '@tanstack/react-query'

export const useChronicle = (skip: number) => {
	return useQuery([CHRONICLES_KEY, skip], () => chronicleService.getOne(skip), {
		select: ({ data }) => data,
	})
}