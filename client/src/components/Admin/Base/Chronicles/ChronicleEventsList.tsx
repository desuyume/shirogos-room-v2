import { FC } from 'react'
import ChronicleEventsItem from './ChronicleEventsItem'
import { Scrollbar } from 'react-scrollbars-custom'
import { useChronicleEvents } from '@/api/useChronicleEvents'

interface IChronicleEventsList {
	chronicleId: number | null
}

const ChronicleEventsList: FC<IChronicleEventsList> = ({ chronicleId }) => {
	const {
		isLoading,
		isError,
		data: chronicles,
	} = useChronicleEvents(chronicleId)

	if (!chronicleId) {
		return (
			<div className='w-full h-[20.64rem] bg-secondary flex justify-center items-center'>
				<p className='text-primaryText text-xl text-center'>Дата не выбрана</p>
			</div>
		)
	}

	return (
		<Scrollbar
			noDefaultStyles
			className='bg-secondary'
			style={{ height: '20.64rem', minHeight: '20.64rem' }}
		>
			{isLoading ? (
				<div className='w-full h-[20.64rem] bg-secondary flex justify-center items-center'>
					<p className='text-primaryText text-xl text-center'>Загрузка...</p>
				</div>
			) : isError ? (
				<div className='w-full h-[20.64rem] bg-secondary flex justify-center items-center'>
					<p className='text-primaryText text-xl text-center'>Ошибка</p>
				</div>
			) : !chronicles.events || !chronicles.events.length ? (
				<div className='w-full h-[20.64rem] bg-secondary flex justify-center items-center'>
					<p className='text-primaryText text-xl text-center'>Нет событий</p>
				</div>
			) : (
				<div className='w-full bg-secondary py-[0.7rem]'>
					{chronicles.events.map(event => (
						<ChronicleEventsItem
							key={event.id}
							id={event.id}
							chronicleId={chronicleId}
							day={event.day}
							text={event.text}
							img={event.img}
						/>
					))}
				</div>
			)}
		</Scrollbar>
	)
}

export default ChronicleEventsList
