import { FRAMES_KEY } from '@/consts/queryKeys'
import frameService from '@/services/frame.service'
import { useQuery } from '@tanstack/react-query'

export const useFrames = () => {
  return useQuery([FRAMES_KEY], () => frameService.getAll(), {
    select: ({ data }) => data
  })
}
