import { FC } from 'react'
import { useLocation } from 'react-router-dom'
import { useRoom } from '@/api/useRoom'
import { useRoomEditor } from '@/api/useRoomEditor'
import RoomMainContent from '../Main/RoomMainContent'

interface IRoomMain {
  isGuide?: boolean
}

const RoomMain: FC<IRoomMain> = ({ isGuide = false }) => {
  const location = useLocation()
  const isActive = location.pathname === '/room' || location.pathname === '/room/' || isGuide

  const { isLoading, isError, data: roomInfo } = useRoom(!isGuide)

  const {
    data: editorElements,
    isLoading: isEditorLoading,
    isError: isEditorError
  } = useRoomEditor(!isGuide)

  return (
    <div
      className={
        (isActive ? 'block' : 'hidden') + ' flex h-full w-full justify-between transition-all'
      }
    >
      {isLoading || isEditorLoading ? (
        <p className='w-full text-center text-xl'>Загрузка...</p>
      ) : isError || isEditorError ? (
        <p className='w-full text-center text-xl'>Не удалось получить данные</p>
      ) : (
        <RoomMainContent room={roomInfo} editor={editorElements} />
      )}
    </div>
  )
}

export default RoomMain
