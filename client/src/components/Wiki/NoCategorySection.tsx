import { FC } from 'react'
import { ICharacterPreview } from '@/types/wiki.interface'
import WikiCharacterItem from './WikiCharacterItem'

interface INoCategorySection {
  characters: ICharacterPreview[]
}

const NoCategorySection: FC<INoCategorySection> = ({ characters }) => {
  return (
    <div className='relative z-10 mt-[4.69rem]'>
      <div className='absolute top-[calc(50%-1.5625rem)] -z-10 h-[calc(100%-8.625rem)] w-full translate-y-[-50%] bg-tertiary' />
      <div className='z-20 flex flex-col items-center gap-y-[2.4375rem] px-[5.4375rem] tablet:grid tablet:grid-cols-2 tablet:items-start medium-tablet:grid-cols-3 laptop:grid-cols-4 min-desktop:grid-cols-5 medium-desktop:grid-cols-6 fullhd:grid-cols-8 2k:grid-cols-9 4k:grid-cols-12'>
        {characters.map((character) => (
          <WikiCharacterItem
            key={character.id}
            id={character.id}
            name={character.name}
            img={character.miniature_img ?? character.original_img}
          />
        ))}
      </div>
    </div>
  )
}

export default NoCategorySection
