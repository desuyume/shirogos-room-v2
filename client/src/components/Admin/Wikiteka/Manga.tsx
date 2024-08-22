import { FC, useEffect, useState } from 'react'
import MangaList from './Manga/MangaList'
import MangaEditor from './Manga/MangaEditor'
import { useMangasWithChapters } from '@/api/useMangasWithChapters'
import MangaAddChapter from './Manga/MangaAddChapter'
import { IManga } from '@/types/manga.interface'
import { useDeleteManga } from '@/api/useDeleteManga'
import RemoveConfirmModal from '@/components/RemoveConfirmModal'
import { useAllMangas } from '@/api/useAllMangas'

const Manga: FC = () => {
  const [isEditorVisible, setIsEditorVisible] = useState<boolean>(false)
  const [selectedManga, setSelectedManga] = useState<IManga | null>(null)
  const [isAddChapterVisible, setIsAddChapterVisible] = useState<boolean>(false)
  const [isCreateChapter, setIsCreateChapter] = useState<boolean>(false)
  const [isEditManga, setIsEditManga] = useState<boolean>(false)
  const [isRemoveModalVisible, setIsRemoveModalVisible] = useState<boolean>(false)

  const { data: mangas, isLoading, isError } = useMangasWithChapters()
  const {
    data: uniqueMangas,
    isLoading: isUniqueMangasLoading,
    isError: isUniqueMangasError
  } = useAllMangas()
  const { mutate: deleteMutate } = useDeleteManga(selectedManga?.chapterId ?? null)

  const removeManga = () => {
    deleteMutate()
  }

  useEffect(() => {
    if (!isEditorVisible) {
      setSelectedManga(null)
      setIsCreateChapter(false)
      setIsEditManga(false)
    }
  }, [isEditorVisible])

  return (
    <div className='w-[35%]'>
      {isLoading || isUniqueMangasLoading ? (
        <div className='flex h-full w-full items-center justify-center'>
          <p>Загрузка...</p>
        </div>
      ) : isError || isUniqueMangasError ? (
        <div className='flex h-full w-full items-center justify-center'>
          <p>Ошибка</p>
        </div>
      ) : (
        <>
          <MangaList
            mangas={mangas}
            setSelectedManga={setSelectedManga}
            setIsRemoveModalVisible={setIsRemoveModalVisible}
            setIsEditorVisible={setIsEditorVisible}
            setIsEditManga={setIsEditManga}
          />
          <div className='flex h-8 w-[86.9%]'>
            <button
              onClick={() => {
                setSelectedManga(null)
                setIsCreateChapter(false)
                setIsEditorVisible(true)
              }}
              className='mr-2 h-full w-[67%] bg-primary px-2 text-[0.9375rem] leading-none text-[#FFF] hover:bg-primaryHover'
            >
              Добавить мангу
            </button>
            <button
              onClick={() => setIsAddChapterVisible(true)}
              className='h-full flex-1 bg-primary px-2 text-[0.9375rem] leading-none text-[#FFF] hover:bg-primaryHover'
            >
              Добавить главу
            </button>
          </div>

          <MangaEditor
            isVisible={isEditorVisible}
            setIsVisible={setIsEditorVisible}
            selectedManga={selectedManga}
            isCreateChapter={isCreateChapter}
            isEditManga={isEditManga}
          />
          <MangaAddChapter
            isVisible={isAddChapterVisible}
            setIsVisible={setIsAddChapterVisible}
            setIsEditorVisible={setIsEditorVisible}
            allMangas={mangas}
            uniqueMangas={uniqueMangas}
            selectedManga={selectedManga}
            setSelectedManga={setSelectedManga}
            setIsCreateChapter={setIsCreateChapter}
          />
          <RemoveConfirmModal
            isVisible={isRemoveModalVisible}
            setIsVisible={setIsRemoveModalVisible}
            elementText={`Манга - ${selectedManga?.title} - ${selectedManga?.chapter} глава`}
            removeFn={removeManga}
          />
        </>
      )}
    </div>
  )
}

export default Manga
