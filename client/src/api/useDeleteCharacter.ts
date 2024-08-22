import { CHARACTER_KEY } from '@/consts/queryKeys'
import wikiService from '@/services/wiki.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useDeleteCharacter = (id: string | null) => {
  const queryClient = useQueryClient()

  return useMutation([CHARACTER_KEY, id], () => wikiService.deleteCharacter(id), {
    onSettled: () => {
      queryClient.invalidateQueries([CHARACTER_KEY])
    }
  })
}
