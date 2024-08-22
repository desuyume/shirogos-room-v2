import { USER_PROFILE_KEY } from '@/consts/queryKeys'
import userInfoService from '@/services/user-info.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useUpdateMiniatureImg = () => {
  const queryClient = useQueryClient()

  return useMutation(
    [USER_PROFILE_KEY],
    (data: FormData) => userInfoService.updateMiniatureImg(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([USER_PROFILE_KEY])
      }
    }
  )
}
