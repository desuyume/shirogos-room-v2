import { DONATES_KEY } from '@/consts/queryKeys'
import donateService from '@/services/donate.service'
import { IUpdateDonateAmount } from '@/types/donate.interface'
import { useMutation } from '@tanstack/react-query'

export const useUpdateDonateAmount = (id: number) => {
	return useMutation([DONATES_KEY, id], (data: IUpdateDonateAmount) =>
		donateService.updateAmount(data)
	)
}
