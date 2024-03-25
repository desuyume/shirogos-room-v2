import { FC, useContext, useEffect, useState } from 'react'
import { Scrollbar } from 'react-scrollbars-custom'
import { useBuyedRoomBackgrounds } from '@/api/useBuyedRoomBackgrounds'
import BackgroundItem from './BackgroundItem'
import { RoomAppearanceContext } from '@/Context'
import { colorVariants } from '@/consts/roomColors'

const SelectBackground: FC = () => {
	const [selectedBg, setSelectedBg] = useState<number | null>(null)
	const roomAppearance = useContext(RoomAppearanceContext)

	const {
		isLoading,
		isError,
		isSuccess,
		data: buyedBackgrounds,
	} = useBuyedRoomBackgrounds()

	useEffect(() => {
		if (!isLoading && isSuccess) {
			if (buyedBackgrounds.selected_background) {
				setSelectedBg(buyedBackgrounds.selected_background.id)
			}
		}
	}, [isLoading])

	return (
		<div
			className={`h-[17.5rem] ${
				colorVariants.bgRoomGradient[roomAppearance.active_room_color]
			} w-[78%] ml-[2%] rounded-[1.5625rem] py-[0.63rem] pl-[0.56rem] flex items-center select-bg`}
		>
			<p className='min-w-[14.85%] max-w-[14.85%] bg-tertiary transition-all h-full rounded-[1.0625rem] text-primaryText text-[0.9375rem] mr-8 flex justify-center items-center'>
				Выбрать фон
			</p>
			{isLoading ? (
				<div className='w-full h-full flex justify-center items-center'>
					<p className='text-center'>Загрузка...</p>
				</div>
			) : isError ? (
				<div className='w-full h-full flex justify-center items-center'>
					<p className='text-center'>Ошибка 0_0</p>
				</div>
			) : (
				<Scrollbar
					noDefaultStyles
					noScrollY
					className='flex-1'
					style={{ height: '100%' }}
				>
					<div className='flex items-center pl-2 h-full'>
						{buyedBackgrounds?.selected_background && (
							<BackgroundItem
								bgId={buyedBackgrounds.selected_background.id}
								bgImg={buyedBackgrounds.selected_background.img}
								bgName={buyedBackgrounds.selected_background.name}
								selectedBg={selectedBg}
								setSelectedBg={setSelectedBg}
							/>
						)}
						{buyedBackgrounds?.buyed_backgrounds
							.filter(
								bg =>
									bg.RoomBackground.id !==
									buyedBackgrounds.selected_background?.id
							)
							.map(bg => (
								<BackgroundItem
									key={bg.RoomBackground.id}
									bgId={bg.RoomBackground.id}
									bgImg={bg.RoomBackground.img}
									bgName={bg.RoomBackground.name}
									selectedBg={selectedBg}
									setSelectedBg={setSelectedBg}
								/>
							))}
					</div>
				</Scrollbar>
			)}
		</div>
	)
}

export default SelectBackground
