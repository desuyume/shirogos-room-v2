import { FC } from 'react'
import ChroniclesItem from './ChroniclesItem'
import { Scrollbar } from 'react-scrollbars-custom'
import { chronicleMonths } from '@/consts/months'
import { IChronicleWithEvents } from '@/types/chronicle.interface'

interface IChroniclesList {
	chronicle: IChronicleWithEvents | null
	isLoading: boolean
	isError: boolean
}

const ChroniclesList: FC<IChroniclesList> = ({
	chronicle,
	isError,
	isLoading,
}) => {
	return (
		<Scrollbar noDefaultStyles style={{ height: 169 }}>
			{isLoading ? (
				<div className='w-full h-[10.5625rem] flex justify-center items-center'>
					<p className='text-primaryText text-center'>Загрузка...</p>
				</div>
			) : isError ? (
				<div className='w-full h-[10.5625rem] flex justify-center items-center'>
					<p className='text-primaryText text-center'>Произошла ошибка</p>
				</div>
			) : (
				chronicle?.events.map(event => (
					<ChroniclesItem
						key={event.id}
						date={chronicleMonths[chronicle.month] + ' ' + event.day}
						day={event.day}
						prefix={event.prefix}
						text={event.text}
						img={event.img}
					/>
				))
			)}
		</Scrollbar>
	)
}

export default ChroniclesList
