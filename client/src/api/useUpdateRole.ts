import { UNIQUE_ROLES_KEY, UPDATE_UNIQUE_ROLE_KEY } from '@/consts/queryKeys'
import uniqueRoleService from '@/services/unique-role.service'
import { IUpdateUniqueRole } from '@/types/unique-role.interface'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useUpdateRole = (id: number | null) => {
  const queryClient = useQueryClient()

  return useMutation(
    [UPDATE_UNIQUE_ROLE_KEY],
    (data: IUpdateUniqueRole) => uniqueRoleService.update(id, data),
    {
      onSettled: () => {
        queryClient.invalidateQueries([UNIQUE_ROLES_KEY])
      }
    }
  )
}
