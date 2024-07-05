import { FC, useContext } from 'react'
import noNotificationIcon from '@/assets/no-notification.png'
import notificationIcon from '@/assets/notification.png'
import { Link } from 'react-router-dom'
import { useUserProfile } from '@/api/useUserProfile'
import { RoomAppearanceContext } from '@/Context'
import { colorVariants } from '@/consts/roomColors'
import ProfileMiniature from '@/components/ProfileMiniature'

const Profile: FC = () => {
	const isHaveUnreadNotification = false
	const roomAppearance = useContext(RoomAppearanceContext)

	const { data: profile, isLoading, isError } = useUserProfile()

	return isLoading || isError ? (
		<></>
	) : (
		<div className='absolute right-8 flex items-center'>
			<div className='w-[2.1875rem] h-[2.1875rem] relative mr-8'>
				<img
					className={
						(!isHaveUnreadNotification
							? 'opacity-100 visible'
							: 'opacity-0 invisible') +
						' absolute inset-0 cursor-pointer hover:scale-110 transition-all'
					}
					src={noNotificationIcon}
					alt='notification-icon'
				/>
				<img
					className={
						(isHaveUnreadNotification
							? 'opacity-100 visible'
							: 'opacity-0 invisible') +
						' absolute inset-0 cursor-pointer hover:scale-110 transition-all'
					}
					src={notificationIcon}
					alt='notification-icon'
				/>
			</div>

			<Link className='mr-[0.62rem]' to='/room'>
				<ProfileMiniature
					miniature_img={profile.miniature_img}
					profile_img={profile.profile_img}
					username={profile.username}
					frame={profile.frame}
					className='w-[5.625rem] h-[4.5rem]'
				/>
			</Link>

			<div className='flex flex-col items-center'>
				<p className='text-primaryText text-xs leading-[1.0625rem] mb-[0.13rem]'>
					{profile?.level} уровень
				</p>
				<p
					className={`${
						colorVariants.text[roomAppearance.active_username_color]
					} text-base leading-[1.0625rem] mb-[0.13rem] transition-colors`}
				>
					{profile?.username}
				</p>
				<p className='text-[#EBE984] text-[0.8125rem] leading-[1.0625rem]'>
					{profile?.dangos} до
				</p>
			</div>
		</div>
	)
}

export default Profile
