import { ROOM_CONTENT_KEY } from '@/consts/queryKeys';
import roomContentService from '@/services/room-content.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useCreateRoomContent = (type: string) => {
	const queryClient = useQueryClient()

	return useMutation([ROOM_CONTENT_KEY, type], (content: FormData) =>
		roomContentService.add(content, type),
		{
			onSettled: () => {
				queryClient.invalidateQueries([ROOM_CONTENT_KEY, type])
			}
		}
	)
}
