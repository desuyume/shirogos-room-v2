import { useRandomRooms } from '@/api/useRandomRooms'
import { FC } from 'react'
import RoomGuidePreviewRoomItem from './RoomGuidePreviewRoomItem'
import { useInView } from 'react-intersection-observer'

const RoomGuidePreviewRoomList: FC = () => {
	const { data: rooms, isLoading, isError } = useRandomRooms()
	const { ref, inView } = useInView({
		threshold: 0.25,
		triggerOnce: true,
	})

	return isLoading ? (
		<div className='flex-1 h-full flex justify-center items-center bg-secondary bg-opacity-90 rounded-tl-[2.3125rem] rounded-bl-[2.3125rem]'>
			<p className='text-primaryText'>Загрузка...</p>
		</div>
	) : isError ? (
		<div className='flex-1 h-full flex justify-center items-center bg-secondary bg-opacity-90 rounded-tl-[2.3125rem] rounded-bl-[2.3125rem]'>
			<p className='text-primaryText'>Произошла ошибка</p>
		</div>
	) : (
		<div
			ref={ref}
			className={
				'flex-1 h-full flex room-guide-preview-list relative ' +
				(inView ? 'inView' : '')
			}
		>
			<div className='w-[2.4375rem] h-full bg-secondary bg-opacity-90 rounded-l-[2.3125rem]'>
				<div className='w-full h-full bg-tertiary bg-opacity-40 rounded-l-[2.3125rem]' />
			</div>

			<div className='flex-1 h-full flex flex-col justify-between'>
				<div className='w-full h-[12.5rem] bg-secondary bg-opacity-90 z-10'>
					<div className='w-full h-full bg-tertiary bg-opacity-40 pl-[0.5rem] pr-[2.5625rem] flex items-center'>
						{rooms[0] && <RoomGuidePreviewRoomItem room={rooms[0]} order={1} />}
						{rooms[2] && <RoomGuidePreviewRoomItem room={rooms[2]} order={3} />}
						{rooms[4] && <RoomGuidePreviewRoomItem room={rooms[4]} order={5} />}
						{rooms[6] && <RoomGuidePreviewRoomItem room={rooms[6]} order={7} />}
					</div>
				</div>

				<div className='w-full h-[12.5rem] bg-secondary bg-opacity-90 z-10'>
					<div className='w-full h-full bg-tertiary bg-opacity-40 pl-[0.5rem] pr-[2.5625rem] flex items-center'>
						{rooms[1] && <RoomGuidePreviewRoomItem room={rooms[1]} order={2} />}
						{rooms[3] && <RoomGuidePreviewRoomItem room={rooms[3]} order={4} />}
						{rooms[5] && <RoomGuidePreviewRoomItem room={rooms[5]} order={6} />}
						{rooms[7] && <RoomGuidePreviewRoomItem room={rooms[7]} order={8} />}
					</div>
				</div>
			</div>
		</div>
	)
}

export default RoomGuidePreviewRoomList
