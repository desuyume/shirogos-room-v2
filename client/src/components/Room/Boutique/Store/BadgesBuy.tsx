import { IBadge } from '@/types/badge.interface'
import { FC } from 'react'

interface IBadgesBuy {
	setActiveBadge: React.Dispatch<React.SetStateAction<IBadge | null>>
	badge: IBadge | null
	setBuyedBadges: React.Dispatch<React.SetStateAction<number[]>>
}

const BadgesBuy: FC<IBadgesBuy> = ({ setActiveBadge, badge, setBuyedBadges }) => {
	const buyBadge = () => {
		// @ts-ignore
		setBuyedBadges(prev => [...prev, badge?.id])
		setActiveBadge(null)
	}

	return (
		<div className='w-full h-11 flex'>
			<div className='w-[35%] h-full flex justify-center items-center bg-tertiary rounded-bl-[1.2rem] min-w-[4.7rem]'>
				<p className='text-primaryText text-[0.8125rem] leading-[97.795%] text-center'>
					К оплате:
				</p>
			</div>
			<div className='flex-1 h-full flex justify-center items-center bg-secondary px-2'>
				<p className='text-[#EBE984] text-[0.9375rem] leading-[97.795%] text-center'>
					{badge?.cost ? badge?.cost : 0} ДО
				</p>
			</div>
			<button onClick={buyBadge} className='bg-primary hover:bg-primaryHover transition-all text-primaryText text-xs w-[21.15%] rounded-br-[1.2rem] min-w-[3.5rem]'>
				Купить
			</button>
		</div>
	)
}

export default BadgesBuy
