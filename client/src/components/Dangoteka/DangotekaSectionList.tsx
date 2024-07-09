import { FC, useEffect, useRef, useState } from 'react'
import DangotekaSectionItem from './DangotekaSectionItem'
import { Carousel } from '@mantine/carousel'
import { useWindowSize } from 'usehooks-ts'
import { useAllMangas } from '@/api/useAllMangas'
import { useStoriesGeneral } from '@/api/useStoriesGeneral'
import { IMangaGeneral } from '@/types/manga.interface'
import { IStoryGeneral } from '@/types/story.interface'
import type { DangotekaItemType } from './DangotekaSection'

interface IDangotekaSectionList {
	type: DangotekaItemType
}

const DangotekaSectionList: FC<IDangotekaSectionList> = ({ type }) => {
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
	const { width } = useWindowSize()
	const [isWithControls, setIsWithControls] = useState<boolean>(true)
	const carouselRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		if (items.length * 666.7 <= width) {
			setIsWithControls(false)
		} else {
			setIsWithControls(true)
		}
	}, [width, items])

	useEffect(() => {
		if (type === 'manga') {
			if (!isMangaLoading && !isMangaError) {
				setItems(mangas)
			}
		} else {
			if (!isStoryLoading && !isStoryError) {
				setItems(stories)
			}
		}
	}, [isMangaLoading, isStoryLoading])

	return (
		<div className='flex w-full h-[25.6rem]'>
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
					ref={carouselRef}
					className='w-full pt-[1.3rem]'
					align='start'
					draggable={false}
					loop
					initialSlide={0}
					slideGap={0}
					withControls={isWithControls}
					styles={{
						root: {
							height: '100%',
						},
						controls: {
							height: '100%',
							display: 'flex',
							position: 'absolute',
							top: 0,
							border: 'none',
							padding: '0',
						},
						control: {
							'&:hover': {
								backgroundColor:
									type === 'manga'
										? '#323232 !important'
										: '#FF75AB !important',
							},
							transition: 'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1)',
							border: 'none',
							borderTop: '1px solid #181818',
							color: '#FFF',
							backgroundColor:
								type === 'manga' ? '#242424 !important' : '#C34375 !important',
							height: '100%',
							borderRadius: '0',
							width: '3.1875rem',
							fontSize: '2.1875rem',
							fontFamily: 'Days One',
							opacity: '100',
							right: '0',
						},
					}}
					nextControlIcon={<p>{'>'}</p>}
					previousControlIcon={<p>{'<'}</p>}
					breakpoints={[
						{ minWidth: '3500', slideSize: '20%' },
						{ minWidth: '2800', slideSize: '25%' },
						{ minWidth: '2100', slideSize: '33.34%' },
						{ minWidth: '1350', slideSize: '50%' },
						{ minWidth: '800', slideSize: '100%' },
					]}
				>
					{items.map(item => (
						<Carousel.Slide key={item.id}>
							<DangotekaSectionItem
								key={type + item.title}
								type={type}
								itemId={item.id}
								img={item.cover_img}
								title={item.title}
								description={item.description}
							/>
						</Carousel.Slide>
					))}
				</Carousel>
			)}
		</div>
	)
}

export default DangotekaSectionList
