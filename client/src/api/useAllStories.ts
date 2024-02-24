import { STORY_KEY } from '@/consts/queryKeys'
import storyService from '@/services/story.service'
import { useQuery } from '@tanstack/react-query'

export const useAllStories = () => {
	return useQuery([STORY_KEY], () => storyService.getAll(), {
		select: ({ data }) => data,
	})
}
