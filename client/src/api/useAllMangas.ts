import { MANGA_KEY } from '@/consts/queryKeys'
import mangaService from '@/services/manga.service'
import { useQuery } from '@tanstack/react-query'

export const useAllMangas = () => {
  return useQuery([MANGA_KEY], () => mangaService.getAll(), {
    select: ({ data }) => data,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false
  })
}
