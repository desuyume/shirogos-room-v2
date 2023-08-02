import { FC, useState } from 'react'
import logo from '@/assets/logo.png'
import logoHover from '@/assets/logo-hover.png'
import { Link } from 'react-router-dom'
import HeaderBttn from './HeaderBttn'

const Header: FC = () => {
	const [isLogoHover, setIsLogoHover] = useState<boolean>(false)
	const links = [
		{ path: '/wiki', title: 'Википедия' },
		{ path: '/dangoteka', title: 'Данготека' },
	]

	return (
		<div className='bg-tertiary h-[84px] flex justify-center items-center'>
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
		</div>
	)
}

export default Header
