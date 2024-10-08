import { ROOM_STATS_KEY } from '@/consts/queryKeys'
import roomService from '@/services/room.service'
import { useQuery } from '@tanstack/react-query'

export const useRoomStats = (isEnabled: boolean = true) => {
  return useQuery([ROOM_STATS_KEY], () => roomService.getRoomStats(), {
    select: ({ data }) => data,
    enabled: isEnabled
  })
}
