import { BIRTHDAY_AWARD_KEY } from '@/consts/queryKeys'
import birthdayAwardService from '@/services/birthday-award.service'
import { useQuery } from '@tanstack/react-query'

export const useBirthdayAward = () => {
	return useQuery([BIRTHDAY_AWARD_KEY], () => birthdayAwardService.get(), {
		select: ({ data }) => data,
	})
}