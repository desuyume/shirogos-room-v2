import { ROOM_PANOPTICONS_KEY } from '@/consts/queryKeys'
import roomService from '@/services/room.service'
import { useQuery } from '@tanstack/react-query'

export const useRoomPanopticons = () => {
  return useQuery([ROOM_PANOPTICONS_KEY], () => roomService.getRoomPanopticons(), {
    select: ({ data }) => data
  })
}
