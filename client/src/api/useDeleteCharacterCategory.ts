import { CHARACTER_CATEGORY_KEY } from '@/consts/queryKeys'
import wikiService from '@/services/wiki.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useDeleteCharacterCategory = (id: number) => {
  const queryClient = useQueryClient()

  return useMutation([CHARACTER_CATEGORY_KEY, id], () => wikiService.deleteCharacterCategory(id), {
    onSettled: () => {
      queryClient.invalidateQueries([CHARACTER_CATEGORY_KEY])
    }
  })
}
