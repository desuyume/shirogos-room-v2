import { Carousel } from '@mantine/carousel'
import { FC } from 'react'
import { ICharacterPreview } from '@/types/wiki.interface'
import WikiCharacterItem from './WikiCharacterItem'

interface ICategorySectionList {
	characters: ICharacterPreview[]
}

const CategorySectionList: FC<ICategorySectionList> = ({ characters }) => {
	return (
		<Carousel
			className='z-20 flex-1 ml-5 pr-1 flex justify-center'
			slideGap='xl'
			slideSize='16.6666%'
			slidesToScroll={1}
			align='start'
			draggable={true}
			loop
			withControls={false}
		>
			{characters.map(character => (
				<Carousel.Slide key={character.id}>
					<WikiCharacterItem
						key={character.id}
						id={character.id}
						name={character.name}
						img={character.miniature_img ?? character.original_img}
						inCategory
					/>
				</Carousel.Slide>
			))}
		</Carousel>
	)
}

export default CategorySectionList
