import { FC } from 'react'

interface IAlmanacSwitchBttn {
	onClick: () => void
	date: number
	month: string
}

const AlmanacSwitchBttn: FC<IAlmanacSwitchBttn> = ({
	onClick,
	date,
	month,
}) => {
	return (
		<button
			className='text-[#DEDEDE] bg-secondary h-full min-w-[50px] rounded-[24px] hover:bg-secondaryHover hover:text-[#FFF] transition-colors'
			onClick={onClick}
		>
			<p className='text-3xl leading-none'>{date}</p>
			<p className='text-[0.9375rem]'>{month}</p>
		</button>
	)
}

export default AlmanacSwitchBttn
