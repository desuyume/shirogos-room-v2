import { ROOM_CHARACTERS_KEY } from '@/consts/queryKeys'
import roomService from '@/services/room.service'
import { IChooseFavoriteCharacter } from '@/types/room.interface'
import { useMutation } from '@tanstack/react-query'

export const useChooseFavoriteCharacter = () => {
	return useMutation([ROOM_CHARACTERS_KEY], (data: IChooseFavoriteCharacter) =>
		roomService.chooseFavoriteCharacter(data)
	)
}
