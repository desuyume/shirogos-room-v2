import { ACTIVE_BACKGROUND_KEY, ROOM_APPEARANCE_KEY } from '@/consts/queryKeys'
import roomService from '@/services/room.service'
import { IChooseActiveRoomBackground } from '@/types/room.interface'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useChooseActiveRoomBackground = () => {
  const queryClient = useQueryClient()

  return useMutation(
    [ACTIVE_BACKGROUND_KEY],
    (data: IChooseActiveRoomBackground) => roomService.chooseActiveRoomBackground(data),
    {
      onSettled: () => {
        queryClient.invalidateQueries([ACTIVE_BACKGROUND_KEY])
        queryClient.invalidateQueries([ROOM_APPEARANCE_KEY])
      }
    }
  )
}
