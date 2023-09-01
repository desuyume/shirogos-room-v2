import { FC, useState } from 'react'
import BadgesNav from './BadgesNav'
import BadgesList from './BadgesList'
import BadgesBuy from './BadgesBuy'
import { IBadge } from '@/types/badge.interface'
import BadgesTitle from './BadgesTitle'

const Badges: FC = () => {
	const [activeSection, setActiveSection] = useState<string>('unique')
	const [activeBadge, setActiveBadge] = useState<IBadge | null>(null)
	const [buyedBadges, setBuyedBadges] = useState<number[]>([])

	return (
		<div className='w-[18.3%] min-w-[13.75rem] h-full bg-room-gradient rounded-[1.5625rem] flex flex-col items-center pt-[0.69rem] badges'>
			<BadgesTitle />
			<BadgesNav
				activeSection={activeSection}
				setActiveSection={setActiveSection}
			/>
			<BadgesList
				buyedBadges={buyedBadges}
				activeSection={activeSection}
				activeBadge={activeBadge}
				setActiveBadge={setActiveBadge}
			/>
			<BadgesBuy
				setActiveBadge={setActiveBadge}
				setBuyedBadges={setBuyedBadges}
				badge={activeBadge}
			/>
		</div>
	)
}

export default Badges
