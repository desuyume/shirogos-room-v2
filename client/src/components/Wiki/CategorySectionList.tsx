import { IWikiCharacter } from '@/types/types'
import { Carousel } from '@mantine/carousel'
import { FC } from 'react'
import CategorySectionItem from './CategorySectionItem'

interface ICategorySectionList {
	items: IWikiCharacter[]
}

const CategorySectionList: FC<ICategorySectionList> = ({ items }) => {
	return (
		<Carousel
			className='z-20 flex-1 ml-5 flex justify-center'
			slideGap="xl"
			slideSize='16.6666%'
			slidesToScroll={1}
			align='start'
			draggable={true}
			loop
			withControls={false}
		>
			{items.map(item => (
				<Carousel.Slide>
					<CategorySectionItem key={item.id} name={item.name} img={item.img} />
				</Carousel.Slide>
			))}
		</Carousel>
	)
}

export default CategorySectionList
