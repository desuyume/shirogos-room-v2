import { ROOM_KEY } from '@/consts/queryKeys'
import roomService from '@/services/room.service'
import { useQuery } from '@tanstack/react-query'

export const useRoom = (isEnabled: boolean = true) => {
	return useQuery([ROOM_KEY], () => roomService.get(), {
		select: ({ data }) => data,
		enabled: isEnabled,
	})
}
