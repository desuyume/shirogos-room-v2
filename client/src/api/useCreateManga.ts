import { CREATE_MANGA_KEY, MANGA_CHAPTERS_KEY, MANGA_KEY } from '@/consts/queryKeys'
import mangaService from '@/services/manga.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useCreateManga = () => {
  const queryClient = useQueryClient()

  return useMutation([CREATE_MANGA_KEY], (manga: FormData) => mangaService.create(manga), {
    onSettled: () => {
      queryClient.invalidateQueries([MANGA_CHAPTERS_KEY])
      queryClient.invalidateQueries([MANGA_KEY])
    }
  })
}
