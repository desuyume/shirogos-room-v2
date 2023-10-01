import { CREATE_NEWS_KEY } from '@/consts/queryKeys'
import newsService from '@/services/news.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useCreateNews = () => {
	const queryClient = useQueryClient()

	return useMutation(
		[CREATE_NEWS_KEY],
		(news: FormData) => newsService.create(news),
		{
			onSettled: () => {
				queryClient.invalidateQueries([CREATE_NEWS_KEY])
			},
		}
	)
}
