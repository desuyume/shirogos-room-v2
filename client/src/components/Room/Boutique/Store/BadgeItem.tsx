import { IBadge } from '@/types/badge.interface'
import { FC } from 'react'

interface IBadgeItem {
	badge: IBadge
	buyedBadges: IBadge[]
	activeBadge: IBadge | null
	setActiveBadge: React.Dispatch<React.SetStateAction<IBadge | null>>
}

const BadgeItem: FC<IBadgeItem> = ({
	badge,
	buyedBadges,
	activeBadge,
	setActiveBadge,
}) => {
	const isBuyed = buyedBadges.find(buyedBadge => buyedBadge.id === badge.id)

	return (
		<div
			key={badge.id}
			onClick={() =>
				activeBadge === badge ? setActiveBadge(null) : setActiveBadge(badge)
			}
			className={
				(badge.id === activeBadge?.id ? 'bg-tertiary bg-opacity-[0.35] ' : '') +
				'flex justify-between items-center min-h-[7rem] max-h-[7rem] mb-[0.63rem] last-of-type:mb-0 cursor-pointer rounded-[1.6875rem] hover:bg-tertiary hover:bg-opacity-[0.35] transition-all'
			}
		>
			<div className='w-1/2 min-h-[7rem] max-h-[7rem] flex justify-center items-center mr-[0.62rem]'>
				<img
					src={`${import.meta.env.VITE_SERVER_URL}/${badge.img}`}
					alt='badge-img'
					className='min-h-[7rem] max-h-[7rem] object-contain'
				/>
			</div>

			<div className='flex-1 min-h-[7rem] max-h-[7rem] flex flex-col items-center justify-center overflow-hidden overflow-y-auto'>
				<p className='text-primaryText text-[0.8125rem] px-2 leading-[100%] text-center'>
					{badge.title}
				</p>
				<p className='text-[#EBE984] text-[0.8125rem] leading-[100%] text-center'>
					{!!isBuyed ? 'Куплено' : `${badge.cost} ДО`}
				</p>
			</div>
		</div>
	)
}

export default BadgeItem
