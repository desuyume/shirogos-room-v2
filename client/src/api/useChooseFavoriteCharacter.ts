import {
	CHOOSE_FAVORITE_CHARACTER_KEY,
	FAVORITE_CHARACTER_KEY,
} from '@/consts/queryKeys'
import roomService from '@/services/room.service'
import { IChooseFavoriteCharacter } from '@/types/room.interface'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useChooseFavoriteCharacter = () => {
	const queryClient = useQueryClient()

	return useMutation(
		[CHOOSE_FAVORITE_CHARACTER_KEY],
		(data: IChooseFavoriteCharacter) =>
			roomService.chooseFavoriteCharacter(data),
		{
			onSettled: () => {
				queryClient.invalidateQueries([FAVORITE_CHARACTER_KEY])
			},
		}
	)
}
