import { USERS_KEY } from '@/consts/queryKeys'
import userService from '@/services/user.service'
import { useQuery } from '@tanstack/react-query'

export const useUsers = () => {
  return useQuery([USERS_KEY], () => userService.getAll(), {
    select: ({ data }) => data
  })
}
