import { FC } from 'react'

interface IBadgesNav { 
	activeSection: string
	setActiveSection: React.Dispatch<React.SetStateAction<string>>
}

const BadgesNav: FC<IBadgesNav> = ({ activeSection, setActiveSection }) => {
	const sections = [
		{ name: 'unique-badge' },
		{ name: 'copyright-badge' },
		{ name: 'common-badge' },
	]

	return (
		<nav className='w-full h-[0.5625rem] mb-4 flex justify-center items-center'>
			{sections.map(section => (
				<button
					key={section.name}
					onClick={() => setActiveSection(section.name)}
					className={
						(activeSection === section.name
							? 'bg-[#EBE984] h-[0.5625rem] '
							: 'bg-primaryText h-[0.3125rem] hover:bg-[#EBE984] ') +
						'rounded-[0.625rem] mr-[0.13rem] last-of-type:mr-0 w-[30%] transition-all'
					}
				/>
			))}
		</nav>
	)
}

export default BadgesNav
