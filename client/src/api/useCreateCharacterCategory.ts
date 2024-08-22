import { CHARACTER_CATEGORY_KEY, CREATE_CHARACTER_CATEGORY_KEY } from '@/consts/queryKeys'
import wikiService from '@/services/wiki.service'
import { ICreateCategory } from '@/types/wiki.interface'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useCreateCharacterCategory = () => {
  const queryClient = useQueryClient()

  return useMutation(
    [CREATE_CHARACTER_CATEGORY_KEY],
    (category: ICreateCategory) => wikiService.createCharacterCategory(category),
    {
      onSettled: () => {
        queryClient.invalidateQueries([CHARACTER_CATEGORY_KEY])
      }
    }
  )
}
