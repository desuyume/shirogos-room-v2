import { FC } from 'react'

interface IChapterItem {
  chapter: number
  path: string
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const ChapterItem: FC<IChapterItem> = ({ chapter, path, setIsVisible }) => {
  return (
    <a
      className='mb-3 flex h-[1.6875rem] w-full items-center justify-center bg-primary font-tertiary text-2xl text-primaryText transition-all last-of-type:mb-0 hover:bg-primaryHover hover:text-white'
      href={`/${path}/${chapter}`}
      onClick={() => setIsVisible(false)}
    >
      Глава {chapter}
    </a>
  )
}

export default ChapterItem
