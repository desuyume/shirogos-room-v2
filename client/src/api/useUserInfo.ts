import { USER_INFO_KEY } from '@/consts/queryKeys'
import userInfoService from '@/services/user-info.service'
import { useQuery } from '@tanstack/react-query'

export const useUserInfo = () => {
  return useQuery([USER_INFO_KEY], () => userInfoService.get(), {
    select: ({ data }) => data
  })
}
