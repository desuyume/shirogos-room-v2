import { FC, useEffect, useState } from 'react'
import characterImg from '@/assets/wiki-test-img.png'
import { IWikiCharacter } from '@/types/types'
import CategorySectionList from './CategorySectionList'

interface ICategorySection {
	section: string
}

const CategorySection: FC<ICategorySection> = ({ section }) => {
	const [sectionItems, setSectionItems] = useState<IWikiCharacter[] | null>(null)
	const items = [
		{ id: 1, name: 'Сэм Аврорус', img: characterImg, section: 'Орудия Смерти' },
		{ id: 2, name: 'Сэм Аврорус', img: characterImg, section: 'Орудия Смерти' },
		{ id: 3, name: 'Сэм Аврорус', img: characterImg, section: 'Орудия Смерти' },
		{ id: 4, name: 'Сэм Аврорус', img: characterImg, section: 'Орудия Смерти' },
		{ id: 5, name: 'Сэм Аврорус', img: characterImg, section: 'Орудия Смерти' },
		{ id: 55, name: 'Сэм Аврорус', img: characterImg, section: 'Орудия Смерти' },
		{ id: 6, name: 'Сэм Аврорус', img: characterImg, section: 'Свинки' },
		{ id: 7, name: 'Сэм Аврорус', img: characterImg, section: 'Свинки' },
		{ id: 8, name: 'Сэм Аврорус', img: characterImg, section: 'Свинки' },
		{ id: 8, name: 'Сэм Аврорус', img: characterImg, section: 'Свинки' },
		{ id: 9, name: 'Сэм Аврорус', img: characterImg, section: 'Свинки' },
		{ id: 10, name: 'Сэм Аврорус', img: characterImg, section: '' },
		{ id: 11, name: 'Сэм Аврорус', img: characterImg, section: '' },
		{ id: 12, name: 'Сэм Аврорус', img: characterImg, section: '' },
	]

	useEffect(() => {
		setSectionItems(items.filter(item => item.section === section))
	}, [])

	if (!sectionItems?.length || !sectionItems) {
		return <></>
	}

	return (
		<div className='mt-[4.06rem] relative z-10'>
			<div className='absolute bg-tertiary w-full h-[55.2%] top-[50%] translate-y-[-50%] -z-10' />
			<div className='flex justify-between items-center px-[9.5rem]'>
				<p className='text-[#FFF] text-[2.1875rem] w-[30%]'>{section}</p>
				<CategorySectionList items={sectionItems} />
			</div>
		</div>
	)
}

export default CategorySection
