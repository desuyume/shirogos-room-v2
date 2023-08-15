import { UNIQUE_ROLES_KEY } from '@/consts/queryKeys'
import uniqueRoleService from '@/services/unique-role.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useDeleteUniqueRole = (type: string) => {
	const queryclient = useQueryClient()

	return useMutation([UNIQUE_ROLES_KEY, type], (id: number) =>
		uniqueRoleService.delete(id),
		{
			onSettled: () => {
				queryclient.invalidateQueries([UNIQUE_ROLES_KEY, type])
			}
		}
	)
}
