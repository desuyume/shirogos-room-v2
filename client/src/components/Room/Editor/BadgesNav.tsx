import { BadgeSectionType } from '@/types/badge.interface'
import { FC } from 'react'
import BadgesNavBttn from './BadgesNavBttn'

interface IBadgesNav {
	activeBadgesSection: BadgeSectionType
	setActiveBadgesSection: (activeBadgesSection: BadgeSectionType) => void
}

const BadgesNav: FC<IBadgesNav> = ({
	activeBadgesSection,
	setActiveBadgesSection,
}) => {
	return (
		<nav className='h-[0.5625rem] flex items-center mb-4'>
			<BadgesNavBttn
				activeBadgesSection={activeBadgesSection}
				setActiveBadgesSection={setActiveBadgesSection}
				type='unique'
			/>
			<BadgesNavBttn
				activeBadgesSection={activeBadgesSection}
				setActiveBadgesSection={setActiveBadgesSection}
				type='copyright'
			/>
			<BadgesNavBttn
				activeBadgesSection={activeBadgesSection}
				setActiveBadgesSection={setActiveBadgesSection}
				type='common'
			/>
		</nav>
	)
}

export default BadgesNav
