import { UNIQUE_ROLES_KEY } from '@/consts/queryKeys'
import uniqueRoleService from '@/services/unique-role.service'
import { UniqueRoleType } from '@/types/unique-role.interface'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useDeleteUniqueRole = (id: number | null, type: UniqueRoleType) => {
  const queryClient = useQueryClient()

  return useMutation([UNIQUE_ROLES_KEY, type], () => uniqueRoleService.delete(id), {
    onSettled: () => {
      queryClient.invalidateQueries([UNIQUE_ROLES_KEY, type])
    }
  })
}
