import { FC } from 'react'
import noNotificationIcon from '@/assets/no-notification.svg'
import notificationIcon from '@/assets/notification.svg'
import { Link } from 'react-router-dom'
import { useUserProfile } from '@/api/useUserProfile'
import noProfilePictureIcon from '@/assets/no-profile-picture-icon.webp'
import { isUrl } from '@/utils/isUrl'

const Profile: FC = () => {
	const isHaveUnreadNotification = true
	const { data: profile, isLoading, isError } = useUserProfile()

	return isLoading || isError ? (
		<></>
	) : (
		<div className='absolute right-8 flex items-center'>
			<div className='w-[2.1875rem] h-[2.1875rem] relative mr-8'>
				<img
					className={
						(!!isHaveUnreadNotification
							? 'opacity-100 visible'
							: 'opacity-0 invisible') +
						' absolute inset-0 cursor-pointer hover:scale-110 transition-all'
					}
					src={noNotificationIcon}
					alt='notification-icon'
				/>
				<img
					className={
						(!isHaveUnreadNotification
							? 'opacity-100 visible'
							: 'opacity-0 invisible') +
						' absolute inset-0 cursor-pointer hover:scale-110 transition-all'
					}
					src={notificationIcon}
					alt='notification-icon'
				/>
			</div>

			<Link className='w-[4.5rem] h-[4.5rem] mr-[0.62rem]' to='/room'>
				{!!profile?.profile_img ? (
					<img
						className='w-full h-full'
						src={
							isUrl(profile?.profile_img)
								? profile?.profile_img
								: `${import.meta.env.VITE_SERVER_URL}/${profile.profile_img}`
						}
						alt='profile-img'
					/>
				) : (
					<img
						className='w-full h-full'
						src={noProfilePictureIcon}
						alt='profile-img'
					/>
				)}
			</Link>

			<div className='flex flex-col items-center'>
				<p className='text-primaryText text-xs leading-[1.0625rem] mb-[0.13rem]'>
					{profile?.level} уровень
				</p>
				<p className='text-primaryText text-base leading-[1.0625rem] mb-[0.13rem]'>
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
