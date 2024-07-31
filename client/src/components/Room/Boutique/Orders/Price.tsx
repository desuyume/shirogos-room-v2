import { RoomAppearanceContext } from '@/Context'
import { colorVariants, colorVariantsHover } from '@/consts/roomColors'
import { FC, useContext } from 'react'

interface IPrice {
	clickBuy: () => void
	finalPrice: number
	isDisabled: boolean
}

const Price: FC<IPrice> = ({ clickBuy, finalPrice, isDisabled }) => {
	const roomAppearance = useContext(RoomAppearanceContext)

	return (
		<div className='w-[78.9%] h-[3.875rem] flex'>
			<div className='w-[24.16%] h-full flex justify-center items-center bg-tertiary rounded-bl-[1.5625rem]'>
				<p className='text-center text-primaryText text-xl'>К оплате:</p>
			</div>
			<div className='flex-1 bg-secondary h-full flex justify-center items-center'>
				<p className='text-[#EBE984] text-[1.0625rem] text-center'>
					{finalPrice} ДО
				</p>
			</div>
			<button
				disabled={isDisabled}
				onClick={clickBuy}
				className={`w-[22.3%] h-full ${
					colorVariants.bg[roomAppearance.active_room_color]
				} ${
					colorVariantsHover.bg[roomAppearance.active_room_color]
				} transition-all text-primaryText hover:text-white hover:disabled:text-primaryText text-[1.0625rem] rounded-br-[1.5625rem] disabled:bg-tertiary`}
			>
				Купить
			</button>
		</div>
	)
}

export default Price
