import { FC, useState } from 'react'
import BackgroundsList from './BackgroundsList'
import BackgroundsBuy from './BackgroundsBuy'
import { IBackground } from '@/types/background.interface'
import { useBoutiqueBackgrounds } from '@/api/useBoutiqueBackgrounds'

const Backgrounds: FC = () => {
	const [activeBackground, setActiveBackground] = useState<IBackground | null>(
		null
	)

	const { data: backgrounds, isLoading, isError } = useBoutiqueBackgrounds()

	return (
		<div className='max-w-[65%] h-full bg-room-gradient rounded-[1.5625rem] flex-1 mx-auto flex flex-col items-center pt-[0.69rem] backgrounds'>
			{isLoading ? (
				<div className='w-full h-full flex justify-center items-center'>
					<p className='text-primaryText text-xl leading-[97.795%] text-center'>
						Загрузка...
					</p>
				</div>
			) : isError ? (
				<div className='w-full h-full flex justify-center items-center'>
					<p className='text-primaryText text-xl leading-[97.795%] text-center'>
						Ошибка
					</p>
				</div>
			) : !backgrounds.backgrounds.length ? (
				<div className='w-full h-full flex justify-center items-center'>
					<p className='text-primaryText text-xl leading-[97.795%] text-center'>
						Фонов нет
					</p>
				</div>
			) : (
				<>
					<div className='bg-tertiary w-[18.3%] h-[3.6875rem] min-w-[6.25rem] rounded-[1.5625rem] flex justify-center items-center mb-[0.62rem]'>
						<p className='text-primaryText text-xl'>Фоны</p>
					</div>
					<BackgroundsList
						backgrounds={backgrounds.backgrounds}
						buyedBackgrounds={backgrounds.buyedBackgrounds}
						activeBg={activeBackground}
						setActiveBg={setActiveBackground}
					/>
					<BackgroundsBuy
						activeBackground={activeBackground}
						buyedBackgrounds={backgrounds.buyedBackgrounds}
					/>
				</>
			)}
		</div>
	)
}

export default Backgrounds
