import { CHARACTER_KEY } from '@/consts/queryKeys'
import wikiService from '@/services/wiki.service'
import { useQuery } from '@tanstack/react-query'

export const useAllCharacter = () => {
	return useQuery([CHARACTER_KEY], () => wikiService.getAllCharacters(), {
		select: ({ data }) => data,
	})
}
