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
    isError: isCharactersError
  } = useAllCharacter()
  const {
    data: categories,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError
  } = useCharacterCategories()

  return (
    <div className='min-h-screen bg-wiki pb-[10rem]'>
      <Header isFixed={false} withLine={true} />
      {isCategoriesLoading || isCharactersLoading ? (
        <div className='flex h-[calc(100vh-15.25rem)] w-full items-center justify-center pt-20'>
          <p className='text-2xl'>Загрузка...</p>
        </div>
      ) : isCharactersError || isCategoriesError ? (
        <div className='flex h-[calc(100vh-15.25rem)] w-full items-center justify-center pt-20'>
          <p className='text-2xl'>Ошибка</p>
        </div>
      ) : !characters.length ? (
        <div className='flex h-[calc(100vh-15.25rem)] w-full items-center justify-center pt-20'>
          <p className='text-2xl'>Персонажи не найдены</p>
        </div>
      ) : (
        <>
          <div className='relative flex items-center'>
            <div className='relative mt-[0.81rem] flex h-[9.5rem] w-[17.8125rem] items-center justify-center bg-tertiary'>
              <p className='text-center text-[1.875rem] leading-tight text-primary'>
                Легендарная Википедия Персонажей
              </p>
              <img
                className='pointer-events-none absolute bottom-[-1.63rem] right-[-1.31rem]'
                src={titleImg}
                alt='title-img'
              />
            </div>
            <div className='absolute left-[50%] translate-x-[-50%]'>
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='h-[4.375rem] w-[47.34375vw] rounded-[1.25rem] bg-tertiary pl-[4.81rem] font-secondary text-[1.875rem] font-bold text-primaryText caret-primary outline-none'
              />
              <img
                className='pointer-events-none absolute left-6 top-[1.13rem]'
                src={searchIcon}
                alt='search-icon'
              />
            </div>
          </div>
          <NoCategorySection
            characters={
              !searchQuery
                ? characters.filter((character) => !character.category)
                : characters.filter((character) =>
                    character.name.toLowerCase().includes(searchQuery.toLowerCase())
                  )
            }
          />
          {!searchQuery &&
            categories.map((category) => (
              <CategorySection
                key={category.id}
                category={category}
                characters={characters.filter(
                  (character) => character.category?.id === category.id
                )}
              />
            ))}
        </>
      )}
    </div>
  )
}

export default Wiki
