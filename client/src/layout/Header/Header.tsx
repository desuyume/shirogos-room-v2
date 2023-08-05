import { FC, useState } from 'react'
import logo from '@/assets/logo.png'
import logoHover from '@/assets/logo-hover.png'
import { Link } from 'react-router-dom'
import HeaderBttn from './HeaderBttn'

interface IHeader {
	withLine: boolean
	isFixed: boolean
}

const Header: FC<IHeader> = ({ withLine, isFixed }) => {
	const [isLogoHover, setIsLogoHover] = useState<boolean>(false)
	const links = [
		{ path: '/wiki', title: 'Википедия' },
		{ path: '/dangoteka', title: 'Данготека' },
	]

	return (
		<div
			className={
				(isFixed ? 'fixed top-0 w-full' : '') +
				' bg-tertiary h-[5.25rem] flex justify-center items-center z-50'
			}
		>
			<Link
				className='absolute left-4'
				to='/'
				onMouseOver={() => setIsLogoHover(true)}
				onMouseLeave={() => setIsLogoHover(false)}
			>
				<img src={isLogoHover ? logoHover : logo} alt='logo' />
			</Link>
			<nav>
				{links.map(link => (
					<HeaderBttn key={link.path} path={link.path} title={link.title} />
				))}
			</nav>
			{withLine && <hr className='border-primary w-full absolute top-[calc(5.25rem-1px)]' />}
		</div>
	)
}

export default Header
