import { FC, useState } from 'react'
import BackgroundsList from './BackgroundsList'
import BackgroundsBuy from './BackgroundsBuy'
import { IBackground } from '@/types/background.interface'

const Backgrounds: FC = () => {
	const [activeBackground, setActiveBackground] = useState<IBackground | null>(
		null
	)
	const [buyedBackgrounds, setBuyedBackgrounds] = useState<number[]>([])

	return (
		<div className='max-w-[65%] h-full bg-room-gradient rounded-[1.5625rem] flex-1 mx-auto flex flex-col items-center pt-[0.69rem] backgrounds'>
			<div className='bg-tertiary w-[18.3%] h-[3.6875rem] min-w-[6.25rem] rounded-[1.5625rem] flex justify-center items-center mb-[0.62rem]'>
				<p className='text-primaryText text-xl'>Фоны</p>
			</div>
			<BackgroundsList buyedBackgrounds={buyedBackgrounds} activeBg={activeBackground} setActiveBg={setActiveBackground} />
			<BackgroundsBuy
				setActiveBackround={setActiveBackground}
				background={activeBackground}
				setBuyedBackrounds={setBuyedBackgrounds}
			/>
		</div>
	)
}

export default Backgrounds
