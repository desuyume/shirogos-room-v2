import { CHANGE_UNQIUE_ROLES_KEY, USER_UNQIUE_ROLES_KEY } from '@/consts/queryKeys'
import roomService from '@/services/room.service'
import { IChangeUniqueRole } from '@/types/room.interface'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useChangeUniqueRole = (type: string) => {
	const queryClient = useQueryClient()

	return useMutation(
		[CHANGE_UNQIUE_ROLES_KEY, type],
		(data: IChangeUniqueRole) => roomService.changeUniqueRole(type, data),
		{
			onSettled: () => {
				queryClient.invalidateQueries([USER_UNQIUE_ROLES_KEY])
			},
		}
	)
}
