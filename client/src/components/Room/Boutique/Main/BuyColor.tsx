import { roomColors } from '@/consts/roomColors'
import { FC, useState } from 'react'
import lockImg from '@/assets/room/lock.png'

interface IBuyColor { 
	type: string
}

const BuyColor: FC<IBuyColor> = ({ type }) => {
	const [cost, setCost] = useState<number>(0)
	const [selectedColor, setSelectedColor] = useState<string | null>(null)
	const availableColors = [
		{ hex: '#C34375' },
		{ hex: '#4367C3' },
		{ hex: '#A80000' },
	]

	const checkColor = (color: { hex: string; cost: number }) => {
		return availableColors.some(obj => obj.hex === color.hex)
	}

	const chooseColor = (color: { hex: string; cost: number }) => {
		if (!checkColor(color)) {
			setCost(color.cost)
		} else {
			setCost(0)
		}
		setSelectedColor(color.hex)
	}

	return (
		<div className='w-[48.7%] h-[21.5625rem] bg-room-gradient rounded-[1.5625rem] pt-[0.68rem] flex flex-col justify-between items-center'>
			<div className='bg-tertiary flex justify-center items-center min-w-[52%] max-w-[52%] min-h-[5.6rem] max-h-[5.6rem] rounded-[1.5625rem]'>
				<p className='text-primaryText text-xl text-center leading-[97.795%] px-1'>
					{type === 'account' ? 'Цветовая тема аккаунта' : 'Цвет никнейма'}
				</p>
			</div>
			<div className='laptop:h-[40%] min-desktop:h-[44%] medium-desktop:h-[52%] fullhd:h-[57.5%] 2k:h-[30%] flex justify-center items-center flex-wrap gap-[3%]'>
				{roomColors.map(color => (
					<div
						key={color.hex}
						style={{ backgroundColor: color.hex }}
						className={
							(selectedColor === color.hex
								? 'border-2 border-[#F8FEFA] scale-[107%] transition-transform '
								: '') +
							'min-h-[30%] max-h-[30%] 2k:min-h-[40%] 2k:max-h-[40%] rounded-[1.125rem] aspect-square flex justify-center items-center cursor-pointer'
						}
						onClick={() => chooseColor(color)}
					>
						{!checkColor(color) && (
							<img className='w-[66%]' src={lockImg} alt='lock-icon' />
						)}
					</div>
				))}
			</div>
			<div className='w-full min-h-[2.6875rem] flex'>
				<div className='w-[31%] h-full bg-tertiary flex justify-center items-center rounded-bl-[1.2rem]'>
					<p className='text-primaryText text-[0.8125rem] text-center leading-[97.795%]'>
						К оплате:
					</p>
				</div>
				<div className='w-[43.5%] h-full bg-secondary flex justify-center items-center'>
					<p className='text-[#EBE984] text-[0.9375rem] leading-[97.795%] text-center'>
						{cost} ДО
					</p>
				</div>
				<button disabled={cost <= 0} className='h-full flex-1 bg-primary hover:bg-primaryHover transition-all flex justify-center items-center text-primaryText text-xs disabled:bg-tertiary rounded-br-[1.2rem]'>
					Купить
				</button>
			</div>
		</div>
	)
}

export default BuyColor
