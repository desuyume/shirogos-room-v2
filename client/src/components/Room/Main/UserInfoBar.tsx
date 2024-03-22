import { FC, useState } from 'react'
import PastUsernames from './PastUsernames'
import { IPastUsername } from '@/types/room.interface'
import { isUrl } from '@/utils/isUrl'
import noProfilePictureIcon from '@/assets/no-profile-picture-icon.webp'

interface IUserInfoBar {
	profile_img: string | null
	username: string
	past_usernames?: IPastUsername[]
	level: number
}

const UserInfoBar: FC<IUserInfoBar> = ({
	profile_img,
	username,
	past_usernames,
	level,
}) => {
	const [isPastUsernamesVisible, setIsPastUsernamesVisible] =
		useState<boolean>(false)

	return (
		<div className='bg-[#D9D9D9] h-[24.375rem] relative flex flex-col items-center rounded-[1.5625rem] mb-[0.5625rem]'>
			<div className='w-full h-[80%] rounded-t-[1.5625rem] bg-[#D9D9D9] z-30'>
				{!!profile_img ? (
					<img
						className='rounded-[1.5rem] w-full h-full object-cover'
						src={
							isUrl(profile_img)
								? profile_img
								: `${import.meta.env.VITE_SERVER_URL}/${profile_img}`
						}
						alt='profile-img'
					/>
				) : (
					<img
						className='rounded-[1.5rem] w-full h-full object-cover'
						src={noProfilePictureIcon}
						alt='profile-img'
					/>
				)}
			</div>
			<div className='w-full h-[2.4375rem] flex justify-center items-center bg-[#D9D9D9] rounded-b-[1.5625rem] z-20 relative'>
				<p className='text-primary text-xl leading-[97.795%] text-center max-w-[11.75rem] overflow-ellipsis whitespace-nowrap overflow-hidden'>
					{username}
				</p>
				<button
					onClick={() => setIsPastUsernamesVisible(!isPastUsernamesVisible)}
					className='border-[0.4375rem] border-transparent border-t-[0.4375rem] border-t-tertiary hover:border-t-primary transition-all absolute right-[0.56rem] top-6'
				/>
				<PastUsernames
					isVisible={isPastUsernamesVisible}
					usernames={past_usernames}
					className='top-8 right-[0.6rem]'
				/>
			</div>
			<div className='bg-[#4A9648] w-[calc(100%-4px)] h-[6.4375rem] absolute bottom-[2px] rounded-[1.5625rem]'>
				<p className='text-primaryText text-[0.9375rem] w-full text-center absolute bottom-[0.45rem]'>
					Уровень {level}
				</p>
			</div>
		</div>
	)
}

export default UserInfoBar
