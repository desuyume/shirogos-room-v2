import { DONATES_KEY } from '@/consts/queryKeys'
import donateService from '@/services/donate.service'
import { IUpdateDonateGifts } from '@/types/donate.interface'
import { useMutation } from '@tanstack/react-query'

export const useUpdateDonateGifts = (id: number) => {
	return useMutation([DONATES_KEY, id], (data: IUpdateDonateGifts) =>
		donateService.updateGifts(data)
	)
}
