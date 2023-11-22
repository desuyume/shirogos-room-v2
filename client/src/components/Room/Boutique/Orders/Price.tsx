import { FC } from 'react'

interface IPrice {
	clickBuy: () => void
	finalPrice: number
	isDisabled: boolean
}

const Price: FC<IPrice> = ({ clickBuy, finalPrice, isDisabled }) => {
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
				className='w-[22.3%] h-full bg-primary hover:bg-primaryHover transition-all text-primaryText text-[1.0625rem] rounded-br-[1.5625rem] disabled:bg-tertiary'
			>
				Купить
			</button>
		</div>
	)
}

export default Price
