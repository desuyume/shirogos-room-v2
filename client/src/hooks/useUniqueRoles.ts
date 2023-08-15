import { UNIQUE_ROLES_KEY } from '@/consts/queryKeys'
import uniqueRoleService from '@/services/unique-role.service'
import { useQuery } from '@tanstack/react-query'

export const useUniqueRoles = (type: string) => {
	return useQuery([UNIQUE_ROLES_KEY, type], () => uniqueRoleService.getAll(type), {
		select: ({ data }) => data,
	})
}
