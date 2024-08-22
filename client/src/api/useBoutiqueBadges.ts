import { BOUTIQUE_BADGE_KEY } from '@/consts/queryKeys'
import roomService from '@/services/room.service'
import { useQuery } from '@tanstack/react-query'

export const useBoutiqueBadges = () => {
  return useQuery([BOUTIQUE_BADGE_KEY], () => roomService.getBoutiqueBadges(), {
    select: ({ data }) => data
  })
}
