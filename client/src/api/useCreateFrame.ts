import { CREATE_FRAME_KEY, FRAMES_KEY } from '@/consts/queryKeys'
import frameService from '@/services/frame.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useCreateFrame = () => {
	const queryClient = useQueryClient()

	return useMutation(
		[CREATE_FRAME_KEY],
		(frame: FormData) => frameService.create(frame),
		{
			onSettled: () => {
				queryClient.invalidateQueries([FRAMES_KEY])
			},
		}
	)
}
