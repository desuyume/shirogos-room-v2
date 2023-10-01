import { ROOM_CONTENT_KEY } from '@/consts/queryKeys'
import roomContentService from '@/services/room-content.service'
import { useQuery } from '@tanstack/react-query'

export const useRoomContents = (type: string) => {
	return useQuery([ROOM_CONTENT_KEY, type], () =>
		roomContentService.getAll(type),
		{
			select: ({ data }) => data
		}
	)
}
