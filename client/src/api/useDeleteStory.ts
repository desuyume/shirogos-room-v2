import { DELETE_STORY_KEY, STORY_GENERAL_KEY, STORY_KEY } from '@/consts/queryKeys'
import storyService from '@/services/story.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useDeleteStory = (id: string | null) => {
	const queryClient = useQueryClient();

	return useMutation([DELETE_STORY_KEY], () =>
		storyService.remove(id),
		{
			onSettled: () => {
				queryClient.invalidateQueries([STORY_KEY])
				queryClient.invalidateQueries([STORY_GENERAL_KEY])
			}
		}
	)
}
