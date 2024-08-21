import { CREATE_ROOM_KEY } from '@/consts/queryKeys'
import roomService from '@/services/room.service'
import { ICreateRoom } from '@/types/room.interface'
import { useMutation } from '@tanstack/react-query'

export const useCreateRoom = () => {
	return useMutation([CREATE_ROOM_KEY], (room: ICreateRoom) =>
		roomService.create(room)
	)
}
