import { FC, useEffect, useState } from 'react'
import DangotekaSectionItem from './DangotekaSectionItem'
import { useAllMangas } from '@/api/useAllMangas'
import { useStoriesGeneral } from '@/api/useStoriesGeneral'
import { IMangaGeneral } from '@/types/manga.interface'
import { IStoryGeneral } from '@/types/story.interface'
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '../ui/carousel'
import { cn } from '@/utils/cn'
import type { DangotekaItemType } from '@/pages/Dangoteka'

interface DangotekaSectionListProps {
	type: DangotekaItemType
	className?: string
}

const DangotekaSectionList: FC<DangotekaSectionListProps> = ({
	type,
	className,
}) => {
	const {
		data: mangas,
		isLoading: isMangaLoading,
		isError: isMangaError,
	} = useAllMangas()
	const {
		data: stories,
		isLoading: isStoryLoading,
		isError: isStoryError,
	} = useStoriesGeneral()

	const [items, setItems] = useState<IMangaGeneral[] | IStoryGeneral[]>([])

	useEffect(() => {
		if (type === 'manga') {
			if (!isMangaLoading && !isMangaError) {
				setItems(mangas)
			}
		}

		if (type === 'story') {
			if (!isStoryLoading && !isStoryError) {
				setItems(stories)
			}
		}
	}, [isMangaLoading, isStoryLoading, isMangaError, isStoryError])

	return (
		<div
			className={cn(
				'flex w-full bg-repeat-x bg-[left_3.25rem_top]',
				{
					'h-[27.0625rem]': type === 'manga',
					'h-[29.1875rem]': type === 'story',
				},
				className
			)}
			style={{
				backgroundImage:
					type === 'manga'
						? "url('/images/manga-bg.png')"
						: "url('/images/story-bg.png')",
			}}
		>
			{(type === 'manga' && isMangaLoading) ||
			(type === 'story' && isStoryLoading) ? (
				<div className='w-full h-full flex justify-center items-center'>
					<p className='text-xl'>Загрузка...</p>
				</div>
			) : (type === 'manga' && isMangaError) ||
			  (type === 'story' && isStoryError) ? (
				<div className='w-full h-full flex justify-center items-center'>
					<p className='text-xl'>Ошибка</p>
				</div>
			) : (
				<Carousel
					className='w-full flex [&>div]:w-full'
					opts={{
						align: 'start',
						loop: true,
					}}
				>
					<CarouselContent
						className={cn('mx-[2.25rem]', {
							'pt-[2.6875rem]': type === 'manga',
							'pt-[3.125rem]': type === 'story',
						})}
					>
						{items.map(item => (
							<>
								<CarouselItem
									key={item.id}
									className='min-desktop:basis-1/2 basis-full flex justify-center p-0 min-desktop:pl-[34px] relative'
								>
									<DangotekaSectionItem
										type={type}
										itemId={item.id}
										img={item.cover_img}
										title={item.title}
										description={item.description}
									/>
									<div className='w-[0.25rem] h-[10.1875rem] bg-primaryText absolute right-0 top-16 translate-x-0.5 hidden min-desktop:block' />
								</CarouselItem>
							</>
						))}
					</CarouselContent>

					<CarouselPrevious
						className={cn(
							'left-0 w-[2.5rem] h-[16.75rem] text-[2.1875rem] text-primaryText rounded-none outline-none border-none transition-colors disabled:opacity-0 disabled:invisible',
							{
								'bg-primary hover:bg-primaryHover hover:text-white':
									type === 'story',
								'bg-secondaryHover hover:bg-[#414141] hover:text-white':
									type === 'manga',
							}
						)}
						content='<'
					/>
					<CarouselNext
						className={cn(
							'right-0 w-[2.5rem] h-[16.75rem] text-[2.1875rem] text-primaryText rounded-none outline-none border-none transition-colors disabled:opacity-0 disabled:invisible',
							{
								'bg-primary hover:bg-primaryHover hover:text-white':
									type === 'story',
								'bg-secondaryHover hover:bg-[#414141] hover:text-white':
									type === 'manga',
							}
						)}
						content='>'
					/>
				</Carousel>
			)}
		</div>
	)
}

export default DangotekaSectionList
