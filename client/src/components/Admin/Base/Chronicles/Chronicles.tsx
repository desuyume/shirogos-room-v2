import { FC, useState } from 'react'
import ChroniclesList from './ChroniclesList'
import AddChronicle from './AddChronicle'
import ChronicleEventsList from './ChronicleEventsList'
import AddChronicleEvent from './AddChronicleEvent'

const Chronicles: FC = () => {
	const [isAddChronicleVisible, setIsAddChronicleVisible] = useState(false)
	const [selectedChronicle, setSelectedChronicle] = useState<number | null>(
		null
	)

	return (
		<div className='w-[49.26%] h-[26.0625rem] flex justify-between'>
			<div className='w-[49.85%] h-full chronicles-dates-admin'>
				<div className='w-full h-[3.375rem] bg-tertiary flex justify-center items-center'>
					<p className='text-[#FFF] text-[1.875rem]'>Хроники</p>
				</div>
				<ChroniclesList
					selectedChronicle={selectedChronicle}
					setSelectedChronicle={setSelectedChronicle}
				/>
				<AddChronicle />
			</div>
			<div className='w-[49.85%] h-full chronicles-admin'>
				<div className='w-full h-[3.375rem] bg-tertiary' />
				<ChronicleEventsList chronicleId={selectedChronicle} />
				<button
					onClick={() => setIsAddChronicleVisible(true)}
					disabled={!selectedChronicle}
					className='w-full h-[2.0625rem] bg-primary transition-all enabled:hover:bg-primaryHover disabled:opacity-50 text-[#FFF] text-[0.9375rem]'
				>
					Добавить Дату
				</button>
				<AddChronicleEvent
					chronicleId={selectedChronicle}
					visible={isAddChronicleVisible}
					setVisible={setIsAddChronicleVisible}
				/>
			</div>
		</div>
	)
}

export default Chronicles
