import { MANGA_CHAPTERS_KEY } from '@/consts/queryKeys'
import mangaService from '@/services/manga.service'
import { useQuery } from '@tanstack/react-query'

export const useMangasWithChapters = () => {
  return useQuery([MANGA_CHAPTERS_KEY], () => mangaService.getAllWithChapters(), {
    select: ({ data }) => data
  })
}
