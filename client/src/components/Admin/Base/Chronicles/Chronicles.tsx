import { FC, useState } from 'react'
import ChroniclesDatesList from './ChroniclesDatesList'
import AddChroniclesDate from './AddChroniclesDate'
import ChroniclesList from './ChroniclesList'
import AddChronicle from './AddChronicle'

const Chronicles: FC = () => {
	const [isAddChronicleVisible, setIsAddChronicleVisible] = useState(false)
	const [selectedDate, setSelectedDate] = useState<string | null>(null)

	return (
		<div className='w-[49.26%] h-[26.0625rem] flex justify-between'>
			<div className='w-[49.85%] h-full chronicles-dates-admin'>
				<div className='w-full h-[3.375rem] bg-tertiary flex justify-center items-center'>
					<p className='text-[#FFF] text-[1.875rem]'>Хроники</p>
				</div>
				<ChroniclesDatesList selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
				<AddChroniclesDate />
			</div>
			<div className='w-[49.85%] h-full chronicles-admin'>
				<div className='w-full h-[3.375rem] bg-tertiary' />
				<ChroniclesList />
				<button
					onClick={() => setIsAddChronicleVisible(true)}
					className='w-full h-[2.0625rem] bg-primary hover:bg-primaryHover transition-all text-[#FFF] text-[0.9375rem]'
				>
					Добавить Дату
				</button>
				<AddChronicle
					visible={isAddChronicleVisible}
					setVisible={setIsAddChronicleVisible}
				/>
			</div>
		</div>
	)
}

export default Chronicles
