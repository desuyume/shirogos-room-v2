import { FC } from 'react'
import WikiSidebarInfo from './WikiSidebarInfo'

interface IWikiSidebar {
	gender: string
	fraction: string
	age: string
	isOpen: boolean
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const WikiSidebar: FC<IWikiSidebar> = ({
	gender,
	fraction,
	age,
	isOpen,
	setIsOpen,
}) => {
	return (
		<div
			onMouseOver={() => setIsOpen(true)}
			onMouseLeave={() => setIsOpen(false)}
			className={
				(isOpen ? 'w-[9.6vw]' : 'w-[3.8vw]') +
				' h-[calc(100%-5.25rem-1px)] fixed left-0 bottom-0 bg-tertiary transition-all duration-1000 ease-out z-30'
			}
		>
			<WikiSidebarInfo isSidebarOpen={isOpen} type='Пол' value={gender} />
			<WikiSidebarInfo isSidebarOpen={isOpen} type='Фракция' value={fraction} />
			<WikiSidebarInfo isSidebarOpen={isOpen} type='Возраст' value={age} />
			<p className={(isOpen ? 'left-[-50%]' : 'left-[50%]') + ' text-[#44B86B] text-[2.1875rem] absolute translate-x-[-50%] top-[50%] translate-y-[-50%] select-none transition-all duration-1000 ease-out'}>
				|
			</p>
		</div>
	)
}

export default WikiSidebar
