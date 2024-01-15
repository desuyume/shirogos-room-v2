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
		setCategoryCharacters(characters.filter(character => character.category?.id === category.id))
	}, [])

	if (!categoryCharacters?.length || !categoryCharacters) {
		return <></>
	}

	return (
		<div className='mt-[4.06rem] relative z-10'>
			<div className='absolute bg-tertiary w-full h-[55.2%] top-[50%] translate-y-[-50%] -z-10' />
			<div className='flex justify-between items-center px-[9.5rem]'>
				<p className='text-[#FFF] text-[2.1875rem] w-[30%]'>{category.title}</p>
				<CategorySectionList characters={categoryCharacters} />
			</div>
		</div>
	)
}

export default CategorySection
