import { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import ChaptersList from './ChaptersList'
import { cn } from '@/utils/cn'
import { DangotekaItemType } from '@/pages/Dangoteka'

interface IReaderHeader {
  title: string
  currentPage: number
  pages: number
  currentChapter?: number
  chapters?: number
  type: DangotekaItemType
  itemId: string
  clickNext?: () => void
  clickPrev?: () => void
}

const ReaderHeader: FC<IReaderHeader> = ({
  title,
  currentPage,
  pages,
  currentChapter,
  chapters,
  type,
  itemId,
  clickNext,
  clickPrev
}) => {
  const isHasChapters: boolean = type === 'manga' && !!chapters && chapters > 1
  const [isChaptersVisible, setIsChaptersVisible] = useState<boolean>(false)

  return (
    <div className='header relative flex min-h-[7.875rem] items-center justify-center border-b-[1px] border-b-secondaryHover bg-tertiary'>
      <div
        onClick={() => isHasChapters && setIsChaptersVisible(!isChaptersVisible)}
        className={cn(
          'group absolute left-[4.3rem] -mb-[2px] flex h-full items-center border-b-[5px] border-b-primary pb-[2.5px] transition-all',
          {
            'cursor-pointer hover:border-b-primaryHover': isHasChapters,
            'border-b-primaryHover': isChaptersVisible
          }
        )}
      >
        <p
          className={cn(
            'w-[17rem] px-2 text-center font-tertiary text-2xl text-primaryText transition-all',
            {
              'group-hover:text-white': isHasChapters
            }
          )}
        >
          {title} {chapters && chapters > 1 && '/ Глава ' + currentChapter}
        </p>
        {chapters && chapters > 1 && (
          <ChaptersList
            isVisible={isChaptersVisible}
            setIsVisible={setIsChaptersVisible}
            chaptersCount={chapters}
            currentChapter={currentChapter}
            path={type + '/' + itemId}
          />
        )}
      </div>

      <div className='relative mb-[5px] flex items-center'>
        {+currentPage > 1 && type === 'story' && (
          <button
            onClick={clickPrev}
            className='absolute right-[140%] h-5 w-[0.25rem] bg-[#E14177] transition-all hover:w-[1.625rem]'
          />
        )}
        <p className='font-tertiary text-2xl text-primaryText '>
          {currentPage}/{pages}
        </p>
        {+currentPage < pages && type === 'story' && (
          <button
            onClick={clickNext}
            className='absolute left-[140%] h-5 w-[0.25rem] bg-[#E14177] transition-all hover:w-[1.625rem]'
          />
        )}
      </div>

      <Link
        to='/dangoteka'
        className='absolute right-[4.3rem] -mb-[2px] flex h-full w-[17.14281rem] items-center justify-center border-b-[5px] border-b-transparent pb-[2.5px] font-tertiary text-2xl text-primaryText transition-all hover:border-b-primary hover:text-white'
      >
        Назад
      </Link>
    </div>
  )
}

export default ReaderHeader
