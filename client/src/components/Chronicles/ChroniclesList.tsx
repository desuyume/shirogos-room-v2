import { FC } from 'react'
import chronicsImg from '@/assets/chronics-test.png'
import ChroniclesItem from './ChroniclesItem'
import { Scrollbar } from 'react-scrollbars-custom'
import '@/styles/custom-scroll.scss'

const ChroniclesList: FC = () => {
	const chronics = [
		{ date: 'Октябрь 2018', day: '1', text: 'ДР Канала 1', img: [] },
		{ date: 'Октябрь 2018', day: '-12', text: 'Турнир Фракций 1', img: [] },
		{ date: 'Октябрь 2018', day: '21', text: '', img: [chronicsImg] },
		{ date: 'Октябрь 2018', day: '24', text: 'Кулинарный Стрим 2', img: [] },
		{
			date: 'Октябрь 2018',
			day: '24',
			text: 'ДР Канала 1',
			img: [chronicsImg],
		},
		{
			date: 'Октябрь 2018',
			day: '24',
			text: 'Аврорус: Легендарная Лотерея #3',
			img: [],
		},
		{
			date: 'Октябрь 2018',
			day: '24',
			text: 'Пиксель Баттл: Во Славу Широго!',
			img: [],
		},
		{
			date: 'Октябрь 2018',
			day: '24',
			text: '',
			img: [chronicsImg, chronicsImg, chronicsImg, chronicsImg],
		},
	]
	return (
		<Scrollbar noDefaultStyles style={{ height: 184 }}>
			{chronics.map(chronic => (
				<ChroniclesItem
					key={chronic.date + chronic.day + chronic.text}
					date={chronic.date}
					day={chronic.day}
					text={chronic.text}
					imgs={chronic.img}
				/>
			))}
		</Scrollbar>
	)
}

export default ChroniclesList
