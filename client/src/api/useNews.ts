import { NEWS_KEY } from '@/consts/queryKeys'
import newsService from '@/services/news.service'
import { useQuery } from '@tanstack/react-query'

export const useNews = (skip: number) => {
  return useQuery([NEWS_KEY, skip], () => newsService.getOne(skip), {
    select: ({ data }) => data,
    refetchOnWindowFocus: false
  })
}
