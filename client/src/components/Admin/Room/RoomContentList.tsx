import { FC } from 'react'
import RoomContentItem from './RoomContentItem'
import { Scrollbar } from 'react-scrollbars-custom'
import { useRoomContents } from '@/api/useRoomContents'

interface IRoomContentList {
	type: string
}

const RoomContentList: FC<IRoomContentList> = ({ type }) => {
	const { data: items, isLoading, error } = useRoomContents(type)

	return isLoading ? (
		<div className='h-[28.8125rem] flex justify-center items-center'>
			<p>Загрузка...</p>
		</div>
	) : error ? (
		<div className='h-[28.8125rem] flex justify-center items-center'>
			<p>Произошла ошибка</p>
		</div>
	) : items && items.length ? (
		<Scrollbar noDefaultStyles className='bg-secondary' style={{ height: '28.8125rem', minHeight: '28.8125rem' }}>
			<div className='py-[1.2rem]'>
				{items.map(item => (
					<RoomContentItem
						key={item.id}
						id={item.id}
						cost={item.cost}
						img={item.img}
						type={type}
					/>
				))}
			</div>
		</Scrollbar>
	) : (
		<div className='h-[28.8125rem] flex justify-center items-center'>
			<p>Контента нет 0_0</p>
		</div>
	)
}

export default RoomContentList
