import { FC, useContext, useState } from 'react'
import logo from '@/assets/logo.png'
import logoHover from '@/assets/logo-hover.png'
import { Link } from 'react-router-dom'
import HeaderBttn from './HeaderBttn'
import { UserContext } from '@/Context'
import Profile from './Profile'
import PrimaryHeaderBttn from './PrimaryHeaderBttn'

interface IHeader {
	withLine: boolean
	isFixed: boolean
}

const Header: FC<IHeader> = ({ withLine, isFixed }) => {
	const userContext = useContext(UserContext)

	const [isLogoHover, setIsLogoHover] = useState<boolean>(false)

	return (
		<div
			className={
				(isFixed ? 'fixed top-0 w-full' : '') +
				' bg-tertiary h-[5.25rem] flex justify-center items-center z-50'
			}
		>
			<div className='absolute left-4 w-[3.58rem] h-[3.58rem]'>
				<Link
					className='relative w-full h-full block'
					to='/'
					onMouseOver={() => setIsLogoHover(true)}
					onMouseLeave={() => setIsLogoHover(false)}
				>
					<img
						className={
							(!!isLogoHover ? 'opacity-0 invisible' : 'opacity-100 visible') +
							' w-full h-full absolute inset-0 transition-all'
						}
						src={logo}
						alt='logo'
					/>
					<img
						className={
							(!isLogoHover ? 'opacity-0 invisible' : 'opacity-100 visible') +
							' w-full h-full absolute inset-0 transition-all'
						}
						src={logoHover}
						alt='logo'
					/>
				</Link>
			</div>

			<nav className='w-full flex justify-center items-center'>
				<HeaderBttn path='/wiki' title='Википедия' />
				<PrimaryHeaderBttn path='/streamer' title='Стримерская' />
				<HeaderBttn path='/dangoteka' title='Данготека' />
			</nav>
			{userContext?.isFetched && userContext.user && <Profile />}
			{withLine && (
				<hr className='border-primary w-full absolute top-[calc(5.25rem-1px)]' />
			)}
		</div>
	)
}

export default Header
