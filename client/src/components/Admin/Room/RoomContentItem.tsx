import { useDeleteRoomContent } from '@/hooks/useDeleteRoomContent'
import { FC } from 'react'

interface IRoomContentItem {
	id: number
	cost: number
	img?: string
	type: string
}

const RoomContentItem: FC<IRoomContentItem> = ({ id, cost, img, type }) => {
	const { mutate } = useDeleteRoomContent(type)

	const handleDeleteRoomContent = () => {
		mutate(id)
	}

	return (
		<div className='flex justify-center items-center mb-[0.63rem] last-of-type:mb-0 relative'>
			<p className='font-secondary font-bold text-xl text-[#FFF] w-1/2 text-center pl-10'>
				{cost} ДО
			</p>
			<div className='w-1/2 flex justify-center'>
				{img ? (
					<img
						className='w-[7.25rem] h-[4.75rem]'
						src={`${import.meta.env.VITE_SERVER_URL}/${type}s/${img}`}
						alt='panopticon-img'
					/>
				) : (
					<div className='w-[7.25rem] h-[4.75rem] bg-[#D9D9D9]' />
				)}
			</div>
			<button onClick={handleDeleteRoomContent} className='absolute left-5 text-xl'>-</button>
		</div>
	)
}

export default RoomContentItem
