import { ROOM_EDITOR_KEY, UPDATE_ROOM_EDITOR_KEY } from '@/consts/queryKeys'
import roomService from '@/services/room.service'
import { IUpdateRoomEditor } from '@/types/room.interface'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useUpdateRoomEditor = () => {
	const queryClient = useQueryClient()

	return useMutation(
		[UPDATE_ROOM_EDITOR_KEY],
		(data: IUpdateRoomEditor) => roomService.updateEditor(data),
		{
			onSuccess: () => {
				queryClient.invalidateQueries([ROOM_EDITOR_KEY])
			},
		}
	)
}
