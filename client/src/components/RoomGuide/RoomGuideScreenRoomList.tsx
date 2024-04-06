import { useRoomsByLevel } from '@/api/useRoomsByLevel'
import { FC, useEffect, useState } from 'react'
import RoomGuideScreenRoomItem from './RoomGuideScreenRoomItem'
import { Scrollbar } from 'react-scrollbars-custom'
import { IRoomGuideByLevel } from '@/types/room-guide.interface'
import { useInView } from 'react-intersection-observer'

const RoomGuideScreenRoomList: FC = () => {
	const [rooms, setRooms] = useState<IRoomGuideByLevel[]>([])
	const [limit, _] = useState<number>(10)
	const [page, setPage] = useState<number>(1)
	const [totalPages, setTotalPages] = useState<number | null>(null)
	const { ref, inView } = useInView({
		threshold: .2,
	})

	const {
		data: roomsData,
		isLoading,
		isError,
		isSuccess,
		isFetched,
	} = useRoomsByLevel(limit, page)

	useEffect(() => {
		if (isSuccess) {
			setRooms([...rooms, ...roomsData.rooms])
			setTotalPages(roomsData.totalPages)
		}
	}, [isSuccess])

	useEffect(() => {
		if (isLoading) return

		if (inView && totalPages && page < totalPages) {
			setPage(page + 1)
		}
	}, [inView, isLoading])

	return (
		<Scrollbar className='w-full h-full relative flex flex-col' noDefaultStyles>
			<div className='w-full h-full pr-[5.5rem] my-[1.9375rem] flex flex-col items-center relative'>
				{rooms.map((room, index) => (
					<RoomGuideScreenRoomItem
						key={room.id}
						index={index + 1}
						room={room}
					/>
				))}
				<span
					ref={ref}
					className={
						'w-full h-[14.75rem] absolute bottom-0 ' +
						(isFetched ? 'block' : 'hidden')
					}
				/>
			</div>
			{isLoading ? (
				<div
					className={
						'w-full flex justify-center items-center ' +
						(!rooms.length ? 'absolute top-[50%]' : 'my-8')
					}
				>
					<p className='text-xl text-primaryText'>Загрузка...</p>
				</div>
			) : isError ? (
				<div
					className={
						'w-full flex justify-center items-center ' +
						(!rooms.length ? 'absolute top-[50%]' : 'my-8')
					}
				>
					<p className='text-xl text-primaryText'>Произошла ошибка</p>
				</div>
			) : (
				<></>
			)}
		</Scrollbar>
	)
}

export default RoomGuideScreenRoomList
