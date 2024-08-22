import { FC, useEffect, useState } from 'react'
import CategorySectionList from './CategorySectionList'
import { ICategory, ICharacterPreview } from '@/types/wiki.interface'

interface ICategorySection {
  characters: ICharacterPreview[]
  category: ICategory
}

const CategorySection: FC<ICategorySection> = ({ characters, category }) => {
  const [categoryCharacters, setCategoryCharacters] = useState<ICharacterPreview[] | null>(null)

  useEffect(() => {
    setCategoryCharacters(characters.filter((character) => character.category?.id === category.id))
  }, [])

  if (!categoryCharacters?.length || !categoryCharacters) {
    return <></>
  }

  return (
    <div className='relative z-10 mt-[4.06rem] h-full w-full'>
      <div className='absolute top-[calc(50%-25px)] -z-10 h-[65%] w-full translate-y-[-50%] bg-tertiary'>
        <div className='ml-[5.4375rem] flex h-full w-[30%] items-center justify-center'>
          <p className='line-clamp-3 break-words text-center text-[2.1875rem] leading-[2.8125rem] text-primaryText'>
            {category.title}
          </p>
        </div>
      </div>
      <div className='ml-[calc(30%+9.5rem)] flex items-center justify-between pr-[5.4375rem]'>
        <CategorySectionList characters={categoryCharacters} />
      </div>
    </div>
  )
}

export default CategorySection
