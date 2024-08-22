import { FC } from 'react'
import MangaItem from './MangaItem'
import { Scrollbar } from 'react-scrollbars-custom'
import { IManga } from '@/types/manga.interface'

interface IMangaList {
  mangas: IManga[]
  setSelectedManga: React.Dispatch<React.SetStateAction<IManga | null>>
  setIsRemoveModalVisible: React.Dispatch<React.SetStateAction<boolean>>
  setIsEditorVisible: React.Dispatch<React.SetStateAction<boolean>>
  setIsEditManga: React.Dispatch<React.SetStateAction<boolean>>
}

const MangaList: FC<IMangaList> = ({
  mangas,
  setSelectedManga,
  setIsEditorVisible,
  setIsRemoveModalVisible,
  setIsEditManga
}) => {
  return (
    <div className='mb-[0.69rem] flex h-[52.6875rem] w-full flex-col'>
      <div className='flex h-[3.375rem] w-[86.9%]'>
        <div className='mr-2 flex h-full w-[67%] items-center justify-center bg-tertiary'>
          <p className='text-[1.5625rem] text-[#FFF]'>Манга</p>
        </div>
        <div className='flex h-full flex-1 items-center justify-center bg-tertiary'>
          <p className='text-[1.5625rem] text-[#FFF]'>Глава</p>
        </div>
      </div>

      <Scrollbar noDefaultStyles style={{ width: '100%', height: '100%' }}>
        {mangas.map((manga) => (
          <MangaItem
            key={manga.id + manga.chapter}
            manga={manga}
            setIsEditorVisible={setIsEditorVisible}
            setSelectedManga={setSelectedManga}
            setIsRemoveModalVisible={setIsRemoveModalVisible}
            setIsEditManga={setIsEditManga}
          />
        ))}
      </Scrollbar>
    </div>
  )
}

export default MangaList
