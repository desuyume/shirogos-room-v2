import { CREATE_ROLE_KEY, ROLES_KEY } from '@/consts/queryKeys'
import uniqueRoleService from '@/services/unique-role.service'
import {
	ICreateUniqueRole,
	UniqueRoleType,
} from '@/types/unique-role.interface'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useCreateRole = (type: UniqueRoleType) => {
	const queryClient = useQueryClient()

	return useMutation(
		[CREATE_ROLE_KEY, type],
		(role: ICreateUniqueRole) => uniqueRoleService.create(role, type),
		{
			onSettled: () => {
				queryClient.invalidateQueries([ROLES_KEY, type])
			},
		}
	)
}
