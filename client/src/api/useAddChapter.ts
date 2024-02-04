import { ADD_CHAPTER_MANGA_KEY, MANGA_CHAPTERS_KEY, MANGA_KEY } from '@/consts/queryKeys'
import mangaService from '@/services/manga.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useAddChapter = (id: string) => {
	const queryClient = useQueryClient()

	return useMutation([ADD_CHAPTER_MANGA_KEY], (manga: FormData) =>
		mangaService.addChapter(id, manga),
		{
			onSettled: () => {
				queryClient.invalidateQueries([MANGA_CHAPTERS_KEY])
				queryClient.invalidateQueries([MANGA_KEY])
			},
		}
	)
}
