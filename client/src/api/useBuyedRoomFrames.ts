import { FRAMES_KEY } from '@/consts/queryKeys'
import roomService from '@/services/room.service'
import { useQuery } from '@tanstack/react-query'

export const useBuyedRoomFrames = () => {
	return useQuery([FRAMES_KEY], () => roomService.getBuyedRoomFrames(), {
		select: ({ data }) => data,
	})
}
