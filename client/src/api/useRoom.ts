import { ROOM_KEY } from '@/consts/queryKeys'
import roomService from '@/services/room.service'
import { useQuery } from '@tanstack/react-query'

export const useRoom = () => {
	return useQuery([ROOM_KEY], () =>
		roomService.get(),
		{
			select: ({ data }) => data
		}
	)
}
