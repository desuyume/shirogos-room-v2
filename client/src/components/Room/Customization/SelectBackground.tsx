import { FC, useEffect, useState } from 'react'
import { Scrollbar } from 'react-scrollbars-custom'
import { useBuyedRoomBackgrounds } from '@/api/useBuyedRoomBackgrounds'
import { useChooseActiveRoomBackground } from '@/api/useChooseActiveRoomBackground'
import BackgroundItem from './BackgroundItem'

const SelectBackground: FC = () => {
	const [selectedBg, setSelectedBg] = useState<number | null>(null)

	const {
		isLoading,
		isError,
		isSuccess,
		data: buyedBackgrounds,
	} = useBuyedRoomBackgrounds()
	const { mutate } = useChooseActiveRoomBackground()

	const clickChooseBg = () => {
		if (selectedBg) {
			mutate({ backgroundId: selectedBg })
		}
	}

	useEffect(() => {
		if (!isLoading && isSuccess) {
			if (buyedBackgrounds.selected_background) {
				setSelectedBg(buyedBackgrounds.selected_background.id)
			}
		}
	}, [isLoading])

	return (
		<div className='h-[17.5rem] bg-room-gradient w-[78%] ml-[2%] rounded-[1.5625rem] py-[0.63rem] pl-[0.56rem] flex items-center select-bg'>
			<button
				onClick={clickChooseBg}
				className='min-w-[14.85%] max-w-[14.85%] bg-tertiary hover:opacity-95 transition-all h-full rounded-[1.0625rem] text-primaryText text-[0.9375rem] mr-8'
			>
				Выбрать фон
			</button>
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
					className='flex-1'
					style={{ height: '100%' }}
				>
					<div className='flex items-center pl-2'>
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
								<div
									key={bg.RoomBackground.id}
									onClick={() => setSelectedBg(bg.RoomBackground.id)}
									className={
										(selectedBg === bg.RoomBackground.id ? 'scale-105 ' : '') +
										'mr-5 flex flex-col items-center relative mb-2 cursor-pointer transition-all duration-300'
									}
								>
									<img
										className={
											(selectedBg === bg.RoomBackground.id
												? 'border-2 border-[#F8FEFA] '
												: '') +
											'min-w-[18.375rem] rounded-[1.5625rem] mb-2 pointer-events-none'
										}
										src={`${import.meta.env.VITE_SERVER_URL}/${
											bg.RoomBackground.img
										}`}
										alt='bg-img'
									/>
									<p
										className={
											(selectedBg === bg.RoomBackground.id
												? 'text-xl -bottom-6 '
												: 'text-[0.8125rem] -bottom-4 ') +
											'text-primaryText absolute transition-all select-none text-center'
										}
									>
										{bg.RoomBackground.name}
									</p>
								</div>
							))}
					</div>
				</Scrollbar>
			)}
		</div>
	)
}

export default SelectBackground
