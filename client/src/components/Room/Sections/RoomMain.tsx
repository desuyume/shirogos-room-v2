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
	const isActive =
		location.pathname === '/room' || location.pathname === '/room/' || isGuide

	const { isLoading, isError, data: roomInfo } = useRoom(!isGuide)

	const {
		data: editorElements,
		isLoading: isEditorLoading,
		isError: isEditorError,
	} = useRoomEditor(!isGuide)

	return (
		<div
			className={
				(isActive ? 'block' : 'hidden') +
				' transition-all flex justify-between w-full h-full'
			}
		>
			{isLoading || isEditorLoading ? (
				<p className='text-xl text-center w-full'>Загрузка...</p>
			) : isError || isEditorError ? (
				<p className='text-xl text-center w-full'>Не удалось получить данные</p>
			) : (
				<RoomMainContent room={roomInfo} editor={editorElements} />
			)}
		</div>
	)
}

export default RoomMain
