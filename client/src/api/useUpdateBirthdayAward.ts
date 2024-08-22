import { BIRTHDAY_AWARD_KEY } from '@/consts/queryKeys'
import birthdayAwardService from '@/services/birthday-award.service'
import { IUpdateBirthadyAward } from '@/types/birthday-award.interface'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useUpdateBirthdayAward = () => {
  const queryClient = useQueryClient()

  return useMutation(
    [BIRTHDAY_AWARD_KEY],
    (award: IUpdateBirthadyAward) => birthdayAwardService.update(award),
    {
      onSettled: () => {
        queryClient.invalidateQueries([BIRTHDAY_AWARD_KEY])
      }
    }
  )
}
