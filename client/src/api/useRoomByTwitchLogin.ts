import { ROOM_BY_USERNAME } from '@/consts/queryKeys'
import roomGuideService from '@/services/room-guide.service'
import { useQuery } from '@tanstack/react-query'

export const useRoomByTwitchLogin = (twitchLogin: string) => {
  return useQuery(
    [ROOM_BY_USERNAME, twitchLogin],
    () => roomGuideService.useRoomByTwitchLogin(twitchLogin),
    {
      select: ({ data }) => data,
      refetchOnWindowFocus: false
    }
  )
}
