import { FC, useContext, useState } from 'react'

import { Link } from 'react-router-dom'
import { useUserProfile } from '@/api/useUserProfile'
import { RoomAppearanceContext } from '@/Context'
import { colorVariants } from '@/consts/roomColors'
import ProfileMiniature from '@/components/ProfileMiniature'
import Notification from '@/components/Notification/Notification'

const Profile: FC = () => {
	const [isLinkHover, setIsLinkHover] = useState<boolean>(false)
	const roomAppearance = useContext(RoomAppearanceContext)

	const { data: profile, isLoading, isError } = useUserProfile()

	return isLoading || isError ? (
		<></>
	) : (
		<div className='absolute right-8 flex items-center'>
			<Notification className='mr-8' />

			<Link
				onMouseEnter={() => setIsLinkHover(true)}
				onMouseOut={() => setIsLinkHover(false)}
				className='mr-[0.62rem] group'
				to='/room'
			>
				<ProfileMiniature
					miniature_img={profile.miniature_img}
					profile_img={profile.profile_img}
					username={profile.username}
					frame={profile.frame}
					className='w-[5.625rem] h-[4.5rem]'
					withHoverEffect
				/>
			</Link>

			<div className='flex flex-col items-center'>
				<p className='text-primaryText text-xs leading-[1.0625rem] mb-[0.13rem]'>
					{profile?.level} уровень
				</p>
				<p
					className={
						(isLinkHover
							? `${colorVariants.text[roomAppearance.active_username_color]}`
							: 'text-primaryText') +
						' text-base leading-[1.0625rem] mb-[0.13rem] transition-colors duration-300'
					}
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
