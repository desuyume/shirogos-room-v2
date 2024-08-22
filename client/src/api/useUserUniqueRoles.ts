import { USER_UNQIUE_ROLES_KEY } from '@/consts/queryKeys'
import roomService from '@/services/room.service'
import { useQuery } from '@tanstack/react-query'

export const useUserUniqueRoles = (isEnabled: boolean = true) => {
  return useQuery([USER_UNQIUE_ROLES_KEY], () => roomService.getUserUniqueRoles(), {
    select: ({ data }) => data,
    enabled: isEnabled
  })
}
