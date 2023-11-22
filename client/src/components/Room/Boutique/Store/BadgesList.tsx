import { FC } from 'react'
import badgeImg from '@/assets/room/badge.png'
import { IBadge } from '@/types/badge.interface'
import { Scrollbar } from 'react-scrollbars-custom'

interface IBadgesList {
	buyedBadges: number[]
	activeSection: string
	activeBadge: IBadge | null
	setActiveBadge: React.Dispatch<React.SetStateAction<IBadge | null>>
}

const BadgesList: FC<IBadgesList> = ({
	buyedBadges,
	activeSection,
	activeBadge,
	setActiveBadge,
}) => {
	const badges = [
		{ id: 1, img: badgeImg, name: 'Широго “Ха-Ха”', cost: 100, type: 'unique' },
		{ id: 2, img: badgeImg, name: 'Широго “Ха-Ха”', cost: 100, type: 'unique' },
		{ id: 3, img: badgeImg, name: 'Широго “Ха-Ха”', cost: 100, type: 'unique' },
		{ id: 4, img: badgeImg, name: 'Широго “Ха-Ха”', cost: 100, type: 'unique' },
		{ id: 5, img: badgeImg, name: 'Широго “Ха-Ха”', cost: 100, type: 'unique' },
		{ id: 6, img: badgeImg, name: 'Широго “Ха-Ха”', cost: 100, type: 'unique' },
		{
			id: 7,
			img: badgeImg,
			name: 'Широго “Ха-Ха”',
			cost: 250,
			type: 'copyright',
		},
		{
			id: 8,
			img: badgeImg,
			name: 'Широго “Ха-Ха”',
			cost: 300,
			type: 'copyright',
		},
		{
			id: 9,
			img: badgeImg,
			name: 'Широго “Ха-Ха”',
			cost: 500,
			type: 'default',
		},
		{
			id: 10,
			img: badgeImg,
			name: 'Широго “Ха-Ха”',
			cost: 400,
			type: 'default',
		},
		{
			id: 11,
			img: badgeImg,
			name: 'Широго “Ха-Ха”',
			cost: 125,
			type: 'default',
		},
	]

	return (
		<Scrollbar noDefaultStyles className='w-full flex-1'>
			<div className='w-full px-2'>
				{badges
					.filter(badge => !buyedBadges.includes(badge.id))
					.filter(badge => badge.type === activeSection)
					.map(badge => (
						<div
							key={badge.id}
							onClick={() => setActiveBadge(badge)}
							className={(badge.id === activeBadge?.id ? 'bg-tertiary bg-opacity-[0.35] ' : '') + 'flex justify-between items-center h-[7rem] mb-[0.63rem] last-of-type:mb-0 cursor-pointer rounded-[1.6875rem] hover:bg-tertiary hover:bg-opacity-[0.35] transition-all'}
						>
							<img
								className='h-full mr-[0.62rem]'
								src={badge.img}
								alt='badge-img'
							/>
							<div className='flex-1 flex flex-col items-center'>
								<p className='text-primaryText text-[0.8125rem] leading-[100%] text-center'>
									{badge.name}
								</p>
								<p className='text-[#EBE984] text-[0.8125rem] leading-[100%] text-center'>
									{badge.cost} ДО
								</p>
							</div>
						</div>
					))}
			</div>
		</Scrollbar>
	)
}

export default BadgesList
