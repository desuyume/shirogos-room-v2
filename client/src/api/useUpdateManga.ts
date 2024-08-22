import { MANGA_CHAPTERS_KEY, MANGA_KEY, UPDATE_MANGA_KEY } from '@/consts/queryKeys'
import mangaService from '@/services/manga.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useUpdateManga = (id: string) => {
  const queryClient = useQueryClient()

  return useMutation([UPDATE_MANGA_KEY], (manga: FormData) => mangaService.update(id, manga), {
    onSuccess: () => {
      queryClient.invalidateQueries([MANGA_CHAPTERS_KEY])
      queryClient.invalidateQueries([MANGA_KEY])
    }
  })
}
