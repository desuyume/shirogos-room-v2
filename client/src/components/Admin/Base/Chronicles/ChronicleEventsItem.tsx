import { useDeleteChronicleEvent } from '@/api/useDeleteChronicleEvent'
import { FC } from 'react'

interface IChronicleEventsItem {
	id: number
	chronicleId: number
	day: string
	text?: string
	img?: string
}

const ChronicleEventsItem: FC<IChronicleEventsItem> = ({
	id,
	chronicleId,
	day,
	text,
	img,
}) => {
	const { mutate } = useDeleteChronicleEvent(id, chronicleId)

	const clickDelete = () => {
		mutate()
	}

	return (
		<div className='w-full min-h-[2.875rem] flex items-center mb-[0.7rem] last-of-type:mb-0 relative'>
			<div className='w-[12%] h-full flex justify-center items-center'>
				<p className='text-[#FFF] text-[0.9375rem]'>{day}</p>
			</div>
			<div className='flex-1 h-full flex justify-center items-center px-2'>
				<p className='text-[#FFF] text-center text-[0.9375rem]'>{text}</p>
			</div>
			<div className='w-[2.875rem] h-[2.875rem] border-[1px] border-[#FFF] bg-primaryText bg-opacity-10'>
				{img && (
					<img
						src={`${import.meta.env.VITE_SERVER_URL}/${img}`}
						alt='chronicles-img'
						className='w-full h-full'
					/>
				)}
			</div>
			<button
				onClick={clickDelete}
				className='px-2 h-[2.875rem] text-[#FFF] hover:bg-primary transition-all'
			>
				-
			</button>
		</div>
	)
}

export default ChronicleEventsItem
