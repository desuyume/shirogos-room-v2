import {
	BOUTIQUE_UNIQUE_ROLES_KEY,
	BUY_UNIQUE_ROLE_KEY,
	USER_UNQIUE_ROLES_KEY,
} from '@/consts/queryKeys'
import roomService from '@/services/room.service'
import { IBuyUniqueRole } from '@/types/room.interface'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useBuyUniqueRole = (type: string) => {
	const queryClient = useQueryClient()

	return useMutation(
		[BUY_UNIQUE_ROLE_KEY, type],
		(data: IBuyUniqueRole) => roomService.buyUniqueRole(data),
		{
			onSettled: () => {
				queryClient.invalidateQueries([BOUTIQUE_UNIQUE_ROLES_KEY])
				queryClient.invalidateQueries([USER_UNQIUE_ROLES_KEY])
			},
		}
	)
}
