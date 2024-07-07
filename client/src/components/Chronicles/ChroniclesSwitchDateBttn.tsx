import { cn } from '@/utils/cn'
import { FC } from 'react'

interface ChroniclesSwitchDateBttnProps {
	skip: number
	count: number
	onClick?: () => void
	type: 'next' | 'prev'
}

const ChroniclesSwitchDateBttn: FC<ChroniclesSwitchDateBttnProps> = ({
	skip,
	count,
	onClick,
	type,
}) => {
	return (
		<button
			disabled={type === 'next' ? skip === count - 1 : skip === 0}
			onClick={onClick}
			className={cn(
				'bg-primary w-[0.5625rem] h-[1.4375rem] hover:bg-primaryHover absolute hover:w-[0.8125rem] disabled:hover:bg-primary disabled:hover:bg-opacity-80 disabled:bg-opacity-80 disabled:hover:w-[0.5625rem] transition-all',
				{
					'right-[0.1875rem]': type === 'next',
					'left-[0.1875rem]': type === 'prev',
				}
			)}
		/>
	)
}

export default ChroniclesSwitchDateBttn
