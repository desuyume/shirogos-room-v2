import { FC } from 'react'
import { ICharacterPreview } from '@/types/wiki.interface'
import WikiCharacterItem from './WikiCharacterItem'

interface INoCategorySection {
	characters: ICharacterPreview[]
}

const NoCategorySection: FC<INoCategorySection> = ({ characters }) => {
	return (
		<div className='mt-[4.69rem] relative z-10'>
			<div className='absolute bg-tertiary w-full h-[calc(100%-8.625rem)] top-[calc(50%-1.5625rem)] translate-y-[-50%] -z-10' />
			<div className='flex flex-col items-center tablet:items-start tablet:grid tablet:grid-cols-2 medium-tablet:grid-cols-3 laptop:grid-cols-4 min-desktop:grid-cols-5 medium-desktop:grid-cols-6 fullhd:grid-cols-8 2k:grid-cols-9 4k:grid-cols-12 gap-y-[2.4375rem] px-[5.4375rem] z-20'>
				{characters.map(character => (
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
