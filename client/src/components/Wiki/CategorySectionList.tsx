import { FC } from 'react'
import { ICharacterPreview } from '@/types/wiki.interface'
import WikiCharacterItem from './WikiCharacterItem'
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel'

interface ICategorySectionList {
  characters: ICharacterPreview[]
}

const CategorySectionList: FC<ICategorySectionList> = ({ characters }) => {
  return (
    <Carousel opts={{
      align: 'start',
      loop: true,
    }} className='z-20 ml-5 flex-1'>
      <CarouselContent className='m-0'>
        {characters.map((character) => (
          <CarouselItem key={character.id} className='p-0 basis-1/6'>
            <WikiCharacterItem
              key={character.id}
              id={character.id}
              name={character.name}
              img={character.miniature_img ?? character.original_img}
              inCategory
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}

export default CategorySectionList
