import { ROOM_CHARACTERS_KEY } from '@/consts/queryKeys'
import roomService from '@/services/room.service'
import { useQuery } from '@tanstack/react-query'

export const useRoomCharacters = () => {
  return useQuery([ROOM_CHARACTERS_KEY], () => roomService.getRoomCharacters(), {
    select: ({ data }) => data
  })
}
