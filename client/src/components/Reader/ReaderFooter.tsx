import { FC } from 'react'
import zoomIcon from '@/assets/dangoteka/zoom.png'

interface IReaderFooter {
  offset: number | undefined
  currentPage: number
  itemType: string
  clickZoom: () => void
  pages: number
  type: string
  clickNext?: () => void
  clickPrev?: () => void
}

const ReaderFooter: FC<IReaderFooter> = ({
  currentPage,
  offset,
  itemType,
  clickZoom,
  pages,
  type,
  clickNext,
  clickPrev
}) => {
  return (
    <div
      className='flex min-h-[7.8125rem] items-center justify-between border-t-[1px] border-t-secondaryHover transition-all'
      style={
        pages > 0
          ? { paddingLeft: offset + '%', paddingRight: offset + '%' }
          : { paddingLeft: '4.3rem', paddingRight: '4.3rem' }
      }
    >
      <div className='flex items-center'>
        <img
          onClick={clickZoom}
          className='mr-2.5 cursor-pointer select-none'
          src={zoomIcon}
          alt='zoom-img'
        />
        <p className='font-tertiary text-[0.9375rem] text-primaryText'>
          - {itemType === 'manga' ? 'Увеличить размер страницы' : 'Увеличить текст'}
        </p>
      </div>
      <div className='relative flex items-center'>
        {+currentPage > 1 && type === 'story' && (
          <button
            onClick={clickPrev}
            className='absolute right-[125%] h-5 w-[0.25rem] bg-[#E14177] transition-all hover:w-[1.625rem]'
          />
        )}
        <p className='font-tertiary text-2xl text-primaryText'>
          {currentPage}/{pages}
        </p>
        {+currentPage < pages && type === 'story' && (
          <button
            onClick={clickNext}
            className='absolute left-[125%] h-5 w-[0.25rem] bg-[#E14177] transition-all hover:w-[1.625rem]'
          />
        )}
      </div>
    </div>
  )
}

export default ReaderFooter
