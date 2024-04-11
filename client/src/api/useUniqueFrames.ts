import { UNIQUE_FRAMES_KEY } from '@/consts/queryKeys'
import frameService from '@/services/frame.service'
import { useQuery } from '@tanstack/react-query'

export const useUniqueFrames = () => {
	return useQuery([UNIQUE_FRAMES_KEY], () => frameService.getUnique(), {
		select: ({ data }) => data,
	})
}
