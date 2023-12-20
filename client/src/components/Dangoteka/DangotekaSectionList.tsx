import { FC, useEffect, useRef, useState } from 'react'
import mangaImg from '@/assets/manga.png'
import storyImg from '@/assets/story.png'
import DangotekaSectionItem from './DangotekaSectionItem'
import { Carousel } from '@mantine/carousel'
import { useWindowSize } from 'usehooks-ts'

interface IDangotekaSectionList {
	type: string
}

const DangotekaSectionList: FC<IDangotekaSectionList> = ({ type }) => {
	const mangas = [
		{
			itemId: 'forlowers',
			img: mangaImg,
			title: 'FOR:LOWERS Для низших уровней',
			description:
				'Авантюристы прибывают в Ди-Таун. Однако действия загадочной девушки приводят к тому, что те сваливаются в подземелье, где не менее загадочный мужик говорит им проходить испытание. Внушительно. Особенно когда тот на глазах убивает нескольких из них. ',
		},
		{
			itemId: 'forlowers',
			img: mangaImg,
			title: 'FOR:LOWERS Для низших уровней',
			description:
				'Авантюристы прибывают в Ди-Таун. Однако действия загадочной девушки приводят к тому, что те сваливаются в подземелье, где не менее загадочный мужик говорит им проходить испытание. Внушительно. Особенно когда тот на глазах убивает нескольких из них. ',
		},
		{
			itemId: 'forlowers',
			img: mangaImg,
			title: 'FOR:LOWERS Для низших уровней',
			description:
				'Авантюристы прибывают в Ди-Таун. Однако действия загадочной девушки приводят к тому, что те сваливаются в подземелье, где не менее загадочный мужик говорит им проходить испытание. Внушительно. Особенно когда тот на глазах убивает нескольких из них. ',
		},
	]
	const stories = [
		{
			itemId: 'flame',
			img: storyImg,
			title: 'Ледяное пламя',
			description:
				'Юная девушка Кристал Ширен отправляется в путешествие, ведомая духом авантюризма.',
		},
		{
			itemId: 'flame',
			img: storyImg,
			title: 'Ледяное пламя',
			description:
				'Юная девушка Кристал Ширен отправляется в путешествие, ведомая духом авантюризма.',
		},
		{
			itemId: 'flame',
			img: storyImg,
			title: 'Ледяное пламя',
			description:
				'Юная девушка Кристал Ширен отправляется в путешествие, ведомая духом авантюризма.',
		},
		{
			itemId: 'flame',
			img: storyImg,
			title: 'Ледяное пламя',
			description:
				'Юная девушка Кристал Ширен отправляется в путешествие, ведомая духом авантюризма.',
		},
		{
			itemId: 'flame',
			img: storyImg,
			title: 'Ледяное пламя',
			description:
				'Юная девушка Кристал Ширен отправляется в путешествие, ведомая духом авантюризма.',
		},
	]
	const [items, _] = useState<any[]>(type === 'manga' ? mangas : stories)
	const { width } = useWindowSize()
	const [isWithControls, setIsWithControls] = useState<boolean>(true)
	const carouselRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		console.log(carouselRef.current);
		
		if ((items.length * 666.7) <= width) {
			setIsWithControls(false)
		} else {
			setIsWithControls(true)
		}
	}, [width, items])

	return (
		<div className='flex w-full h-[25.6rem]'>
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
								type === 'manga' ? '#323232 !important' : '#FF75AB !important',
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
					<Carousel.Slide>
						<DangotekaSectionItem
							key={item.title}
							type={type}
							itemId={item.itemId}
							img={item.img}
							title={item.title}
							description={item.description}
						/>
					</Carousel.Slide>
				))}
			</Carousel>
		</div>
	)
}

export default DangotekaSectionList
