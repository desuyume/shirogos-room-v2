import { CustomizationSection } from '@/pages/Admin/Customization'
import { FC } from 'react'

interface ICustomizationNavBttn {
	activeSection: CustomizationSection
	setActiveSection: (section: CustomizationSection) => void
	section: CustomizationSection
	title: string
}

const CustomizationNavBttn: FC<ICustomizationNavBttn> = ({
	activeSection,
	setActiveSection,
	section,
	title,
}) => {
	return (
		<button
			onClick={() => setActiveSection(section)}
			className={
				(activeSection === section ? 'text-primaryText ' : 'text-primary hover:text-primaryHover ') +
				'text-xl mb-5 last-of-type:mb-0 transition-all'
			}
		>
			{title}
		</button>
	)
}

export default CustomizationNavBttn
