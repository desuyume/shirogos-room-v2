import { BOUTIQUE_UNIQUE_ROLES_KEY } from '@/consts/queryKeys'
import roomService from '@/services/room.service'
import { useQuery } from '@tanstack/react-query'

export const useBoutiqueUniqueRoles = () => {
  return useQuery([BOUTIQUE_UNIQUE_ROLES_KEY], () => roomService.getBoutiqueUniqueRoles(), {
    select: ({ data }) => data
  })
}
