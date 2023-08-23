import { FC, useState } from 'react'
import lockImg from '@/assets/room/lock.png'
import { Scrollbar } from 'react-scrollbars-custom'

interface ISelectColor {
	type: string
	title: string
	className?: string
}

const SelectColor: FC<ISelectColor> = ({ type, title, className }) => {
	const [selectedColor, setSelectedColor] = useState<string>('#C34375')
	const allColors = [
		{ hex: '#C34375' },
		{ hex: '#C34343' },
		{ hex: '#C37143' },
		{ hex: '#4367C3' },
		{ hex: '#C343B6' },
		{ hex: '#717171' },
		{ hex: '#4A9648' },
		{ hex: '#BE9C25' },
		{ hex: '#34A3AA' },
		{ hex: '#A80000' },
		{ hex: '#00A880' },
		{ hex: '#A4114A' },
	]
	const availableColors = [
		{ hex: '#C34375' },
		{ hex: '#4367C3' },
		{ hex: '#A80000' },
	]

	const checkColor = (color: { hex: string }) => {
		return availableColors.some(obj => obj.hex === color.hex)
	}

	const chooseColor = (color: { hex: string }) => {
		if (checkColor(color)) {
			setSelectedColor(color.hex)
		}
	}

	return (
		<div
			className={`w-full bg-room-gradient h-[6.625rem] rounded-[1.5625rem] py-[0.56rem] px-[0.56rem] select-color flex ${className}`}
		>
			<div className='bg-tertiary w-[10.1875rem] h-full rounded-[1.0625rem] flex justify-center items-center mr-[1.44rem]'>
				<p
					className={
						(type === 'account' ? 'w-[60%]' : 'w-full') +
						' text-primaryText text-[0.9375rem] leading-[97.795%] text-center'
					}
				>
					{title}
				</p>
			</div>
			<Scrollbar noDefaultStyles className='flex-1 flex items-center'>
				<div className='flex items-center'>
					{allColors.map(color => (
						<div
							key={color.hex}
							onClick={() => chooseColor(color)}
							style={{ backgroundColor: color.hex }}
							className={
								(selectedColor === color.hex
									? 'border-2 border-[#F8FEFA] '
									: '') +
								(checkColor(color)
									? 'cursor-pointer '
									: 'cursor-not-allowed ') +
								`box-content h-[3.25rem] min-w-[3.6875rem] max-w-[3.6875rem] rounded-[1.125rem] mr-[0.56rem] last-of-type:mr-0 flex justify-center items-center`
							}
						>
							{!checkColor(color) && (
								<img className='w-[2.4375rem]' src={lockImg} alt='lock-icon' />
							)}
						</div>
					))}
				</div>
			</Scrollbar>
		</div>
	)
}

export default SelectColor
