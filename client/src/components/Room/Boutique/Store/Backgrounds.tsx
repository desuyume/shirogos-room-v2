import { FC, useContext, useState } from 'react'
import BackgroundsList from './BackgroundsList'
import BackgroundsBuy from './BackgroundsBuy'
import { IBackground } from '@/types/background.interface'
import { useBoutiqueBackgrounds } from '@/api/useBoutiqueBackgrounds'
import { RoomAppearanceContext } from '@/Context'
import { colorVariants } from '@/consts/roomColors'

const Backgrounds: FC = () => {
	const [activeBackground, setActiveBackground] = useState<IBackground | null>(
		null
	)
	const roomAppearance = useContext(RoomAppearanceContext)

	const { data: backgrounds, isLoading, isError } = useBoutiqueBackgrounds()

	return (
		<div
			className={`max-w-[65%] h-full ${
				colorVariants.bgRoomGradient[roomAppearance.active_room_color]
			} rounded-[1.5625rem] flex-1 mx-auto flex flex-col items-center pt-[0.69rem] backgrounds`}
		>
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
