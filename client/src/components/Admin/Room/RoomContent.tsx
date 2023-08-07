import { FC, useEffect } from 'react'
import RoomContentList from './RoomContentList'
import AddRoomContent from './AddRoomContent'

interface IRoomContent {
	type: string
	title: string
}

const RoomContent: FC<IRoomContent> = ({ type, title }) => {
	useEffect(() => {
		// TODO: fetch data based on type
		console.log(`type - ${type}`)
	})

	return (
		<div className='flex flex-col w-[23.3125rem] mr-[3.88rem]'>
			<h3 className='text-xl text-[#FFF] font-secondary font-bold w-full h-[2.9375rem] flex justify-center items-center text-center bg-tertiary'>
				{title}
			</h3>
			<RoomContentList />
			<AddRoomContent />
		</div>
	)
}

export default RoomContent
