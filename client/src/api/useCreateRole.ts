import { UNIQUE_ROLES_KEY } from '@/consts/queryKeys'
import uniqueRoleService from '@/services/unique-role.service'
import {
	ICreateUniqueRole,
	UniqueRoleType,
} from '@/types/unique-role.interface'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useCreateRole = (type: UniqueRoleType) => {
	const queryClient = useQueryClient()

	return useMutation(
		[UNIQUE_ROLES_KEY, type],
		(role: ICreateUniqueRole) => uniqueRoleService.create(role, type),
		{
			onSettled: () => {
				queryClient.invalidateQueries([UNIQUE_ROLES_KEY, type])
			},
		}
	)
}
