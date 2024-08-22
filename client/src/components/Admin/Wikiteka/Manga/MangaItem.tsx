import { FC } from 'react'
import editIcon from '@/assets/admin/edit.png'
import removeIcon from '@/assets/admin/remove.png'
import { IManga } from '@/types/manga.interface'

interface IMangaItem {
  manga: IManga
  setSelectedManga: React.Dispatch<React.SetStateAction<IManga | null>>
  setIsRemoveModalVisible: React.Dispatch<React.SetStateAction<boolean>>
  setIsEditorVisible: React.Dispatch<React.SetStateAction<boolean>>
  setIsEditManga: React.Dispatch<React.SetStateAction<boolean>>
}

const MangaItem: FC<IMangaItem> = ({
  manga,
  setSelectedManga,
  setIsEditorVisible,
  setIsRemoveModalVisible,
  setIsEditManga
}) => {
  const clickEdit = () => {
    setSelectedManga(manga)
    setIsEditorVisible(true)
    setIsEditManga(true)
  }

  const clickRemove = () => {
    setSelectedManga(manga)
    setIsRemoveModalVisible(true)
  }

  return (
    <div key={manga.id} className='flex h-[3.125rem] w-full items-center'>
      <div className='flex h-full w-[86.9%]'>
        <div className='mr-2 flex h-full w-[67%] items-center justify-center bg-secondary'>
          <p className='px-2 text-center text-xl leading-none text-[#FFF]'>{manga.title}</p>
        </div>
        <div className='flex h-full flex-1 items-center justify-center bg-secondary'>
          <p className='px-2 text-xl text-[#FFF]'>{manga.chapter}</p>
        </div>
      </div>

      <div className='flex h-full flex-1 items-center justify-center'>
        <button
          onClick={clickEdit}
          className='mr-2 flex aspect-square w-[30%] items-center justify-center bg-primary transition-all hover:bg-primaryHover'
        >
          <img className='w-[75%]' src={editIcon} alt='edit-icon' />
        </button>
        <button
          onClick={clickRemove}
          className='flex aspect-square w-[30%] items-center justify-center bg-tertiary transition-all hover:bg-opacity-80'
        >
          <img className='w-[75%]' src={removeIcon} alt='remove-icon' />
        </button>
      </div>
    </div>
  )
}

export default MangaItem
