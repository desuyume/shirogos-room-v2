import { cn } from '@/utils/cn'
import { FC } from 'react'

interface MangaPageProps {
	mangaWidth: number
	img: string | null
	isLoading: boolean
}

const MangaPage: FC<MangaPageProps> = ({ mangaWidth, img, isLoading }) => {
	const isAvailable = !!img && !isLoading

	return (
		<div
			className={cn('w-full', {
				'aspect-[5/8]': !isAvailable,
			})}
		>
			<img
				style={{ width: mangaWidth + 'vw' }}
				className={cn('select-none transition-all', {
					'opacity-100 visible': isAvailable,
					'opacity-0 invisible': !isAvailable,
				})}
				src={`${import.meta.env.VITE_SERVER_URL}/${img}`}
				alt='manga-img'
			/>
			<div
				className={cn(
					'w-full h-full bg-primaryText absolute inset-0 transition-all',
					{
						'opacity-0 invisible': isAvailable,
						'opacity-100 visible': !isAvailable,
					}
				)}
			/>
		</div>
	)
}

export default MangaPage
