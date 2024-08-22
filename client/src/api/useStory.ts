import { STORY_KEY } from '@/consts/queryKeys'
import storyService from '@/services/story.service'
import { useQuery } from '@tanstack/react-query'

export const useStory = (id: string) => {
  return useQuery([STORY_KEY, id], () => storyService.getOne(id), {
    select: ({ data }) => data
  })
}
