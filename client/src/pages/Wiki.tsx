import Header from '@/layout/Header/Header'
import titleImg from '@/assets/wiki-title-img.png'
import searchIcon from '@/assets/search-icon.png'
import NoCategorySection from '@/components/Wiki/NoCategorySection'
import CategorySection from '@/components/Wiki/CategorySection'
import { useCharacterCategories } from '@/api/useCharacterCategories'
import { useAllCharacter } from '@/api/useAllCharacter'
import { useState } from 'react'

const Wiki = () => {
	const [searchQuery, setSearchQuery] = useState<string>('')

	const {
		data: characters,
		isLoading: isCharactersLoading,
		isError: isCharactersError,
	} = useAllCharacter()
	const {
		data: categories,
		isLoading: isCategoriesLoading,
		isError: isCategoriesError,
	} = useCharacterCategories()

	return (
		<div className='bg-wiki min-h-screen pb-[10rem]'>
			<Header isFixed={false} withLine={false} />
			{isCategoriesLoading || isCharactersLoading ? (
				<div className='w-full h-[calc(100vh-15.25rem)] flex justify-center items-center pt-20'>
					<p className='text-2xl'>Загрузка...</p>
				</div>
			) : isCharactersError || isCategoriesError ? (
				<div className='w-full h-[calc(100vh-15.25rem)] flex justify-center items-center pt-20'>
					<p className='text-2xl'>Ошибка</p>
				</div>
			) : !characters.length ? (
				<div className='w-full h-[calc(100vh-15.25rem)] flex justify-center items-center pt-20'>
					<p className='text-2xl'>Персонажи не найдены</p>
				</div>
			) : (
				<>
					<div className='flex items-center relative'>
						<div className='bg-tertiary w-[17.8125rem] h-[9.5rem] flex justify-center items-center mt-[0.81rem] relative'>
							<p className='text-primary text-[1.875rem] text-center leading-tight'>
								Легендарная Википедия Персонажей
							</p>
							<img
								className='absolute bottom-[-1.63rem] right-[-1.31rem] pointer-events-none'
								src={titleImg}
								alt='title-img'
							/>
						</div>
						<div className='absolute left-[50%] translate-x-[-50%]'>
							<input
								value={searchQuery}
								onChange={e => setSearchQuery(e.target.value)}
								className='w-[47.34375vw] h-[4.375rem] bg-tertiary rounded-[1.25rem] outline-none text-[#FFF] font-secondary text-[1.875rem] font-bold pl-[4.81rem] caret-primary'
							/>
							<img
								className='pointer-events-none absolute top-[1.13rem] left-6'
								src={searchIcon}
								alt='search-icon'
							/>
						</div>
					</div>
					<NoCategorySection
						characters={
							!searchQuery
								? characters.filter(character => !character.category)
								: characters.filter(character =>
										character.name
											.toLowerCase()
											.includes(searchQuery.toLowerCase())
								  )
						}
					/>
					{!searchQuery &&
						categories.map(category => (
							<CategorySection
								key={category.id}
								category={category}
								characters={characters.filter(
									character => character.category?.id === category.id
								)}
							/>
						))}
				</>
			)}
		</div>
	)
}

export default Wiki
