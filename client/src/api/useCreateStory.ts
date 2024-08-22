import { CREATE_STORY_KEY, STORY_GENERAL_KEY, STORY_KEY } from '@/consts/queryKeys'
import storyService from '@/services/story.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useCreateStory = () => {
  const queryClient = useQueryClient()

  return useMutation([CREATE_STORY_KEY], (story: FormData) => storyService.create(story), {
    onSettled: () => {
      queryClient.invalidateQueries([STORY_KEY])
      queryClient.invalidateQueries([STORY_GENERAL_KEY])
    }
  })
}
