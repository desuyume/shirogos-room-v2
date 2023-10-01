import { UNIQUE_ROLES_KEY } from '@/consts/queryKeys'
import uniqueRoleService from '@/services/unique-role.service'
import { ICreateUniqueRole } from '@/types/unique-role.interface'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useCreateRole = (type: string) => {
	const queryClient = useQueryClient()

	return useMutation([UNIQUE_ROLES_KEY, type], (role: ICreateUniqueRole) =>
		uniqueRoleService.add(role),
		{
			onSettled: () => {
				queryClient.invalidateQueries([UNIQUE_ROLES_KEY, type])
			}
		}
	)
}
