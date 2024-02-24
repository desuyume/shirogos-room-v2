import { STORY_GENERAL_KEY } from '@/consts/queryKeys'
import storyService from '@/services/story.service'
import { useQuery } from '@tanstack/react-query'

export const useStoriesGeneral = () => {
	return useQuery([STORY_GENERAL_KEY], () => storyService.getAllGeneral(), {
		select: ({ data }) => data,
	})
}
