import { cn } from '@/utils/cn'
import { FC, useContext } from 'react'
import logoutIcon from '@/assets/logout-icon.png'
import logoutHoverIcon from '@/assets/logout-icon-hover.png'
import { UserContext } from '@/Context'
import axios from 'axios'

interface LogoutButtonProps {
	isLogoutVisible: boolean
	handleMouseEnter: () => void
	handleMouseLeave: () => void
}

const LogoutButton: FC<LogoutButtonProps> = ({
	isLogoutVisible,
	handleMouseEnter,
	handleMouseLeave,
}) => {
	const context = useContext(UserContext)

	const logout = async () => {
		await axios
			.get(`${import.meta.env.VITE_API_URL}/user/logout`, {
				withCredentials: true,
			})
			.then(() => {
				context?.setUser(null)
				localStorage.removeItem('token')
			})
			.catch(e => console.log(e))
	}

	return (
		<div
			onClick={logout}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			className={cn(
				'w-[2.3125rem] h-[4.5rem] bg-[#353133] cursor-pointer flex justify-center items-center absolute top-[1.625rem] right-0 translate-x-0 transition-transform group',
				{
					'translate-x-full': isLogoutVisible,
				}
			)}
		>
			<img
				src={logoutIcon}
				alt='logout'
				className='absolute mt-0.5 visible opacity-100 group-hover:invisible group-hover:opacity-0 transition-opacity duration-300'
			/>

			<div className='absolute flex flex-col justify-center items-center invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity duration-300'>
				<img src={logoutHoverIcon} alt='logout' className='ml-[1px]' />
				<p className='text-primaryText text-[0.625rem] leading-[0.8125rem]'>
					ББ?
				</p>
			</div>
		</div>
	)
}

export default LogoutButton
