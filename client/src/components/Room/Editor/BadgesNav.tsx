import type { BadgeType } from '@/types/badge.interface'
import { FC } from 'react'
import BadgesNavBttn from './BadgesNavBttn'

interface IBadgesNav {
  activeBadgesSection: BadgeType
  setActiveBadgesSection: (activeBadgesSection: BadgeType) => void
}

const BadgesNav: FC<IBadgesNav> = ({ activeBadgesSection, setActiveBadgesSection }) => {
  return (
    <nav className='mb-4 flex h-[0.5625rem] items-center'>
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
