import { useDeleteChronicle } from '@/api/useDeleteChronicle'
import { chronicleMonths } from '@/consts/months'
import { FC } from 'react'

interface IChroniclesItem {
	id: number
	month: number
	year: number
	selectedChronicle: number | null
	setSelectedChronicle: React.Dispatch<React.SetStateAction<number | null>>
}

const ChroniclesItem: FC<IChroniclesItem> = ({
	id,
	month,
	year,
	selectedChronicle,
	setSelectedChronicle,
}) => {
	const { mutate } = useDeleteChronicle(id)

	const clickDelete = () => {
		mutate()
	}

	return (
		<div className='w-full h-[1.9375rem] flex items-center z-10'>
			<button
				onClick={clickDelete}
				className='px-2 h-full transition-all text-center text-[#FFF] hover:bg-primary'
			>
				-
			</button>
			<button
				key={id}
				onClick={() => setSelectedChronicle(id)}
				className={
					(selectedChronicle === id
						? 'bg-primary '
						: 'hover:bg-primaryHover ') +
					'w-full h-full transition-all text-center text-[#FFF] text-xl'
				}
			>
				{chronicleMonths[month]} {year}
			</button>
		</div>
	)
}

export default ChroniclesItem
