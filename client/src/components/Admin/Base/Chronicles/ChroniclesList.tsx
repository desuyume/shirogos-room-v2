import { FC } from 'react'
import ChroniclesItem from './ChroniclesItem'
import chronicsImg from '@/assets/chronics-test.png'
import { Scrollbar } from 'react-scrollbars-custom'

const ChroniclesList: FC = () => {
	const items = [
		{ id: 1, day: '01', text: 'ДР Канала 1', img: null },
		{ id: 2, day: '-12', text: 'Турнир Фракций 1', img: null },
		{ id: 3, day: '21', text: '', img: chronicsImg },
		{ id: 4, day: '24', text: 'Кулинарный Стрим 2', img: null },
		{ id: 5, day: '27', text: 'Аврорус: Легендарная Лотерея #3', img: null },
	]

	return (
		<Scrollbar
			noDefaultStyles
			className='bg-secondary'
			style={{ height: '20.64rem', minHeight: '20.64rem' }}
		>
			<div className='w-full bg-secondary py-[0.7rem]'>
				{items.map(item => (
					<ChroniclesItem
						key={item.id}
						day={item.day}
						text={item.text}
						img={item.img}
					/>
				))}
			</div>
		</Scrollbar>
	)
}

export default ChroniclesList
