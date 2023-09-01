import { IBackground } from '@/types/background.interface'
import { FC } from 'react'

interface IBackgroundsBuy { 
	setActiveBackround: React.Dispatch<React.SetStateAction<IBackground | null>>
	background: IBackground | null
	setBuyedBackrounds: React.Dispatch<React.SetStateAction<number[]>>
}

const BackgroundsBuy: FC<IBackgroundsBuy> = ({ setActiveBackround, background, setBuyedBackrounds }) => {
	const buyBackround = () => {
		// @ts-ignore
		setBuyedBackrounds(prev => [...prev, background?.id])
		setActiveBackround(null)
	}

	return (
		<div className='w-[35.35%] min-w-[19.6875rem] h-[2.6875rem] flex'>
			<div className='w-[35%] h-full flex justify-center items-center bg-tertiary rounded-bl-[1.2rem] min-w-[4.7rem]'>
				<p className='text-primaryText text-[0.8125rem] leading-[97.795%] text-center'>
					К оплате:
				</p>
			</div>
			<div className='flex-1 h-full flex justify-center items-center bg-secondary px-2'>
				<p className='text-[#EBE984] text-[0.9375rem] leading-[97.795%] text-center'>
					{background?.cost ? background?.cost : 0} ДО
				</p>
			</div>
			<button onClick={buyBackround} className='bg-primary hover:bg-primaryHover transition-all text-primaryText text-xs w-[21.15%] rounded-br-[1.2rem] min-w-[3.5rem]'>
				Купить
			</button>
		</div>
	)
}

export default BackgroundsBuy