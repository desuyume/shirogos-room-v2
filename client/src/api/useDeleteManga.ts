import { MANGA_CHAPTERS_KEY, MANGA_KEY } from '@/consts/queryKeys'
import mangaService from '@/services/manga.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useDeleteManga = (id: number | null) => {
  const queryClient = useQueryClient()

  return useMutation([MANGA_CHAPTERS_KEY, id], () => mangaService.remove(id), {
    onSettled: () => {
      queryClient.invalidateQueries([MANGA_CHAPTERS_KEY])
      queryClient.invalidateQueries([MANGA_KEY])
    }
  })
}
