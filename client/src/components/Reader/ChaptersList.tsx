import { FC } from 'react'
import ChapterItem from './ChapterItem'

interface IChaptersList {
  isVisible: boolean
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
  currentChapter?: number
  chaptersCount: number
  path: string
}

const ChaptersList: FC<IChaptersList> = ({
  isVisible,
  setIsVisible,
  currentChapter,
  chaptersCount,
  path
}) => {
  const list = []
  for (let i = 1; i <= chaptersCount; i++) {
    if (i === currentChapter) {
      continue
    }

    list.push(<ChapterItem key={i} chapter={i} path={path} setIsVisible={setIsVisible} />)
  }
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={
        (isVisible ? 'visible opacity-100' : 'invisible opacity-0') +
        ' absolute top-[7.8125rem] z-30 w-full cursor-default bg-primary transition-all'
      }
    >
      {list}
    </div>
  )
}

export default ChaptersList
