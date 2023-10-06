import { CHRONICLE_EVENTS_KEY } from '@/consts/queryKeys'
import chronicleService from '@/services/chronicle.service'
import { useQuery } from '@tanstack/react-query'

export const useChronicleEvents = (id: number | null) => {
	return useQuery([CHRONICLE_EVENTS_KEY, id], () => chronicleService.getEvents(id), {
		select: ({ data }) => data,
		enabled: !!id
	})
}