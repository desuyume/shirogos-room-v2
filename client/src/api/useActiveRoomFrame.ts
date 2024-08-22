import { ACTIVE_FRAME_KEY } from '@/consts/queryKeys'
import roomService from '@/services/room.service'
import { useQuery } from '@tanstack/react-query'

export const useActiveRoomFrame = () => {
  return useQuery([ACTIVE_FRAME_KEY], () => roomService.getActiveRoomFrame(), {
    select: ({ data }) => data
  })
}
