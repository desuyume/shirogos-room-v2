import { FC, useContext, useEffect, useRef, useState } from 'react'
import { useUserProfile } from '@/api/useUserProfile'
import { Link } from 'react-router-dom'
import ProfileMiniature from '../ProfileMiniature'
import LogoutButton from './LogoutButton'
import { cn } from '@/utils/cn'
import axios from 'axios'
import { UserContext } from '@/Context'
import Notification from '../Notification/Notification'

const RoomInfo: FC = () => {
	const [isLogoutVisible, setIsLogoutVisible] = useState<boolean>(false)
	const timeoutRef = useRef<number | null>(null)
	const context = useContext(UserContext)

	const { data: userInfo, isLoading, isError } = useUserProfile()

	const handleMouseEnter = () => {
		// Clear any existing timeout to prevent hiding
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current)
		}
		setIsLogoutVisible(true)
	}

	const handleMouseLeave = () => {
		// Set a timeout to hide the element after 1 second
		timeoutRef.current = setTimeout(() => {
			setIsLogoutVisible(false)
		}, 1000)
	}

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

	// Cleanup timeout on component unmount
	useEffect(() => {
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current)
			}
		}
	}, [])

	return (
		<div className='w-[16.3125rem] h-[8.5625rem] pl-5 pr-1.5 flex justify-between items-center z-30'>
			<div className='w-full h-full bg-room-info-pink-gradient absolute inset-0 z-10' />

			<Notification withDot className='w-[3.5rem] h-[3.5rem]' />

			<div className='min-w-[10.125rem] max-w-[10.125rem] h-[8.1875rem] self-end relative z-20 flex flex-col'>
				{isLoading ? (
					<div className='w-full h-full flex justify-center items-center'>
						<p className='text-primaryText'>Загрузка...</p>
					</div>
				) : isError ? (
					<div className='w-full h-full flex justify-center items-center'>
						<p className='text-primaryText'>Ошибка</p>
					</div>
				) : (
					<>
						<div className='w-full h-5 pl-1.5 pr-1 flex justify-between items-center'>
							<p className='text-xs text-[#EBE984] max-w-[50%] truncate mr-4'>
								{userInfo.dangos} до
							</p>
							<p className='text-xs text-primaryText max-w-[50%] truncate'>
								{userInfo.level} уровень
							</p>
						</div>

						<Link
							to='/room'
							onMouseEnter={handleMouseEnter}
							onMouseLeave={handleMouseLeave}
							className='w-full h-[4.5rem] relative group'
						>
							<ProfileMiniature
								miniature_img={userInfo.miniature_img}
								profile_img={userInfo.profile_img}
								username={userInfo.username ?? userInfo.twitch.displayName}
								frame={null}
								className='w-full h-[4.5rem] object-cover'
							/>

							<div
								className={cn(
									'w-full h-full bg-[#383134] bg-opacity-60 absolute inset-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible z-40 transition-opacity duration-300 flex justify-center items-center group'
								)}
							>
								<p className='text-primaryText text-opacity-[0.55] invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity'>
									ВОЙТИ
								</p>
							</div>
						</Link>

						<div className='w-full flex-1 flex justify-center items-start pt-1 px-2'>
							<p className='text-primaryText truncate'>{userInfo.username}</p>
						</div>
					</>
				)}
			</div>

			<LogoutButton
				isLogoutVisible={isLogoutVisible}
				handleMouseEnter={handleMouseEnter}
				handleMouseLeave={handleMouseLeave}
				onClick={logout}
			/>

			<div className='w-[10.125rem] h-[10.375rem] absolute bg-room-info-gray-gradient z-10 top-1.5 right-1.5' />
		</div>
	)
}

export default RoomInfo
