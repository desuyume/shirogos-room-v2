import { CHARACTER_KEY } from '@/consts/queryKeys'
import wikiService from '@/services/wiki.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useUpdateCharacter = (id: string | null) => {
  const queryClient = useQueryClient()

  return useMutation(
    [CHARACTER_KEY, id],
    (character: FormData) => wikiService.updateCharacter(id, character),
    {
      onSettled: () => {
        queryClient.invalidateQueries([CHARACTER_KEY])
      }
    }
  )
}
