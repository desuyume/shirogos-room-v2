import { FC, useState } from 'react'
import ChroniclesContent from './ChroniclesContent'
import { cn } from '@/utils/cn'

const Chronicles: FC = () => {
	const [isChroniclesActive, setIsChroniclesActive] = useState<boolean>(false)

	return (
		<div className='flex flex-col items-end absolute top-[15rem] right-0'>
			<button
				onClick={() => setIsChroniclesActive(!isChroniclesActive)}
				className={cn(
					'bg-primary text-left text-[0.625rem] text-primaryText font-pressStart rounded-[3.5rem] h-[1.75rem] translate-x-[1.875rem] hover:bg-primaryHover hover:w-[15.875rem] hover:translate-x-[1.875rem] hover:pl-[5rem] transition-all z-10',
					{
						'w-[15.875rem] pl-[5rem]': isChroniclesActive,
						'w-[11.9375rem] pl-[3.25rem]': !isChroniclesActive,
					}
				)}
			>
				Хроники
			</button>
			<ChroniclesContent isActive={isChroniclesActive} />
		</div>
	)
}

export default Chronicles
