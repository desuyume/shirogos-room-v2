import { IBadge } from '@/types/room.interface'
import { FC } from 'react'
import { Scrollbar } from 'react-scrollbars-custom'
import BadgeItem from './BadgeItem'

interface IBadgesList {
	badges: IBadge[]
	buyedBadges: IBadge[]
	activeSection: string
	activeBadge: IBadge | null
	setActiveBadge: React.Dispatch<React.SetStateAction<IBadge | null>>
}

const BadgesList: FC<IBadgesList> = ({
	badges,
	buyedBadges,
	activeSection,
	activeBadge,
	setActiveBadge,
}) => {
	return (
		<Scrollbar noDefaultStyles className='w-full flex-1'>
			<div className='w-full px-2'>
				{badges
					.filter(badge => badge.awardType.type === activeSection)
					.map(badge => (
						<BadgeItem
							key={badge.id}
							activeBadge={activeBadge}
							setActiveBadge={setActiveBadge}
							badge={badge}
							buyedBadges={buyedBadges}
						/>
					))}
			</div>
		</Scrollbar>
	)
}

export default BadgesList
