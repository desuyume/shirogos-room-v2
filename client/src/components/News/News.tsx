import { FC, useState } from 'react'
import { useNews } from '@/hooks/useNews'
import { formatDate } from '@/utils/formatDate'
import { useNewsCount } from '@/hooks/useNewsCount'

const News: FC = () => {
	const [skip, setSkip] = useState<number>(0)
	const { isFetching, isError, data: news, refetch } = useNews(skip)
	const { data: newsCount } = useNewsCount()
	const [isNextBttnHovered, setIsNextBttnHovered] = useState<boolean>(false)

	const clickNextNews = () => {
		setSkip(prev => prev + 1)
		refetch()
	}

	return (
		<div className='w-[66rem] h-[9.375rem] bg-tertiary bg-opacity-40 absolute top-4 right-6 rounded-[2.3125rem] flex justify-between items-center pr-[0.94rem] transition-all news'>
			{isFetching ? (
				<p className='w-full h-full flex justify-center items-center text-xl text-primaryText'>
					Загрузка...
				</p>
			) : isError ? (
				<p className='w-full h-full flex justify-center items-center text-xl text-primaryText'>
					Ошибка 0_0
				</p>
			) : !news ? (
				<p className='w-full h-full flex justify-center items-center text-xl text-primaryText'>
					Новостей нет :/
				</p>
			) : (
				<>
					<img
						className='w-[11.75rem] h-full object-fill rounded-[2.3125rem]'
						src={`${import.meta.env.VITE_SERVER_URL}/${news?.news_img}`}
						alt='announce-img'
					/>

					<p className='text-primaryText font-secondary font-bold flex-1 text-[1.5625rem] ml-6 px-2'>
						{news?.text}
					</p>
					<p
						className={
							(isNextBttnHovered && 'mr-[1.37rem]') +
							' text-primaryText font-secondary font-bold text-xl max-w-[6.875rem] text-center ml-2.5 mr-8 transition-all leading-[97.795%]'
						}
					>
						{news && formatDate(news.created_at)}
					</p>
					<button
						className={
							(isNextBttnHovered
								? 'w-[1.1875rem] rounded-[0.3125rem] h-[5.0625rem] '
								: '') +
							(skip + 1 === newsCount?.count
								? 'opacity-0 invisible '
								: 'opacity-100 visible ') +
							'w-[0.5625rem] h-[5rem] bg-[#EBE984] rounded-[1.5625rem] transition-all'
						}
						onClick={clickNextNews}
						onMouseOver={() => setIsNextBttnHovered(true)}
						onMouseLeave={() => setIsNextBttnHovered(false)}
					/>
				</>
			)}
		</div>
	)
}

export default News
