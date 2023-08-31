import { IPanopticon } from '@/types/panopticon.interface'
import { FC } from 'react'

interface IBuyPanopticon {
	isVisible: boolean
	setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
	panopticon: IPanopticon | null
	setBuyedPanopticons: React.Dispatch<React.SetStateAction<number[] | null>>
}

const BuyPanopticon: FC<IBuyPanopticon> = ({
	isVisible,
	setIsVisible,
	panopticon,
	setBuyedPanopticons,
}) => {
	const buyPanopticon = () => {
		// @ts-ignore
		setBuyedPanopticons(prev => prev && [...prev, panopticon?.id]);
		setIsVisible(false)
	}

	return (
		<div
			className={
				(isVisible ? 'opacity-100 visible ' : 'opacity-0 invisible ') +
				'w-full h-[22rem] bg-room-buyPanopticon-bg absolute transition-all z-30 top-[50%] translate-y-[-50%] pt-6 flex flex-col items-center'
			}
		>
			<p className='text-primaryText text-[2.5rem] text-center leading-[97.795%] mb-4'>
				Уверен/а???
			</p>
			<div className='w-[12.8125rem] h-[10.82213rem] border-4 border-[#EBE984] rounded-[1.5625rem] bg-tertiary relative flex items-center justify-center mb-4'>
				<img
					className='w-full h-full rounded-[1.5625rem] opacity-10 blur-[2px]'
					src={panopticon?.img}
					alt='panopticon-img'
				/>
				<p className='text-[#EBE984] text-xl leading-[97.795%] text-center absolute'>
					{panopticon?.cost} ДО
				</p>
			</div>
			<div className='w-full flex justify-center'>
				<button
					onClick={buyPanopticon}
					className='w-[12.45%] min-w-[9rem] h-[3.73rem] bg-primary hover:bg-primaryHover text-primaryText text-[1.5625rem] transition-all mr-[0.64rem]'
				>
					ДАН
				</button>
				<button
					onClick={() => setIsVisible(false)}
					className='w-[12.45%] min-w-[9rem] h-[3.73rem] bg-tertiary hover:bg-secondaryHover text-primaryText text-[1.5625rem] transition-all'
				>
					НЕ ДАН
				</button>
			</div>
		</div>
	)
}

export default BuyPanopticon
