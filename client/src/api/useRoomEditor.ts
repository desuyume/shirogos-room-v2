import { ROOM_EDITOR_KEY } from '@/consts/queryKeys'
import roomService from '@/services/room.service'
import { useQuery } from '@tanstack/react-query'

export const useRoomEditor = () => {
	return useQuery([ROOM_EDITOR_KEY], () => roomService.getRoomEditor(), {
		select: ({ data }) => data,
	})
}
