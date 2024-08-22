import { NEWS_COUNT_KEY } from '@/consts/queryKeys'
import newsService from '@/services/news.service'
import { useQuery } from '@tanstack/react-query'

export const useNewsCount = () => {
  return useQuery([NEWS_COUNT_KEY], () => newsService.getCount(), {
    select: ({ data }) => data,
    refetchOnWindowFocus: false
  })
}
