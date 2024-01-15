import { FC, useState } from 'react'
import ChroniclesContent from './ChroniclesContent'

const Chronicles: FC = () => {
	const [isChroniclesActive, setIsChroniclesActive] = useState<boolean>(false)

	return (
		<div className='flex flex-col items-end absolute top-[18rem] right-0'>
			<button
				onClick={() => setIsChroniclesActive(!isChroniclesActive)}
				className={
					(isChroniclesActive
						? 'w-[18.125rem] translate-x-[2.5rem] pl-[4.56rem]'
						: 'w-[11.9375rem] translate-x-[1.69rem] pl-[3.06rem]') +
					' bg-primary text-left rounded-[3.5rem] h-[1.75rem] text-primaryText text-base hover:bg-primaryHover hover:w-[18.125rem] hover:translate-x-[2.5rem] hover:pl-[4.56rem] transition-all z-10'
				}
			>
				Хроники
			</button>
			<ChroniclesContent isActive={isChroniclesActive} />
		</div>
	)
}

export default Chronicles
