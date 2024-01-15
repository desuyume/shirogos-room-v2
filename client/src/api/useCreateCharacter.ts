import { CHARACTER_KEY, CREATE_CHARACTER_KEY } from '@/consts/queryKeys'
import wikiService from '@/services/wiki.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useCreateCharacter = () => {
	const queryClient = useQueryClient()

	return useMutation([CREATE_CHARACTER_KEY], (character: FormData) =>
		wikiService.createCharacter(character),
		{
			onSettled: () => {
				queryClient.invalidateQueries([CHARACTER_KEY])
			}
		}
	)
}
