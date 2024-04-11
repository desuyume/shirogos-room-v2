import { UNIQUE_ROLES_KEY } from '@/consts/queryKeys'
import uniqueRoleService from '@/services/unique-role.service'
import { UniqueRoleType } from '@/types/unique-role.interface'
import { useQuery } from '@tanstack/react-query'

export const useUniqueRoles = (type: UniqueRoleType) => {
	return useQuery(
		[UNIQUE_ROLES_KEY, type],
		() => uniqueRoleService.getUnique(type),
		{
			select: ({ data }) => data,
		}
	)
}
