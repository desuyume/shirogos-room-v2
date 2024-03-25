import { RoomAppearanceContext } from '@/Context'
import { useBuyBadge } from '@/api/useBuyBadge'
import { colorVariants, colorVariantsHover } from '@/consts/roomColors'
import { IBadge } from '@/types/room.interface'
import { FC, useContext, useEffect, useState } from 'react'

interface IBadgesBuy {
	activeBadge: IBadge | null
	buyedBadges: IBadge[]
}

const BadgesBuy: FC<IBadgesBuy> = ({ activeBadge, buyedBadges }) => {
	const [isBadgeBuyed, setIsBadgeBuyed] = useState(false)
	const roomAppearance = useContext(RoomAppearanceContext)

	const { mutate: buyBadge, isSuccess } = useBuyBadge()

	const handleClickBuy = () => {
		if (activeBadge) {
			buyBadge(activeBadge.id)
		}
	}

	const checkIsBgBuyed = () => {
		if (!!buyedBadges.find(b => b.id === activeBadge?.id)) {
			setIsBadgeBuyed(true)
		} else {
			setIsBadgeBuyed(false)
		}
	}

	useEffect(() => {
		checkIsBgBuyed()
	}, [activeBadge])

	useEffect(() => {
		if (isSuccess) {
			setIsBadgeBuyed(true)
		}
	}, [isSuccess])

	return (
		<div className='w-full h-11 flex'>
			<div className='w-[35%] h-full flex justify-center items-center bg-tertiary rounded-bl-[1.2rem] min-w-[4.7rem]'>
				<p className='text-primaryText text-[0.8125rem] leading-[97.795%] text-center'>
					К оплате:
				</p>
			</div>
			<div className='flex-1 h-full flex justify-center items-center bg-secondary px-2'>
				<p className='text-[#EBE984] text-[0.9375rem] leading-[97.795%] text-center'>
					{isBadgeBuyed
						? 'Куплено'
						: !!activeBadge
						? `${activeBadge?.cost} ДО`
						: '0 ДО'}
				</p>
			</div>
			<button
				disabled={!activeBadge || isBadgeBuyed}
				onClick={handleClickBuy}
				className={`${colorVariants.bg[roomAppearance.active_room_color]} ${
					colorVariantsHover.bg[roomAppearance.active_room_color]
				} transition-all text-primaryText text-xs w-[21.15%] rounded-br-[1.2rem] min-w-[3.5rem] disabled:bg-tertiary`}
			>
				Купить
			</button>
		</div>
	)
}

export default BadgesBuy
