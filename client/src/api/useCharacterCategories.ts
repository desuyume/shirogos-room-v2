import { CHARACTER_CATEGORY_KEY } from '@/consts/queryKeys'
import wikiService from '@/services/wiki.service'
import { useQuery } from '@tanstack/react-query'

export const useCharacterCategories = () => {
  return useQuery([CHARACTER_CATEGORY_KEY], () => wikiService.getCharacterCategories(), {
    select: ({ data }) => data
  })
}
