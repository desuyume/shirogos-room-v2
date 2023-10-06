import { CHRONICLES_KEY, CREATE_CHRONICLE_KEY } from '@/consts/queryKeys'
import chronicleService from '@/services/chronicle.service'
import { ICreateChronicle } from '@/types/chronicle.interface'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useCreateChronicle = () => {
	const queryClient = useQueryClient()

	return useMutation([CREATE_CHRONICLE_KEY], (chronicle: ICreateChronicle) =>
		chronicleService.create(chronicle),
		{
			onSettled: () => {
				queryClient.invalidateQueries([CHRONICLES_KEY])
			}
		}
	)
}
