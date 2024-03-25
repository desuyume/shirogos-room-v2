import { RoomAppearanceContext } from '@/Context'
import { useBuyBackground } from '@/api/useBuyBackground'
import { colorVariants, colorVariantsHover } from '@/consts/roomColors'
import { IBackground } from '@/types/background.interface'
import { FC, useContext, useEffect, useState } from 'react'

interface IBackgroundsBuy {
	activeBackground: IBackground | null
	buyedBackgrounds: IBackground[]
}

const BackgroundsBuy: FC<IBackgroundsBuy> = ({
	activeBackground,
	buyedBackgrounds,
}) => {
	const [isBgBuyed, setIsBgBuyed] = useState(false)
	const roomAppearance = useContext(RoomAppearanceContext)

	const { mutate: buyBg, isSuccess } = useBuyBackground()

	const handleBuyBg = () => {
		if (activeBackground) {
			buyBg(activeBackground.id)
		}
	}

	const checkIsBgBuyed = () => {
		if (!!buyedBackgrounds.find(bg => bg.id === activeBackground?.id)) {
			setIsBgBuyed(true)
		} else {
			setIsBgBuyed(false)
		}
	}

	useEffect(() => {
		checkIsBgBuyed()
	}, [activeBackground])

	useEffect(() => {
		if (isSuccess) {
			setIsBgBuyed(true)
		}
	}, [isSuccess])

	return (
		<div className='w-[35.35%] min-w-[19.6875rem] h-[2.6875rem] flex'>
			<div className='w-[35%] h-full flex justify-center items-center bg-tertiary rounded-bl-[1.2rem] min-w-[4.7rem]'>
				<p className='text-primaryText text-[0.8125rem] leading-[97.795%] text-center'>
					К оплате:
				</p>
			</div>
			<div className='flex-1 h-full flex justify-center items-center bg-secondary px-2'>
				<p className='text-[#EBE984] text-[0.9375rem] leading-[97.795%] text-center'>
					{isBgBuyed
						? 'Куплено'
						: !!activeBackground
						? `${activeBackground?.cost} ДО`
						: '0 ДО'}
				</p>
			</div>
			<button
				disabled={!activeBackground || isBgBuyed}
				onClick={handleBuyBg}
				className={`${colorVariants.bg[roomAppearance.active_room_color]} ${
					colorVariantsHover.bg[roomAppearance.active_room_color]
				} transition-all text-primaryText text-xs w-[21.15%] rounded-br-[1.2rem] min-w-[3.5rem] disabled:bg-tertiary`}
			>
				Купить
			</button>
		</div>
	)
}

export default BackgroundsBuy
