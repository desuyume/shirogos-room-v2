import { CREATE_ROOM_KEY } from '@/consts/queryKeys'
import roomService from '@/services/room.service'
import { ICreateRoom } from '@/types/room.interface'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

export const useCreateRoom = () => {
	const navigate = useNavigate()

	return useMutation(
		[CREATE_ROOM_KEY],
		(room: ICreateRoom) => roomService.create(room),
		{
			onSettled: (_, error) => {
				if (!error) {
					navigate('/room')
				}
			},
		}
	)
}
