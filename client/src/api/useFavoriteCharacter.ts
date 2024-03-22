import { FAVORITE_CHARACTER_KEY } from '@/consts/queryKeys'
import roomService from '@/services/room.service'
import { useQuery } from '@tanstack/react-query'

export const useFavoriteCharacter = () => {
	return useQuery([FAVORITE_CHARACTER_KEY], () => roomService.getFavoriteCharacter(), {
		select: ({ data }) => data,
	})
}