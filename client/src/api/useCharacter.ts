import { CHARACTER_KEY } from '@/consts/queryKeys'
import wikiService from '@/services/wiki.service'
import { useQuery } from '@tanstack/react-query'

export const useCharacter = (id: string | null) => {
	return useQuery([CHARACTER_KEY, id], () => wikiService.getCharacter(id), {
		select: res => res && res.data,
		enabled: !!id,
	})
}
