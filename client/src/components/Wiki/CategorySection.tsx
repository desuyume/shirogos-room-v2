import { FC, useEffect, useState } from 'react'
import CategorySectionList from './CategorySectionList'
import { ICategory, ICharacterPreview } from '@/types/wiki.interface'

interface ICategorySection {
	characters: ICharacterPreview[]
	category: ICategory
}

const CategorySection: FC<ICategorySection> = ({ characters, category }) => {
	const [categoryCharacters, setCategoryCharacters] = useState<
		ICharacterPreview[] | null
	>(null)

	useEffect(() => {
		setCategoryCharacters(
			characters.filter(character => character.category?.id === category.id)
		)
	}, [])

	if (!categoryCharacters?.length || !categoryCharacters) {
		return <></>
	}

	return (
		<div className='w-full h-full mt-[4.06rem] relative z-10'>
			<div className='absolute bg-tertiary w-full h-[65%] top-[calc(50%-25px)] translate-y-[-50%] -z-10'>
				<div className='w-[30%] h-full ml-[5.4375rem] flex justify-center items-center'>
					<p className='text-primaryText text-[2.1875rem] leading-[2.8125rem] line-clamp-3 break-words text-center'>
						{category.title}
					</p>
				</div>
			</div>
			<div className='flex justify-between items-center ml-[calc(30%+9.5rem)] pr-[5.4375rem]'>
				<CategorySectionList characters={categoryCharacters} />
			</div>
		</div>
	)
}

export default CategorySection
