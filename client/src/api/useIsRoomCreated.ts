import { IS_ROOM_CREATED_KEY } from '@/consts/queryKeys'
import roomService from '@/services/room.service'
import { useQuery } from '@tanstack/react-query'

export const useIsRoomCreated = () => {
  return useQuery([IS_ROOM_CREATED_KEY], () => roomService.isCreated(), {
    select: ({ data }) => data,
    refetchOnWindowFocus: false
  })
}
