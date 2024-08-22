import { IManga, IMangaGeneral } from '@/types/manga.interface'
import { FC } from 'react'

interface IMangaAddChapter {
  isVisible: boolean
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
  setIsEditorVisible: React.Dispatch<React.SetStateAction<boolean>>
  allMangas: IManga[]
  uniqueMangas: IMangaGeneral[]
  selectedManga: IManga | null
  setSelectedManga: React.Dispatch<React.SetStateAction<IManga | null>>
  setIsCreateChapter: React.Dispatch<React.SetStateAction<boolean>>
}

const MangaAddChapter: FC<IMangaAddChapter> = ({
  isVisible,
  setIsVisible,
  setIsEditorVisible,
  allMangas,
  uniqueMangas,
  selectedManga,
  setSelectedManga,
  setIsCreateChapter
}) => {
  const select = () => {
    if (!selectedManga) return
    setIsVisible(false)
    setIsCreateChapter(true)
    setIsEditorVisible(true)
  }

  const cancel = () => {
    setSelectedManga(null)
    setIsVisible(false)
    setIsCreateChapter(false)
  }

  const setManga = (chosenManga: IMangaGeneral) => {
    const manga = allMangas.find((manga) => manga.id === chosenManga.id)

    if (manga) {
      const result: IManga = {
        ...manga,
        chapter: chosenManga.lastChapter
      }
      setSelectedManga(result)
    }
  }

  return (
    <div
      onClick={cancel}
      className={
        (isVisible ? 'visible opacity-100 ' : 'invisible opacity-0 ') +
        `fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-black bg-opacity-60 transition-all`
      }
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className='w-[30rem] items-center rounded-[37px] bg-secondary pt-4 text-center'
      >
        <h2 className='border-b-2 border-primary pb-4 text-3xl text-[#FFF]'>Манги</h2>
        <div className='flex max-h-[18rem] min-h-[18rem] flex-col items-center overflow-y-auto'>
          {uniqueMangas.map((manga) => (
            <button
              key={manga.id}
              className={
                (selectedManga?.id === manga.id ? 'bg-tertiary ' : '') +
                'w-full py-2 text-primaryText transition-all hover:bg-tertiary'
              }
              onClick={() => setManga(manga)}
            >
              {manga.title}
            </button>
          ))}
        </div>

        <div className='flex h-10 w-full items-center'>
          <button
            onClick={select}
            className='h-full w-full rounded-b-[37px] bg-primary text-xl text-[#FFF] transition-all hover:bg-primaryHover'
          >
            Выбрать
          </button>
        </div>
      </div>
    </div>
  )
}

export default MangaAddChapter
