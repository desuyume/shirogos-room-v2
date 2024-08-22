import { BOUTIQUE_BACKGROUNDS_KEY } from '@/consts/queryKeys'
import roomService from '@/services/room.service'
import { useQuery } from '@tanstack/react-query'

export const useBoutiqueBackgrounds = () => {
  return useQuery([BOUTIQUE_BACKGROUNDS_KEY], () => roomService.getBoutiqueBackgrounds(), {
    select: ({ data }) => data
  })
}
