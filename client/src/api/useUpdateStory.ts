import { STORY_GENERAL_KEY, STORY_KEY, UPDATE_STORY_KEY } from '@/consts/queryKeys'
import storyService from '@/services/story.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useUpdateStory = (id: string | null) => {
	const queryClient = useQueryClient()

	return useMutation(
		[UPDATE_STORY_KEY],
		(story: FormData) => storyService.update(id, story),
		{
			onSuccess: () => {
				queryClient.invalidateQueries([STORY_KEY])
				queryClient.invalidateQueries([STORY_GENERAL_KEY])
			},
		}
	)
}
