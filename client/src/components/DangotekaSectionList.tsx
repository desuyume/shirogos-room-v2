import { FC } from 'react'
import mangaImg from '../assets/manga.png'
import storyImg from '../assets/story.png'
import DangotekaSectionItem from './DangotekaSectionItem'
import { Carousel } from '@mantine/carousel'

interface IDangotekaSectionList {
	type: string
}

const DangotekaSectionList: FC<IDangotekaSectionList> = ({ type }) => {
	const mangas = [
		{
			img: mangaImg,
			title: 'FOR:LOWERS Для низших уровней',
			description:
				'Авантюристы прибывают в Ди-Таун. Однако действия загадочной девушки приводят к тому, что те сваливаются в подземелье, где не менее загадочный мужик говорит им проходить испытание. Внушительно. Особенно когда тот на глазах убивает нескольких из них. ',
		},
		{
			img: mangaImg,
			title: 'FOR:LOWERS Для низших уровней',
			description:
				'Авантюристы прибывают в Ди-Таун. Однако действия загадочной девушки приводят к тому, что те сваливаются в подземелье, где не менее загадочный мужик говорит им проходить испытание. Внушительно. Особенно когда тот на глазах убивает нескольких из них. ',
		},
		{
			img: mangaImg,
			title: 'FOR:LOWERS Для низших уровней',
			description:
				'Авантюристы прибывают в Ди-Таун. Однако действия загадочной девушки приводят к тому, что те сваливаются в подземелье, где не менее загадочный мужик говорит им проходить испытание. Внушительно. Особенно когда тот на глазах убивает нескольких из них. ',
		},
	]
	const stories = [
		{
			img: storyImg,
			title: 'Ледяное пламя',
			description:
				'Юная девушка Кристал Ширен отправляется в путешествие, ведомая духом авантюризма.',
		},
		{
			img: storyImg,
			title: 'Ледяное пламя',
			description:
				'Юная девушка Кристал Ширен отправляется в путешествие, ведомая духом авантюризма.',
		},
		{
			img: storyImg,
			title: 'Ледяное пламя',
			description:
				'Юная девушка Кристал Ширен отправляется в путешествие, ведомая духом авантюризма.',
		},
	]

	return (
		<div className='flex w-full h-[25.6rem] '>
			<Carousel
				className='w-full pt-[1.3rem]'
				slideSize="33.333333%"
				align='start'
				draggable={false}
				loop
				styles={{
					root: {
						height: '100%'
					},
					controls: {
						height: "100%",
						display: "flex",
					  position: 'absolute',
						top: 0,
						border: 'none',
						padding: '0'
					},
					control: {
						'&:first-of-type': {
							visibility: 'hidden'
						},
						'&:hover': {
							backgroundColor: type === 'manga' ? '#323232 !important' : '#FF75AB !important'
						},
						transition: 'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1)',
						border: 'none',
						borderTop: '1px solid #181818',
						color: '#FFF',
						backgroundColor: type === 'manga' ?  '#242424 !important' : '#C34375 !important',
						height: '100%',
						borderRadius: '0',
						width: '3.1875rem',
						fontSize: '2.1875rem',
						fontFamily: 'Days One',
						opacity: '100',
						right: '0'
					}
				}}
				nextControlIcon={<p>{'>'}</p>}
				previousControlIcon={<p>{'<'}</p>}
				breakpoints={[
					{ maxWidth: '1800', slideSize: '50%', slideGap: '0' },
					{ maxWidth: '1300', slideSize: '100%', slideGap: '0' },
				]}
			>
				{type === 'manga'
					? mangas.map(manga => (
							<Carousel.Slide>
								<DangotekaSectionItem
									key={manga.title}
									img={manga.img}
									title={manga.title}
									description={manga.description}
								/>
							</Carousel.Slide>
					  ))
					: stories.map(story => (
							<Carousel.Slide>
								<DangotekaSectionItem
									key={story.title}
									img={story.img}
									title={story.title}
									description={story.description}
								/>
							</Carousel.Slide>
					  ))}
			</Carousel>
		</div>
	)
}

export default DangotekaSectionList
