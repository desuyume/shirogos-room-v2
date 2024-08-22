import {
  BOUTIQUE_BACKGROUNDS_KEY,
  BUY_BACKGROUND_KEY,
  BACKGROUNDS_KEY,
  USER_PROFILE_KEY
} from '@/consts/queryKeys'
import roomService from '@/services/room.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useBuyBackground = () => {
  const queryClient = useQueryClient()

  return useMutation(
    [BUY_BACKGROUND_KEY],
    (bgId: number) => roomService.buyBoutiqueBackground(bgId),
    {
      onSettled: () => {
        queryClient.invalidateQueries([BOUTIQUE_BACKGROUNDS_KEY])
        queryClient.invalidateQueries([BACKGROUNDS_KEY])
        queryClient.invalidateQueries([USER_PROFILE_KEY])
      }
    }
  )
}
