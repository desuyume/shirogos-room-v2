import { cn } from '@/utils/cn'
import { FC } from 'react'

interface MangaPageProps {
  mangaWidth: number
  img: string | null
  isLoading: boolean
}

const MangaPage: FC<MangaPageProps> = ({ mangaWidth, img, isLoading }) => {
  const isAvailable = !!img && !isLoading

  return (
    <div
      className={cn('w-full', {
        'aspect-[5/8]': !isAvailable
      })}
    >
      <img
        style={{ width: mangaWidth + 'vw' }}
        className={cn('select-none transition-all', {
          'visible opacity-100': isAvailable,
          'invisible opacity-0': !isAvailable
        })}
        src={`${import.meta.env.VITE_SERVER_URL}/${img}`}
        alt='manga-img'
      />
      <div
        className={cn('absolute inset-0 h-full w-full bg-primaryText transition-all', {
          'invisible opacity-0': isAvailable,
          'visible opacity-100': !isAvailable
        })}
      />
    </div>
  )
}

export default MangaPage
