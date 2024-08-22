import { MANGA_KEY } from '@/consts/queryKeys'
import mangaService from '@/services/manga.service'
import { useQuery } from '@tanstack/react-query'

export const useManga = (id: string, chapter: number) => {
  return useQuery([MANGA_KEY, id, chapter], () => mangaService.getOne(id, chapter), {
    select: ({ data }) => data,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false
  })
}
