import { BadgeType } from '@/types/badge.interface'
import { FC } from 'react'

interface IBadgesNav {
  activeSection: string
  setActiveSection: React.Dispatch<React.SetStateAction<string>>
}

const BadgesNav: FC<IBadgesNav> = ({ activeSection, setActiveSection }) => {
  const sections: {
    name: BadgeType
  }[] = [{ name: 'unique' }, { name: 'copyright' }, { name: 'common' }]

  return (
    <nav className='mb-4 flex h-[0.5625rem] w-full items-center justify-center'>
      {sections.map((section) => (
        <button
          key={section.name}
          onClick={() => setActiveSection(section.name)}
          className={
            (activeSection === section.name
              ? 'h-[0.5625rem] bg-[#EBE984] '
              : 'h-[0.3125rem] bg-primaryText hover:bg-[#EBE984] ') +
            'mr-[0.13rem] w-[30%] rounded-[0.625rem] transition-all last-of-type:mr-0'
          }
        />
      ))}
    </nav>
  )
}

export default BadgesNav
