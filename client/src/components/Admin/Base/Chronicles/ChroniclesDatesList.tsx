import { FC, useState } from 'react'
import { Scrollbar } from 'react-scrollbars-custom'

interface IChroniclesDatesList {
	selectedDate: string | null
	setSelectedDate: React.Dispatch<React.SetStateAction<string | null>>
}

const ChroniclesDatesList: FC<IChroniclesDatesList> = ({
	selectedDate,
	setSelectedDate,
}) => {
	const [dates, _] = useState<any[]>([
		{ id: 1, date: 'Сентябрь 2018' },
		{ id: 2, date: 'Октябрь 2018' },
		{ id: 3, date: 'Ноябрь 2018' },
		{ id: 4, date: 'Декабрь 2018' },
		{ id: 5, date: 'Январь 2019' },
		{ id: 6, date: 'Февраль 2019' },
		{ id: 7, date: 'Март 2019' },
		{ id: 8, date: 'Апрель 2019' },
	])

	return (
		<Scrollbar
			noDefaultStyles
			className='bg-secondary'
			style={{ height: '19.31rem', minHeight: '19.31rem' }}
		>
			<div className='w-full bg-secondary'>
				{dates.map(date => (
					<button
						key={date.id}
						onClick={() => setSelectedDate(date.date)}
						className={
							(selectedDate === date.date
								? 'bg-primary '
								: 'hover:bg-primaryHover ') +
							'w-full h-[1.9375rem] transition-all text-center text-[#FFF] text-xl'
						}
					>
						{date.date}
					</button>
				))}
			</div>
		</Scrollbar>
	)
}

export default ChroniclesDatesList
